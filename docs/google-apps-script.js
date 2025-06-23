/**
 * Google Apps Script optimizado para Remeros
 * Versión: 2.0.0
 */

// Configuración de CORS headers
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
  };
}

// Cache para rate limiting
const CACHE_KEY_PREFIX = 'FORM_SUBMISSION_';
const MAX_SUBMISSIONS_PER_HOUR = 5;

function checkRateLimit(ipAddress) {
  const cache = CacheService.getScriptCache();
  const key = CACHE_KEY_PREFIX + ipAddress;
  const currentCount = parseInt(cache.get(key) || '0');
  
  if (currentCount >= MAX_SUBMISSIONS_PER_HOUR) {
    throw new Error('Demasiados intentos. Por favor, espera unos minutos.');
  }
  
  cache.put(key, (currentCount + 1).toString(), 3600); // 1 hora de expiración
  return true;
}

function validateFormData(data) {
  const errors = [];
  
  // Validar campos requeridos
  if (!data.nombre || data.nombre.trim().length === 0) {
    errors.push('El nombre es requerido');
  }
  if (!data.apellido || data.apellido.trim().length === 0) {
    errors.push('El apellido es requerido');
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('El email es inválido');
  }
  if (!data.telefono || data.telefono.trim().length === 0) {
    errors.push('El teléfono es requerido');
  }
  
  // Validar longitud máxima
  if (data.nombre && data.nombre.length > 50) {
    errors.push('El nombre no puede tener más de 50 caracteres');
  }
  if (data.apellido && data.apellido.length > 50) {
    errors.push('El apellido no puede tener más de 50 caracteres');
  }
  if (data.email && data.email.length > 100) {
    errors.push('El email no puede tener más de 100 caracteres');
  }
  if (data.comentario && data.comentario.length > 500) {
    errors.push('El comentario no puede tener más de 500 caracteres');
  }
  
  if (errors.length > 0) {
    throw new Error(errors.join('. '));
  }
  
  return true;
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remover tags HTML
    .trim()
    .substring(0, 500); // Limitar longitud
}

/**
 * Maneja solicitudes GET
 */
function doGet() {
  return HtmlService.createHtmlOutput(
    `<html><body>
      <h1>Servicio de Formulario Remeros</h1>
      <p>Estado: <span style="color:green">✅ Activo</span></p>
      <p>Última actualización: ${new Date().toLocaleDateString('es-AR')}</p>
    </body></html>`
  );
}

/**
 * Maneja solicitudes POST - procesa los datos del formulario
 */
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
    
    // Enviar emails
    try {
      // Email de confirmación al usuario
      sendConfirmationEmail({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        comentario: formData.comentario
      }, timestamp);

      // Notificación al equipo
      sendTeamNotification({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        comentario: formData.comentario,
        utmSource: formData.utmSource
      }, timestamp, spreadsheet.getUrl());
    } catch (emailError) {
      console.error('Error enviando emails:', emailError);
      // No fallamos el proceso si los emails fallan
    }
    
    // Log para auditoría
    console.log(`Nuevo contacto registrado: ${formData.email} - ${timestamp}`);
    
    return createSuccessResponse('Mensaje enviado correctamente');
    
  } catch (error) {
    console.error('Error en doPost:', error);
    return createErrorResponse(error.message);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Maneja solicitudes OPTIONS para CORS
 */
function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendConfirmationEmail(data, timestamp) {
  const confirmationSubject = 'Confirmación - Palmera de los Remeros';
  const confirmationBody = `
Hola ${data.nombre},

¡Gracias por tu interés en Palmera de los Remeros!

Hemos recibido tu consulta y nuestro equipo comercial se pondrá en contacto contigo a la brevedad para brindarte toda la información que necesites sobre este increíble proyecto.

Mientras tanto, te invitamos a:
• Seguir nuestras redes sociales para ver las últimas novedades
• Visitar nuestro sitio web grupoportland.com
• Contactarnos directamente por WhatsApp: +54 11 1234-5678

Datos de tu consulta:
- Nombre: ${data.nombre} ${data.apellido}
- Email: ${data.email}
- Teléfono: ${data.telefono}
- Fecha: ${Utilities.formatDate(timestamp, "America/Argentina/Buenos_Aires", "dd/MM/yyyy HH:mm:ss")}

¡Esperamos poder acompañarte en esta nueva etapa!

Saludos cordiales,
Equipo Comercial
Grupo Portland

---
Este es un email automático, por favor no respondas a esta dirección.
Para consultas, contactanos en ventas@grupoportland.com
  `.trim();
  
  try {
    MailApp.sendEmail({
      to: data.email,
      subject: confirmationSubject,
      body: confirmationBody
    });
  } catch (emailError) {
    console.error('Error enviando email de confirmación:', emailError);
    throw emailError;
  }
}

function sendTeamNotification(data, timestamp, spreadsheetUrl) {
  const salesNotificationSubject = `Nueva consulta - ${data.nombre} ${data.apellido} - Palmera Remeros`;
  const salesNotificationBody = `
🏢 NUEVA CONSULTA - PALMERA DE LOS REMEROS

📊 DATOS DEL LEAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre: ${data.nombre} ${data.apellido}
📧 Email: ${data.email}
📱 Teléfono: ${data.telefono}
📝 Mensaje: ${data.comentario || 'Sin mensaje'}
🌐 Origen: ${data.utmSource || 'Directo'}
📅 Fecha: ${Utilities.formatDate(timestamp, "America/Argentina/Buenos_Aires", "dd/MM/yyyy HH:mm:ss")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ ACCIONES RECOMENDADAS:
1. Contactar dentro de las próximas 2 horas
2. Enviar información del proyecto por email
3. Agendar visita al showroom si corresponde
4. Registrar seguimiento en CRM

🔗 Ver hoja de cálculo: ${spreadsheetUrl}

---
Sistema automático Palmera de los Remeros
  `.trim();
  
  try {
    MailApp.sendEmail({
      to: 'ventas@grupoportland.com',
      subject: salesNotificationSubject,
      body: salesNotificationBody
    });
  } catch (emailError) {
    console.error('Error enviando notificación al equipo:', emailError);
    throw emailError;
  }
}

// Función de prueba
function testScript() {
  const testData = {
    parameter: {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@test.com",
      telefono: "11-1234-5678",
      comentario: "Prueba desde script",
      utmSource: "test",
      userAgent: "Test Browser"
    }
  };
  
  const response = doPost(testData);
  console.log(response.getContent());
}

// Configurar triggers automáticos
function setupTriggers() {
  // Eliminar triggers existentes
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Crear trigger para reporte diario
  ScriptApp.newTrigger('dailyReport')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

// Reporte diario de leads
function dailyReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) return; // Solo headers
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  const yesterdayLeads = data.filter(row => {
    const rowDate = new Date(row[0]);
    return rowDate.toDateString() === yesterday.toDateString();
  });
  
  if (yesterdayLeads.length === 0) return;
  
  const reportSubject = `Reporte diario de leads - Palmera Remeros (${Utilities.formatDate(yesterday, "America/Argentina/Buenos_Aires", "dd/MM/yyyy")})`;
  const reportBody = `
📊 REPORTE DIARIO DE LEADS - PALMERA DE LOS REMEROS

Fecha: ${Utilities.formatDate(yesterday, "America/Argentina/Buenos_Aires", "dd/MM/yyyy")}
Total de leads: ${yesterdayLeads.length}

DETALLE DE LEADS:
${yesterdayLeads.map((lead, index) => `
${index + 1}. ${lead[1]} ${lead[2]}
   📧 ${lead[3]}
   📱 ${lead[4]}
   🌐 Origen: ${lead[6] || 'Directo'}
`).join('\n')}

Ver todos los leads: ${ss.getUrl()}

---
Reporte automático - Palmera de los Remeros
  `.trim();
  
  try {
    MailApp.sendEmail({
      to: 'ventas@grupoportland.com',
      subject: reportSubject,
      body: reportBody
    });
  } catch (error) {
    console.error('Error enviando reporte diario:', error);
  }
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