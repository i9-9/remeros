# 📝 Guía de Integración: Formularios con Google Sheets

Esta guía explica cómo integrar formularios con Google Sheets usando Apps Script. Este método es simple, gratuito y no requiere configuración compleja de Google Cloud.

## 📋 Índice
1. [Crear y Configurar Google Sheet](#1-crear-y-configurar-google-sheet)
2. [Configurar Google Apps Script](#2-configurar-google-apps-script)
3. [Implementar el Script](#3-implementar-el-script)
4. [Integrar con el Frontend](#4-integrar-con-el-frontend)
5. [Solución de Problemas](#5-solución-de-problemas)

## 1. Crear y Configurar Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com/)
2. Crea una nueva hoja de cálculo
3. Configura los encabezados en la primera fila según tus necesidades. Ejemplo:
   ```
   A1: Fecha
   B1: Nombre
   C1: Apellido
   D1: Teléfono
   E1: Email
   F1: Comentario
   G1: UTM Source
   H1: User Agent
   ```

## 2. Configurar Google Apps Script

1. En tu hoja de cálculo, ve a `Extensiones > Apps Script`
2. Reemplaza el contenido del archivo `Código.gs` con este código base:

```javascript
/**
 * Google Apps Script para formulario de contacto
 */

function doGet() {
  return HtmlService.createHtmlOutput(
    `<html><body>
      <h1>Servicio de Formulario</h1>
      <p>Estado: <span style="color:green">✅ Activo</span></p>
      <p>Última actualización: ${new Date().toLocaleDateString('es-AR')}</p>
    </body></html>`
  );
}

function doPost(e) {
  // Lock para evitar escrituras concurrentes
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (error) {
    return createErrorResponse('Servicio temporalmente no disponible');
  }

  try {
    // Validar que tenemos datos
    if (!e.parameter || Object.keys(e.parameter).length === 0) {
      throw new Error('No se recibieron datos del formulario');
    }

    const formData = e.parameter;
    
    // Validaciones básicas
    if (!formData.email || !isValidEmail(formData.email)) {
      throw new Error('Email requerido y debe ser válido');
    }
    
    if (!formData.nombre || formData.nombre.trim().length < 2) {
      throw new Error('Nombre requerido (mínimo 2 caracteres)');
    }

    // Obtener la hoja activa
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Form Responses 1') || spreadsheet.getActiveSheet();
    
    // Preparar datos con validación
    const timestamp = new Date();
    const rowData = [
      timestamp,
      sanitizeInput(formData.nombre),
      sanitizeInput(formData.apellido || ''),
      sanitizeInput(formData.telefono || ''),
      formData.email.trim().toLowerCase(),
      sanitizeInput(formData.comentario || ''),
      formData.utmSource || 'Directo',
      formData.userAgent || ''
    ];
    
    // Insertar datos
    sheet.appendRow(rowData);
    
    return createSuccessResponse('Mensaje enviado correctamente');
    
  } catch (error) {
    console.error('Error en doPost:', error);
    return createErrorResponse(error.message);
  } finally {
    lock.releaseLock();
  }
}

// Funciones auxiliares
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remover tags HTML
    .trim()
    .substring(0, 500); // Limitar longitud
}

function createSuccessResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Implementar el Script

1. Haz clic en "Implementar" > "Nueva implementación"
2. Selecciona "Aplicación web"
3. Configura:
   - Descripción: "Form Handler v1"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquier persona"
4. Haz clic en "Implementar"
5. Autoriza el acceso cuando se solicite
6. Guarda la URL del script (será algo como `https://script.google.com/macros/s/[ID]/exec`)

## 4. Integrar con el Frontend

### Configuración de Variables de Entorno

Crea o edita `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec
```

### Tipos TypeScript

```typescript
// types/forms.ts
import { z } from 'zod';

export const formSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  apellido: z.string()
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .optional(),
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
  telefono: z.string()
    .regex(/^[+\d\s-]{8,20}$/, 'Por favor ingresa un número de teléfono válido')
    .optional(),
  comentario: z.string()
    .max(500, 'El comentario no puede tener más de 500 caracteres')
    .optional(),
});

export type FormData = z.infer<typeof formSchema>;
```

### Integración con Google Sheets

```typescript
// lib/google-sheets.ts
import { FormData } from '@/types/forms';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export async function submitToGoogleSheets(formData: FormData): Promise<boolean> {
  try {
    if (!SCRIPT_URL) {
      throw new Error('Error de configuración del formulario');
    }

    // Create FormData for proper form submission
    const data = new FormData();
    
    // Add each field individually
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      body: data,
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
    throw error;
  }
}
```

### Uso en un Componente React

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, formSchema } from '@/types/forms';
import { submitToGoogleSheets } from '@/lib/google-sheets';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitToGoogleSheets(data);
      reset();
      // Mostrar mensaje de éxito
    } catch (error) {
      // Manejar error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
    </form>
  );
}
```

## 5. Solución de Problemas

### Errores Comunes

1. **Error CORS**
   - Verifica que "Quién tiene acceso" esté configurado como "Cualquier persona"
   - Asegúrate de que la URL del script sea correcta

2. **Error "Script no encontrado"**
   - Verifica que hayas implementado el script como aplicación web
   - Comprueba que la URL del script sea correcta

3. **Error al guardar datos**
   - Verifica los permisos de la hoja de cálculo
   - Comprueba que los nombres de las columnas coincidan

### Mejores Prácticas

1. **Validación**
   - Siempre valida los datos tanto en el cliente como en el servidor
   - Usa Zod o similar para tipado fuerte y validación

2. **Seguridad**
   - Sanitiza los inputs para prevenir XSS
   - Limita la longitud de los campos
   - Implementa rate limiting si es necesario

3. **UX**
   - Proporciona feedback claro al usuario
   - Maneja estados de carga y error
   - Limpia el formulario después del envío exitoso

4. **Mantenimiento**
   - Documenta los cambios en el script
   - Mantén un registro de versiones
   - Haz copias de seguridad regulares de la hoja de cálculo

## 📝 Notas Adicionales

- Este método es ideal para formularios simples y proyectos pequeños/medianos
- No requiere configuración de Google Cloud ni credenciales complejas
- Gratis y fácil de mantener
- Perfecto para sitios estáticos o JAMstack

## 🔄 Actualizaciones y Mantenimiento

Para actualizar el script:
1. Edita el código en el editor de Apps Script
2. Crea una nueva versión (Implementar > Nueva implementación)
3. Actualiza la URL en las variables de entorno si es necesario

## 🚀 Próximos Pasos Sugeridos

1. Implementar rate limiting
2. Agregar notificaciones por email
3. Mejorar el logging y monitoreo
4. Implementar análisis de datos básico 