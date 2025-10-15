// Manejador del formulario de contacto
(function() {
    'use strict';
    
    // Función para mostrar mensajes
    function showMessage(form, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            font-weight: 500;
            background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            animation: slideIn 0.3s ease-out;
        `;
        
        form.insertBefore(messageDiv, form.firstChild);
        
        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        
        if (!form) {
            console.warn('Formulario de contacto no encontrado');
            return;
        }
        
        console.log('✅ Formulario de contacto inicializado');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            console.log('📤 Procesando envío del formulario...');
            
            // Deshabilitar el botón de envío
            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) {
                console.error('❌ Botón de envío no encontrado');
                return;
            }
            
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Verificar honeypot (protección anti-spam)
            const honeypot = form.querySelector('input[name="honeypot"]');
            if (honeypot && honeypot.value) {
                console.log('🚫 Spam detectado');
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                return;
            }
            
            // Recopilar datos del formulario usando FormData
            const formDataObj = new FormData(form);
            const formData = {
                name: (formDataObj.get('name') || '').trim(),
                email: (formDataObj.get('email') || '').trim(),
                phone: (formDataObj.get('phone') || '').trim(),
                subject: (formDataObj.get('subject') || '').trim(),
                message: (formDataObj.get('message') || '').trim(),
                timestamp: new Date().toISOString()
            };
            
            // Log para debug
            console.log('📋 Datos capturados:', formData);
            
            // Validación básica en el cliente
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                console.error('❌ Validación falló: campos vacíos');
                showMessage(form, 'Por favor completa todos los campos requeridos.', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                return;
            }
            
            try {
                console.log('🌐 Enviando al servidor...');
                
                // Enviar al Worker de Cloudflare
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('📡 Respuesta recibida:', response.status);
                
                const result = await response.json();
                console.log('📄 Resultado:', result);
                
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    console.log('✅ ¡Formulario enviado exitosamente!');
                    showMessage(form, '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                    form.reset();
                } else {
                    throw new Error(result.error || 'Error al enviar el formulario');
                }
            } catch (error) {
                console.error('❌ Error:', error);
                showMessage(form, 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.', 'error');
            } finally {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        // Si el DOM ya está cargado, ejecutar inmediatamente
        initContactForm();
    }
})();
