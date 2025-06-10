import { z } from 'zod'

export const contactFormSchema = z.object({
  nombre: z.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
    
  apellido: z.string()
    .min(2, 'Mínimo 2 caracteres') 
    .max(50, 'Máximo 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
    
  email: z.string()
    .email('Email inválido')
    .min(5, 'Email muy corto')
    .max(100, 'Email muy largo'),
    
  telefono: z.string()
    .min(10, 'Teléfono muy corto')
    .max(15, 'Teléfono muy largo')
    .regex(/^[0-9+\-\s()]+$/, 'Formato de teléfono inválido'),
    
  comentario: z.string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema> 