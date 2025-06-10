export interface ContactFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  comentario?: string;
  utmSource?: string;
}

export interface FormResponse {
  success: boolean;
  error?: string;
  message?: string;
} 