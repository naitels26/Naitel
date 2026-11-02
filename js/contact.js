(() => {
    'use strict';
    const form = document.getElementById('contact-form');
    const dialog = document.getElementById('contact-alert');
    if (!form || !dialog || typeof window.fetch !== 'function') return;
    // El destinatario y las copias se configuran únicamente en index.html.
    const endpoint = new URL(form.action);
    endpoint.pathname = `/ajax${endpoint.pathname}`;
    const button = form.querySelector('[type="submit"]');
    const status = document.getElementById('contact-status');
    const copy = () => document.documentElement.lang === 'en' ? {
        sending: 'Sending your message…', success: 'Success!',
        slow: 'Delivery is taking a little longer. Please keep this page open…',
        sent: 'Your message was sent to our sales team. We will contact you soon.',
        visitSent: 'Your proposed visit or meeting was sent to our sales team. We will contact you to confirm the date, time and details. The appointment is pending confirmation.',
        error: 'Unable to send', failed: 'We could not confirm your submission. Your information is still here. Please try again or call us.',
        pending: 'Temporarily unavailable', activation: 'We cannot process your message right now. Your information is still here. Please try again later or call us.',
        local: 'Open this page from the local preview or the published website to send your message. Your information is still here.',
        timeout: 'The service took too long to respond. We could not confirm delivery. Your information is still here; please try again later.',
        network: 'We could not connect to the delivery service. Check your connection and try again. Your information is still here.',
        limited: 'The delivery service is busy. Please wait a few minutes before trying again. Your information is still here.',
        close: 'OK'
    } : {
        sending: 'Enviando tu mensaje…', success: '¡Éxito!',
        slow: 'El envío está tardando un poco más. Mantén esta página abierta…',
        sent: 'Tu mensaje se envió a nuestro equipo de ventas. Pronto nos pondremos en contacto contigo.',
        visitSent: 'Tu propuesta de visita o reunión se envió a nuestro equipo de ventas. Te contactaremos para confirmar la fecha, el horario y los detalles. La cita queda pendiente de confirmación.',
        error: 'No se pudo enviar', failed: 'No pudimos confirmar el envío. Conservamos tus datos para que puedas intentarlo de nuevo. También puedes llamarnos.',
        pending: 'Servicio temporalmente no disponible', activation: 'No podemos procesar tu mensaje en este momento. Conservamos tus datos. Inténtalo más tarde o comunícate por teléfono.',
        local: 'Abre esta página desde la vista previa local o el sitio publicado para enviar tu mensaje. Conservamos tus datos.',
        timeout: 'El servicio tardó demasiado en responder. No pudimos confirmar la entrega. Conservamos tus datos; inténtalo más tarde.',
        network: 'No pudimos conectar con el servicio de envío. Revisa tu conexión e inténtalo de nuevo. Conservamos tus datos.',
        limited: 'El servicio de envío está ocupado. Espera unos minutos antes de intentarlo de nuevo. Conservamos tus datos.',
        close: 'Entendido'
    };
    let sending = false;
    function showResult(kind, title, message) {
        dialog.dataset.result = kind;
        dialog.querySelector('h2').textContent = title;
        dialog.querySelector('p').textContent = message;
        document.getElementById('contact-alert-close').textContent = copy().close;
        dialog.showModal();
    }
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (sending || !form.reportValidity()) return;
        if (window.location.protocol === 'file:') {
            showResult('error', copy().error, copy().local);
            return;
        }
        sending = true;
        button.disabled = true;
        form.setAttribute('aria-busy', 'true');
        status.textContent = copy().sending;
        const controller = new AbortController();
        // El proveedor puede tardar más de 20 segundos en procesar la solicitud.
        const slowNotice = window.setTimeout(() => { status.textContent = copy().slow; }, 12000);
        const timeout = window.setTimeout(() => controller.abort(), 60000);
        const visitRequested = Boolean(form.querySelector('[data-appointment-panel]')?.open);
        try {
            const payload = new URLSearchParams(new FormData(form));
            if (visitRequested) payload.set('_subject', 'Propuesta de visita o reunión — Naitel');
            // FormSubmit espera direcciones válidas cuando se incluye _cc.
            if (!payload.get('_cc')?.trim()) payload.delete('_cc');
            const response = await fetch(endpoint.href, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: payload,
                signal: controller.signal
            });
            if (response.status === 429) {
                showResult('error', copy().error, copy().limited);
                return;
            }
            const result = await response.json();
            // An activation response is not a completed submission.
            if (/activat|verif|confirm.{0,30}(email|address)/i.test(String(result.message || ''))) {
                console.warn('Contact delivery requires activation or verification', {
                    status: response.status,
                    message: String(result.message || '').replace(/[\w.+-]+@[\w.-]+/g, '[email]').slice(0, 300)
                });
                showResult('pending', copy().pending, copy().activation);
            } else if (response.ok && (result.success === true || result.success === 'true')) {
                form.reset();
                showResult('success', copy().success, visitRequested ? copy().visitSent : copy().sent);
            } else {
                console.warn('Contact delivery rejected', {
                    status: response.status,
                    message: String(result.message || '').replace(/[\w.+-]+@[\w.-]+/g, '[email]').slice(0, 300)
                });
                throw new Error('Submission not accepted');
            }
        } catch (error) {
            const message = error.name === 'AbortError' ? copy().timeout
                : error instanceof TypeError ? copy().network : copy().failed;
            showResult('error', copy().error, message);
        } finally {
            window.clearTimeout(timeout);
            window.clearTimeout(slowNotice);
            sending = false;
            button.disabled = false;
            form.removeAttribute('aria-busy');
            status.textContent = '';
        }
    });
})();
