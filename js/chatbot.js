(() => {
    'use strict';

    const root = document.querySelector('[data-chat-root]');
    if (!root) return;
    const panel = root.querySelector('.help-chat-panel');
    const toggle = root.querySelector('[data-chat-toggle]');
    const close = root.querySelector('[data-chat-close]');
    const messages = root.querySelector('[data-chat-messages]');
    const suggestions = root.querySelector('[data-chat-suggestions]');
    const form = root.querySelector('[data-chat-form]');
    const input = root.querySelector('[data-chat-input]');
    const send = root.querySelector('[data-chat-send]');
    if (!panel || !toggle || !close || !messages || !suggestions || !form || !input || !send) return;

    // Answers come from the public content on this site. No message is sent to a server.
    const copy = {
        es: {
            eyebrow: 'PREGUNTAS FRECUENTES', title: '¿En qué te ayudamos?', launcher: '¿Tienes dudas?',
            inputLabel: 'Escribe tu pregunta', placeholder: 'Escribe tu pregunta...', send: 'Enviar pregunta',
            open: 'Abrir asistente de preguntas frecuentes', close: 'Cerrar asistente', log: 'Conversación',
            suggestions: 'Preguntas sugeridas', bot: 'Naitel',
            welcome: 'Hola. Puedo ayudarte a encontrar información sobre nuestros servicios, proyectos, sucursales y contacto. Elige un tema o escribe tu pregunta.',
            fallback: 'No tengo una respuesta precisa para esa consulta. Puedes llamar a Naitel para hablar sobre tu proyecto o explorar los temas sugeridos.',
            topics: {
                services: { question: '¿Qué servicios ofrecen?', answer: 'Diseñamos e integramos infraestructura, conectividad y seguridad. También trabajamos con cableado y fibra óptica, redes, telefonía, audio y video, software, hardware y espacios inteligentes.', action: 'Explorar servicios', href: '#servicios' },
                data: { question: '¿Cómo trabajan los Data Centers?', answer: 'Cada centro de datos parte de una evaluación integral de las instalaciones. Con esa información definimos una estrategia para alojar y proteger el equipo crítico de cada operación.', action: 'Ver Data Centers', href: '#servicios' },
                security: { question: '¿Ofrecen soluciones de seguridad?', answer: 'Sí. Integramos ciberseguridad, sistemas de seguridad, control de acceso, video inteligente y supresión de incendios según las necesidades del proyecto.', action: 'Ver soluciones', href: '#servicios' },
                cases: { question: '¿Qué proyectos han realizado?', answer: 'En los casos de éxito puedes conocer proyectos de infraestructura y conectividad para Heineken, seguridad para Pulses America y actualización de cableado y VoIP para Cracker Barrel.', action: 'Ver casos de éxito', href: '#exito' },
                branches: { question: '¿Dónde están sus sucursales?', answer: 'Tenemos sucursales en Ciudad Juárez, Chihuahua, El Paso, Monterrey, San Luis Potosí, Querétaro y Hermosillo. En el mapa puedes abrir la dirección exacta de cada una.', action: 'Ver sucursales', href: '#sucursales' },
                hours: { question: '¿Cuáles son sus horarios?', answer: 'El horario varía por sucursal. Abre la ficha de la ciudad que te interesa en la sección de sucursales para consultar los días, horas y datos de contacto.', action: 'Consultar horarios', href: '#sucursales' },
                company: { question: '¿Quiénes son Naitel?', answer: 'Naitel inició operaciones en Ciudad Juárez en 2007. Diseñamos, implementamos y mantenemos soluciones de infraestructura, conectividad y seguridad para empresas en México y Estados Unidos.', action: 'Conocer Naitel', href: '#nosotros' },
                quote: { question: '¿Cómo puedo hablar con ustedes?', answer: 'Para una evaluación técnica o una duda específica, llama al 800 188 6248. Un integrante del equipo podrá orientarte según tu proyecto.', action: 'Llamar al 800 188 6248', href: 'tel:8001886248' }
            },
            fallbackAction: 'Llamar al 800 188 6248'
        },
        en: {
            eyebrow: 'FREQUENT QUESTIONS', title: 'How can we help?', launcher: 'Need help?',
            inputLabel: 'Type your question', placeholder: 'Type your question...', send: 'Send question',
            open: 'Open frequently asked questions assistant', close: 'Close assistant', log: 'Conversation',
            suggestions: 'Suggested questions', bot: 'Naitel',
            welcome: 'Hello. I can help you find information about our services, projects, branches and contact details. Choose a topic or type your question.',
            fallback: 'I do not have a precise answer to that question. You can call Naitel to discuss your project or explore the suggested topics.',
            topics: {
                services: { question: 'What services do you offer?', answer: 'We design and integrate infrastructure, connectivity and security. We also work with structured cabling and fiber optics, networks, telephony, audio and video, software, hardware and smart workspaces.', action: 'Explore services', href: '#servicios' },
                data: { question: 'How do you approach data centers?', answer: 'Every data center starts with a comprehensive facilities assessment. We use it to define a strategy for housing and protecting each operation’s critical equipment.', action: 'View data centers', href: '#servicios' },
                security: { question: 'Do you offer security solutions?', answer: 'Yes. We integrate cybersecurity, security systems, access control, intelligent video and fire suppression according to each project’s needs.', action: 'View solutions', href: '#servicios' },
                cases: { question: 'What projects have you completed?', answer: 'Our success stories cover infrastructure and connectivity for Heineken, security for Pulses America, and cabling and VoIP upgrades for Cracker Barrel.', action: 'View success stories', href: '#exito' },
                branches: { question: 'Where are your branches?', answer: 'We have branches in Ciudad Juárez, Chihuahua, El Paso, Monterrey, San Luis Potosí, Querétaro and Hermosillo. The map provides the exact address of each one.', action: 'View branches', href: '#sucursales' },
                hours: { question: 'What are your business hours?', answer: 'Hours vary by branch. Open the city’s details in the branches section for its days, hours and contact information.', action: 'Check hours', href: '#sucursales' },
                company: { question: 'Who is Naitel?', answer: 'Naitel began operating in Ciudad Juárez in 2007. We design, implement and maintain infrastructure, connectivity and security solutions for businesses in Mexico and the United States.', action: 'About Naitel', href: '#nosotros' },
                quote: { question: 'How can I contact you?', answer: 'For a technical assessment or a specific question, call 800 188 6248. A team member can guide you based on your project.', action: 'Call 800 188 6248', href: 'tel:8001886248' }
            },
            fallbackAction: 'Call 800 188 6248'
        }
    };

    const patterns = [
        ['welcome', /^(hola|hello|hi|buenos\s+dias|buenas\s+tardes|hey)[!.?\s]*$/],
        ['data', /data\s*centers?|centros?\s+de\s+datos|servidor|procesamiento|tier/],
        ['hours', /horario|\bhora(s)?\b|abren|cierran|sabado|domingo|business\s+hours|opening\s+hours|schedule/],
        ['branches', /sucursal|ubicacion|direccion|mapa|donde\s+estan|oficina|presencia|cobertura|branch|location|address|office|where\s+are/],
        ['security', /ciber|seguridad|camara|control\s+de\s+acceso|incendio|security|surveillance|fire\s+suppression/],
        ['cases', /casos?\s+de\s+exito|proyectos?|heineken|cracker|pulses|clientes?|success\s+stor|projects?|clients?/],
        ['company', /quienes|historia|sobre\s+nosotros|mision|vision|about|company|history|mission/],
        ['quote', /cotiza|presupuesto|precio|contact|asesor|hablar|llamar|telefono|cost|quote|support|soporte/],
        ['services', /servicio|solucion|integra|hacen|ofrecen|mantenimiento|cableado|fibra|redes|telefonia|software|audio|video|hardware|network|service|solution|maintenance|cabling|fiber/]
    ];
    const suggested = ['services', 'data', 'cases', 'branches', 'quote'];
    const history = [{ speaker: 'bot', key: 'welcome' }];
    let opened = false;

    const language = () => document.documentElement.lang === 'en' ? 'en' : 'es';
    const current = () => copy[language()];
    const normalize = value => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    const findTopic = value => patterns.find(([, pattern]) => pattern.test(normalize(value)))?.[0] || 'fallback';

    function makeMessage(entry) {
        const text = current();
        const wrapper = document.createElement('div');
        wrapper.className = 'help-chat-message';
        wrapper.dataset.speaker = entry.speaker;
        if (entry.speaker === 'bot') {
            const speaker = document.createElement('span');
            speaker.className = 'help-chat-speaker';
            speaker.textContent = text.bot;
            wrapper.append(speaker);
        }
        const paragraph = document.createElement('p');
        if (entry.speaker === 'user') paragraph.textContent = entry.raw ?? text.topics[entry.key]?.question ?? '';
        else paragraph.textContent = entry.key === 'welcome' ? text.welcome : entry.key === 'fallback' ? text.fallback : text.topics[entry.key].answer;
        wrapper.append(paragraph);
        if (entry.speaker === 'bot' && entry.key !== 'welcome') {
            const topic = text.topics[entry.key];
            const action = document.createElement('a');
            action.className = 'help-chat-action';
            action.href = topic?.href ?? 'tel:8001886248';
            action.append(document.createTextNode(topic?.action ?? text.fallbackAction));
            const arrow = document.createElement('span');
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '↗';
            action.append(arrow);
            wrapper.append(action);
        }
        return wrapper;
    }

    function renderSuggestions() {
        const fragment = document.createDocumentFragment();
        suggested.forEach(key => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.topic = key;
            button.textContent = current().topics[key].question;
            fragment.append(button);
        });
        suggestions.replaceChildren(fragment);
        suggestions.scrollLeft = 0;
    }

    function renderLanguage() {
        const text = current();
        root.setAttribute('aria-label', text.open);
        root.querySelectorAll('[data-chat-text]').forEach(element => { element.textContent = text[element.dataset.chatText]; });
        toggle.setAttribute('aria-label', text.open);
        close.setAttribute('aria-label', text.close);
        send.setAttribute('aria-label', text.send);
        input.placeholder = text.placeholder;
        messages.setAttribute('aria-label', text.log);
        suggestions.setAttribute('aria-label', text.suggestions);
        messages.replaceChildren(...history.map(makeMessage));
        renderSuggestions();
        messages.scrollTop = messages.scrollHeight;
    }

    function appendExchange(question, topic) {
        const userEntry = { speaker: 'user', ...(question ? { raw: question } : { key: topic }) };
        const answerEntry = { speaker: 'bot', key: topic };
        history.push(userEntry, answerEntry);
        messages.append(makeMessage(userEntry), makeMessage(answerEntry));
        messages.scrollTop = messages.scrollHeight;
    }

    function setOpen(value, restoreFocus = true) {
        opened = value;
        panel.hidden = !value;
        toggle.setAttribute('aria-expanded', String(value));
        if (value) {
            messages.scrollTop = messages.scrollHeight;
            input.focus({ preventScroll: true });
        } else if (restoreFocus) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener('click', () => setOpen(!opened));
    close.addEventListener('click', () => setOpen(false));
    form.addEventListener('submit', event => {
        event.preventDefault();
        const question = input.value.trim();
        if (!question) return;
        appendExchange(question, findTopic(question));
        input.value = '';
        input.focus();
    });
    suggestions.addEventListener('click', event => {
        const button = event.target.closest('button[data-topic]');
        if (!button) return;
        appendExchange(null, button.dataset.topic);
        suggestions.scrollLeft = 0;
        input.focus();
    });
    messages.addEventListener('click', event => {
        if (event.target.closest('a[href^="#"]')) setOpen(false, false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && opened) { event.preventDefault(); setOpen(false); }
    });
    document.addEventListener('click', event => {
        if (opened && !root.contains(event.target) && !event.target.closest('#lang-toggle, #theme-toggle')) setOpen(false, false);
    });
    document.addEventListener('languagechange', renderLanguage);
    renderLanguage();
    root.classList.add('is-ready');
})();
