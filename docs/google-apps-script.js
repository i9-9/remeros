/**
 * Google Apps Script para formulario de contacto
 * Palmera de los Remeros - Grupo Portland
 */

function doPost(e) {
  try {
    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Obtener la hoja activa (crear una nueva si no existe)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('Leads Palmera Remeros');
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Leads Palmera Remeros');
    }
    
    // Headers si es la primera vez
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 
        'Nombre', 
        'Apellido', 
        'Email', 
        'Teléfono', 
        'Comentario', 
        'UTM Source',
        'IP',
        'User Agent'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Formatear headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#2B303B');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Preparar datos de la fila
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.nombre || '',
      data.apellido || '',
      data.email || '',
      data.telefono || '',
      data.comentario || '',
      data.utmSource || 'Directo',
      data.ip || 'No disponible',
      data.userAgent || 'No disponible'
    ];
    
    // Insertar nueva fila al inicio (después de headers)
    sheet.insertRowAfter(1);
    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
    
    // Formatear la nueva fila
    const newRowRange = sheet.getRange(2, 1, 1, rowData.length);
    newRowRange.setBackground('#F8F9FA');
    
    // Auto-ajustar columnas
    sheet.autoResizeColumns(1, rowData.length);
    
    // Enviar email de confirmación al lead
    if (data.email && isValidEmail(data.email)) {
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
- Fecha: ${timestamp.toLocaleDateString('es-AR')}

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
        console.log('Error enviando email de confirmación:', emailError);
      }
    }
    
    // Enviar notificación al equipo de ventas
    const salesNotificationSubject = `Nueva consulta - ${data.nombre} ${data.apellido} - Palmera Remeros`;
    const salesNotificationBody = `
🏢 NUEVA CONSULTA - PALMERA DE LOS REMEROS

📊 DATOS DEL LEAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre: ${data.nombre} ${data.apellido}
📧 Email: ${data.email}
📱 Teléfono: ${data.telefono}
📝 Comentario: ${data.comentario || 'Sin comentarios'}
🌐 Origen: ${data.utmSource || 'Directo'}
📅 Fecha: ${timestamp.toLocaleDateString('es-AR')} a las ${timestamp.toLocaleTimeString('es-AR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ ACCIONES RECOMENDADAS:
1. Contactar dentro de las próximas 2 horas
2. Enviar información del proyecto por email
3. Agendar visita al showroom si corresponde
4. Registrar seguimiento en CRM

🔗 Ver hoja de cálculo: ${spreadsheet.getUrl()}

---
Sistema automático Palmera de los Remeros
    `.trim();
    
    try {
      MailApp.sendEmail({
        to: 'ventas@grupoportland.com',
        subject: salesNotificationSubject,
        body: salesNotificationBody
      });
      
      // CC a otros miembros del equipo si es necesario
      const ccEmails = [
        'comercial@grupoportland.com',
        'marketing@grupoportland.com'
      ];
      
      ccEmails.forEach(email => {
        try {
          MailApp.sendEmail({
            to: email,
            subject: salesNotificationSubject,
            body: salesNotificationBody
          });
        } catch (ccError) {
          console.log(`Error enviando CC a ${email}:`, ccError);
        }
      });
      
    } catch (notificationError) {
      console.log('Error enviando notificación:', notificationError);
    }
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Consulta recibida correctamente',
        timestamp: timestamp.getTime()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error en doPost:', error);
    
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Error interno del servidor',
        details: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función para manejar solicitudes GET (testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Formulario Palmera de los Remeros funcionando correctamente',
      timestamp: new Date().getTime()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Función para test manual (opcional)
 */
function testFormSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '+54 11 1234-5678',
        comentario: 'Estoy interesado en una unidad de 3 ambientes',
        utmSource: 'Test'
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}

/**
 * Configurar triggers automáticos (ejecutar una vez)
 */
function setupTriggers() {
  // Eliminar triggers existentes
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'dailyReport') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Crear trigger para reporte diario
  ScriptApp.newTrigger('dailyReport')
    .timeBased()
    .everyDays(1)
    .atHour(9) // 9 AM
    .create();
}

/**
 * Reporte diario automático
 */
function dailyReport() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Leads Palmera Remeros');
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return; // No hay datos
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const data = sheet.getDataRange().getValues();
    const yesterdayLeads = data.filter(row => {
      const timestamp = new Date(row[0]);
      return timestamp.toDateString() === yesterday.toDateString();
    });
    
    if (yesterdayLeads.length === 0) {
      return; // No hay leads de ayer
    }
    
    const reportSubject = `📊 Reporte Diario - Palmera Remeros (${yesterday.toLocaleDateString('es-AR')})`;
    const reportBody = `
📈 REPORTE DIARIO - PALMERA DE LOS REMEROS
${yesterday.toLocaleDateString('es-AR')}

🎯 RESUMEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total de leads: ${yesterdayLeads.length}
• Leads con teléfono: ${yesterdayLeads.filter(row => row[4]).length}
• Leads con comentarios: ${yesterdayLeads.filter(row => row[5]).length}

📋 DETALLE DE LEADS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${yesterdayLeads.map((row, index) => `
${index + 1}. ${row[1]} ${row[2]}
   📧 ${row[3]}
   📱 ${row[4] || 'Sin teléfono'}
   🌐 ${row[6] || 'Directo'}
   💬 ${row[5] || 'Sin comentarios'}
`).join('')}

🔗 Ver hoja completa: ${spreadsheet.getUrl()}

---
Reporte automático generado a las ${new Date().toLocaleTimeString('es-AR')}
    `.trim();
    
    MailApp.sendEmail({
      to: 'ventas@grupoportland.com',
      subject: reportSubject,
      body: reportBody
    });
    
  } catch (error) {
    console.error('Error en reporte diario:', error);
  }
} 