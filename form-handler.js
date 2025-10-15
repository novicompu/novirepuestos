// Manejador del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Deshabilitar el botón de envío
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Verificar honeypot (protección anti-spam)
            if (form.honeypot.value) {
                console.log('Spam detectado');
                return;
            }
            
            // Recopilar datos del formulario
            const formData = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                subject: form.subject.value,
                message: form.message.value,
                timestamp: new Date().toISOString()
            };
            
            try {
                // Enviar al Worker de Cloudflare
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    showMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                    form.reset();
                } else {
                    throw new Error(result.error || 'Error al enviar el formulario');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.', 'error');
            } finally {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
    
    // Función para mostrar mensajes
    function showMessage(message, type) {
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
});
