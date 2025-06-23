import { ContactFormData } from '@/types/forms';
import { getUTMSource } from './utils';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export async function submitToGoogleSheets(formData: ContactFormData): Promise<boolean> {
  try {
    if (!SCRIPT_URL) {
      console.error('Google Script URL not configured');
      throw new Error('Error de configuración del formulario');
    }

    // Format phone number to remove spaces and special characters
    const formattedData = {
      ...formData,
      telefono: formData.telefono.replace(/\s+/g, '').replace(/-/g, ''),
    };

    // Create FormData for proper form submission
    const data = new FormData();
    
    // Add each field individually
    Object.entries(formattedData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    
    // Add tracking data
    data.append('utmSource', getUTMSource());
    data.append('userAgent', navigator.userAgent);

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      body: data,
      // Let the browser set the appropriate headers for FormData
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Error al procesar el formulario');
    }

    return true;

  } catch (error) {
    console.error('Error submitting form:', error);
    throw error; // Re-throw to handle in the component
  }
}
