import { z } from 'zod';

export const contactFormSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  apellido: z.string()
    .min(1, 'El apellido es requerido')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
  telefono: z.string()
    .min(1, 'El teléfono es requerido')
    .regex(/^[+\d\s-]{8,20}$/, 'Por favor ingresa un número de teléfono válido'),
  comentario: z.string()
    .max(500, 'El comentario no puede tener más de 500 caracteres')
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface FormResponse {
  success: boolean;
  error?: string;
  message?: string;
  timestamp?: string;
} 