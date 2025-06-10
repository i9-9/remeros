import { ContactFormData } from '@/types/forms';

export async function submitToGoogleSheets(data: ContactFormData): Promise<boolean> {
  try {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.error('Google Script URL not configured');
      return false;
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        utmSource: data.utmSource || 'Directo',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
}

// Mock function for development
export async function submitToGoogleSheetsMock(data: ContactFormData): Promise<boolean> {
  console.log('Mock form submission:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success (you can change this to false to test error handling)
  return true;
} 