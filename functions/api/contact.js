/**
 * Cloudflare Pages Function para manejar el formulario de contacto
 * Ruta: /api/contact
 */

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await context.request.json();
    
    // Validar honeypot (protección anti-spam)
    if (formData.honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detectado' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Crear contenido HTML del correo
    const htmlEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #eec92d 0%, #cf812c 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 3px; }
          .label { font-weight: bold; color: #cf812c; margin-bottom: 5px; }
          .value { margin-top: 5px; color: #333; }
          .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nueva Consulta</h1>
            <p>NoviRepuestos</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Nombre:</div>
              <div class="value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            <div class="field">
              <div class="label">📱 Teléfono:</div>
              <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">📋 Asunto:</div>
              <div class="value">${formData.subject || 'Sin asunto'}</div>
            </div>
            <div class="field">
              <div class="label">💬 Mensaje:</div>
              <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">🕐 Fecha:</div>
              <div class="value">${new Date(formData.timestamp).toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })}</div>
            </div>
          </div>
          <div class="footer">
            <p>Este correo fue generado automáticamente desde el formulario de contacto web</p>
            <p style="color: #cf812c; font-weight: bold;">NoviRepuestos - Repuestos para Carga Pesada</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Correos de los asesores
    const recipients = [
      'plataforma1@novirepuestos.com',
      'plataforma2@novirepuestos.com',
      'jbermeo@novicompu.com'
    ];

    // Enviar correos usando MailChannels (integrado con Cloudflare)
    const emailPromises = recipients.map(recipient => 
      fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: recipient }],
              reply_to: { email: formData.email, name: formData.name }
            }
          ],
          from: {
            email: 'noreply@novirepuestos.com',
            name: 'NoviRepuestos - Formulario Web'
          },
          subject: `[Consulta Web] ${formData.subject || 'Nueva solicitud de ' + formData.name}`,
          content: [
            {
              type: 'text/html',
              value: htmlEmailContent
            }
          ]
        })
      })
    );

    // Esperar a que todos los correos se envíen
    const results = await Promise.all(emailPromises);
    
    // Verificar si todos se enviaron correctamente
    const allSuccess = results.every(r => r.ok);
    
    if (!allSuccess) {
      throw new Error('Error al enviar algunos correos');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Formulario enviado exitosamente' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error al procesar la solicitud',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Manejar OPTIONS para CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
