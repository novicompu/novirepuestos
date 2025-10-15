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
        
        // Guardar valores en tiempo real (solución al problema de limpieza)
        const formValues = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        };
        
        // Escuchar cambios en los inputs
        document.getElementById('contactName')?.addEventListener('input', (e) => {
            formValues.name = e.target.value;
            console.log('📝 Name actualizado:', formValues.name);
        });
        document.getElementById('contactEmail')?.addEventListener('input', (e) => {
            formValues.email = e.target.value;
        });
        document.getElementById('contactPhone')?.addEventListener('input', (e) => {
            formValues.phone = e.target.value;
        });
        document.getElementById('contactSubject')?.addEventListener('input', (e) => {
            formValues.subject = e.target.value;
        });
        document.getElementById('contactMessage')?.addEventListener('input', (e) => {
            formValues.message = e.target.value;
        });
        
        // Interceptar el submit del formulario (con capture para ejecutar primero)
        form.addEventListener('submit', async function(e) {
            // PRIMERO: Capturar valores ANTES de preventDefault
            const instantValues = {
                name: document.getElementById('contactName')?.value,
                email: document.getElementById('contactEmail')?.value,
                phone: document.getElementById('contactPhone')?.value,
                subject: document.getElementById('contactSubject')?.value,
                message: document.getElementById('contactMessage')?.value
            };
            console.log('⚡ Valores INSTANTÁNEOS (antes de preventDefault):', instantValues);
            
            e.preventDefault();
            e.stopImmediatePropagation();
            
            console.log('📤 Evento submit capturado');
            
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
            const honeypot = document.getElementById('honeypot');
            if (honeypot && honeypot.value) {
                console.log('🚫 Spam detectado');
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                return;
            }
            
            // Obtener valores usando getElementById (más directo y confiable)
            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const phoneInput = document.getElementById('contactPhone');
            const subjectInput = document.getElementById('contactSubject');
            const messageInput = document.getElementById('contactMessage');
            
            // Debug: Verificar que los elementos existen
            console.log('🔍 Elementos encontrados:');
            console.log('  nameInput:', nameInput ? '✓' : '✗');
            console.log('  emailInput:', emailInput ? '✓' : '✗');
            console.log('  phoneInput:', phoneInput ? '✓' : '✗');
            console.log('  subjectInput:', subjectInput ? '✓' : '✗');
            console.log('  messageInput:', messageInput ? '✓' : '✗');
            
            // Debug: Ver valores RAW
            console.log('🔍 Valores capturados:');
            console.log('  name =', JSON.stringify(nameInput?.value));
            console.log('  email =', JSON.stringify(emailInput?.value));
            console.log('  phone =', JSON.stringify(phoneInput?.value));
            console.log('  subject =', JSON.stringify(subjectInput?.value));
            console.log('  message =', JSON.stringify(messageInput?.value));
            
            // Usar los valores guardados en tiempo real (más confiable)
            const formData = {
                name: (formValues.name || '').trim(),
                email: (formValues.email || '').trim(),
                phone: (formValues.phone || '').trim(),
                subject: (formValues.subject || '').trim(),
                message: (formValues.message || '').trim(),
                timestamp: new Date().toISOString()
            };
            
            // Log para debug
            console.log('📋 Datos guardados en tiempo real:', formData);
            console.log('🔄 Comparación con valores del DOM:');
            console.log('  Real-time name:', formValues.name, 'vs DOM:', instantValues.name);
            console.log('  Real-time email:', formValues.email, 'vs DOM:', instantValues.email);
            
            // Validación básica en el cliente
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                console.error('❌ Validación falló: campos vacíos');
                console.error('⚠️  Por favor LLENA el formulario antes de enviarlo');
                alert('⚠️ Por favor completa todos los campos del formulario antes de enviar.');
                showMessage(form, 'Por favor completa todos los campos requeridos.', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                return;
            }
            
            console.log('✅ Validación exitosa, todos los campos tienen datos');
            
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
        }, true); // true = usar capture phase para ejecutar primero
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        // Si el DOM ya está cargado, ejecutar inmediatamente
        initContactForm();
    }
})();
