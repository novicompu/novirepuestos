/**
 * Worker de Cloudflare para manejar el formulario de contacto
 * Este worker recibe los datos del formulario y envía correos a los asesores
 */

export default {
  async fetch(request, env) {
    // Manejar CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Responder a solicitudes OPTIONS (preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Solo aceptar POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método no permitido' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      // Obtener datos del formulario
      const formData = await request.json();
      
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

      // Crear el contenido del correo
      const emailContent = `
        Nueva consulta desde NoviRepuestos
        
        Nombre: ${formData.name}
        Email: ${formData.email}
        Teléfono: ${formData.phone}
        Asunto: ${formData.subject || 'Sin asunto'}
        
        Mensaje:
        ${formData.message}
        
        Fecha: ${formData.timestamp}
      `;

      const htmlEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #eec92d 0%, #cf812c 100%); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #cf812c; }
            .value { margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nueva Consulta - NoviRepuestos</h1>
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
                <div class="value">${new Date(formData.timestamp).toLocaleString('es-EC')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Este correo fue generado automáticamente desde el formulario de contacto de NoviRepuestos</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Enviar correos a ambos asesores usando MailChannels
      const emails = [
        'plataforma1@novirepuestos.com',
        'plataforma2@novirepuestos.com',
        'jbermeo@novicompu.com'
      ];

      const emailPromises = emails.map(email => 
        fetch('https://api.mailchannels.net/tx/v1/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: email }],
                reply_to: { email: formData.email, name: formData.name }
              }
            ],
            from: {
              email: 'contacto@novirepuestos.com',
              name: 'NoviRepuestos - Formulario Web'
            },
            subject: `[NoviRepuestos] ${formData.subject || 'Nueva consulta'}`,
            content: [
              {
                type: 'text/plain',
                value: emailContent
              },
              {
                type: 'text/html',
                value: htmlEmailContent
              }
            ]
          })
        })
      );

      // Esperar a que se envíen todos los correos
      await Promise.all(emailPromises);

      // Responder con éxito
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Correo enviado exitosamente' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ 
        error: 'Error al procesar la solicitud',
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
