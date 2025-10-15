/**
 * Cloudflare Pages Function con Resend
 * Ruta: /api/contact
 * 
 * CONFIGURACIÓN:
 * 1. Crear cuenta en https://resend.com (GRATIS - 100 emails/día)
 * 2. Obtener API Key
 * 3. Agregar variable de entorno en Cloudflare Pages:
 *    RESEND_API_KEY = tu_api_key
 */

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await context.request.json();
    
    // Validar honeypot
    if (formData.honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detectado' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validar campos
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // HTML del correo
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
          .label { font-weight: bold; color: #cf812c; }
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
              <div class="value">${formData.phone}</div>
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
            <p>Este correo fue generado desde el formulario web de NoviRepuestos</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar con Resend
    const RESEND_API_KEY = context.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY no configurada');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NoviRepuestos <onboarding@resend.dev>', // Cambiar cuando verifiques tu dominio
        to: [
          'plataforma1@novirepuestos.com',
          'plataforma2@novirepuestos.com',
          'jbermeo@novicompu.com'
        ],
        reply_to: formData.email,
        subject: `[Consulta Web] ${formData.subject || 'Nueva solicitud de ' + formData.name}`,
        html: htmlEmailContent
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend error: ${error}`);
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

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
