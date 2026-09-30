(() => {
    'use strict';
    // Detail copy elaborates the existing services, without adding project metrics.
    const content = {
        'data-centers': {
            type: 'service', title: 'dc-title', description: 'dc-desc', image: 'datacenter.png',
            es: [
                ['Gabinetes de alta densidad', 'Organización del equipamiento y su cableado dentro del centro de datos.'],
                ['UPS y PDUs', 'Respaldo y distribución eléctrica para los equipos de la instalación.'],
                ['Aire de precisión', 'Control de las condiciones térmicas de los espacios técnicos.'],
                ['Supresión de incendios', 'Protección del entorno donde se aloja la infraestructura.']
            ],
            en: [
                ['High-density cabinets', 'Organization of equipment and cabling within the data center.'],
                ['UPS and PDUs', 'Backup power and electrical distribution for the installation.'],
                ['Precision cooling', 'Control of thermal conditions in technical spaces.'],
                ['Fire suppression', 'Protection for the environment that houses the infrastructure.']
            ]
        },
        cybersecurity: {
            type: 'service', title: 'cyb-title', description: 'cyb-summary', image: 'case_network.png',
            es: [
                ['Firewalls perimetrales', 'Control del tráfico que entra y sale de la red.'],
                ['Segmentación Zero Trust', 'Separación de usuarios y servicios según sus necesidades de acceso.'],
                ['Protección proactiva', 'Identificación de accesos anómalos y revisión de eventos de seguridad.']
            ],
            en: [
                ['Perimeter firewalls', 'Control of traffic entering and leaving the network.'],
                ['Zero Trust segmentation', 'Separation of users and services according to their access needs.'],
                ['Proactive protection', 'Identification of unusual access and review of security events.']
            ]
        },
        'special-systems': {
            type: 'service', title: 'sys-title', description: 'sys-summary', image: 'case_industrial.png',
            es: [
                ['Analítica de video', 'Monitoreo visual para apoyar la revisión de eventos en la operación.'],
                ['Acceso biométrico', 'Control de ingreso a las áreas definidas por cada instalación.'],
                ['Requisitos de seguridad', 'Revisión de las necesidades relacionadas con CTPAT y OEA.']
            ],
            en: [
                ['Video analytics', 'Visual monitoring to support the review of operational events.'],
                ['Biometric access', 'Entry control for the areas defined by each facility.'],
                ['Security requirements', 'Review of needs related to CTPAT and OEA.']
            ]
        },
        heineken: {
            type: 'project', title: 'case4-title', image: 'case_industrial.png',
            description: {
                es: 'En 2017, en Chihuahua, México, se construyó la planta de producción de Heineken más grande del mundo. NAITEL participó con infraestructura de red de alta disponibilidad, confiable y preparada para la conversión a tecnología 4.0, cumpliendo la normatividad mexicana y estándares internacionales de eficiencia y sustentabilidad.\n\nSe instalaron centros de datos redundantes de doble conversión con monitoreo inteligente y cuartos de distribución secundarios para ampliar la conectividad a alta velocidad. Para responder a las altas temperaturas del área se colocaron gabinetes individuales con aire acondicionado.\n\nEl proyecto sumó cerca de 40 millas de fibra óptica —con cableado verde y rojo según los requisitos de imagen del cliente—, más de 11 millas de racks y charolas, y más de 210,000 horas hombre. En el equipo participaron arquitectos, ingenieros, diseñadores, supervisores, personal de seguridad, técnicos y personal de apoyo. El resultado precedió el reconocimiento de NAITEL como Gold Partner de PANDUIT y el reconocimiento de Heineken como una de las mayores generadoras de empleo del estado de Chihuahua en ese periodo.',
                en: 'In 2017, Chihuahua, Mexico became home to Heineken’s largest brewery plant in the world. NAITEL delivered highly available, reliable network infrastructure prepared for Industry 4.0, meeting Mexican regulations and international efficiency and sustainability standards.\n\nRedundant dual-conversion data centers with intelligent monitoring and secondary distribution rooms expanded high-speed connectivity. Individual air-conditioned cabinets were installed to address the area’s high temperatures.\n\nThe project included nearly 40 miles of fiber optics —with green and red cabling required by the client’s brand standards—, more than 11 miles of racks and trays, and over 210,000 labor hours. Architects, engineers, designers, supervisors, security staff, technicians and support teams participated. The result preceded NAITEL’s PANDUIT Gold Partner recognition and Heineken’s recognition as one of Chihuahua’s largest job creators during that period.'
            },
            es: [
                ['Redundancia', 'Centros de datos y distribución secundaria para una conectividad confiable y escalable.'],
                ['Fibra óptica', 'Cerca de 40 millas de fibra desplegadas en la instalación.'],
                ['Infraestructura física', 'Más de 11 millas de racks y charolas para resguardo e interconectividad.'],
                ['Reconocimiento', 'El proyecto precedió el reconocimiento de NAITEL como Gold Partner de PANDUIT en 2017.']
            ],
            en: [
                ['Redundancy', 'Data centers and secondary distribution for reliable, scalable connectivity.'],
                ['Fiber optics', 'Nearly 40 miles of fiber deployed throughout the facility.'],
                ['Physical infrastructure', 'More than 11 miles of racks and trays for protection and interconnection.'],
                ['Recognition', 'The project preceded NAITEL’s 2017 recognition as a PANDUIT Gold Partner.']
            ]
        },
        pulses: {
            type: 'project', title: 'case5-title', image: 'hero.png',
            description: {
                es: 'El 6 de agosto de 2022, Pulses America, Inc. —empresa que compra y procesa granos y frijoles comestibles secos en Manvel, Dakota del Norte, y Oslo, Minnesota— necesitaba reforzar sus sistemas de seguridad para asegurar que los alimentos distribuidos fueran completamente seguros y estuvieran a salvo de cualquier ataque.\n\nPulses América distribuye sus productos a lo largo de Estados Unidos y exporta frijoles secos, soya, arroz y maíz, entre otros productos, a Canadá. El reto consistía en cumplir con todos los requisitos de seguridad con rapidez para seguir operando, sin interrumpir el trabajo diario.',
                en: 'On August 6, 2022, Pulses America, Inc. —a company that buys and processes edible dry grains and beans in Manvel, North Dakota, and Oslo, Minnesota— needed to reinforce its security systems so the food it distributed remained safe from attack.\n\nPulses America distributes products throughout the United States and exports dry beans, soy, rice and corn, among other products, to Canada. The challenge was meeting every security requirement quickly enough to keep operating without interrupting daily work.'
            },
            es: [
                ['Seguridad operacional', 'Refuerzo de los sistemas de seguridad para proteger una operación de alimentos.'],
                ['Cumplimiento', 'Atención a los requisitos de seguridad solicitados para continuar operando.'],
                ['Distribución', 'Una operación con alcance en Estados Unidos y exportación a Canadá.']
            ],
            en: [
                ['Operational security', 'Security systems reinforced to protect a food operation.'],
                ['Compliance', 'Attention to the security requirements needed to keep operating.'],
                ['Distribution', 'An operation serving the United States and exporting to Canada.']
            ]
        },
        'cracker-barrel': {
            type: 'project', title: 'case6-title', image: 'case_network.png',
            description: {
                es: 'A principios de 2021, Cracker Barrel lanzó el proyecto de actualizar su infraestructura de red de Cat 5e a Cat 6 en todas sus ubicaciones y restaurantes de Estados Unidos. NAITEL fue seleccionado entre varios postores y coordinó instalaciones nocturnas en varios estados, con hasta 15 cuadrillas trabajando simultáneamente.\n\nAl alcanzar 80% de avance, se añadió el reto de actualizar también el cableado VoIP en más de 300 ubicaciones y programar CISCO para el sistema de telefonía. NAITEL agregó cuadrillas para ejecutar ambos proyectos a la vez y los terminó con éxito antes de finalizar 2021.',
                en: 'In early 2021, Cracker Barrel launched a project to upgrade its network infrastructure from Cat 5e to Cat 6 across all of its United States restaurants and locations. NAITEL was selected among several national bidders and coordinated overnight installations across multiple states, with up to 15 crews working simultaneously.\n\nAt 80% completion, the challenge expanded to include VoIP cabling at more than 300 locations and CISCO programming for the phone system. NAITEL added crews to run both projects at once and completed them successfully before the end of 2021.'
            },
            es: [
                ['Más de 700 ubicaciones', 'Actualización de cableado de red en restaurantes de todo Estados Unidos.'],
                ['Operación nocturna', 'Hasta 15 cuadrillas trabajaron simultáneamente en distintos estados.'],
                ['VoIP y CISCO', 'Más de 300 ubicaciones adicionales con cableado VoIP y programación CISCO.']
            ],
            en: [
                ['More than 700 locations', 'Network cabling upgraded across restaurants throughout the United States.'],
                ['Overnight operations', 'Up to 15 crews worked simultaneously across different states.'],
                ['VoIP and CISCO', 'More than 300 additional locations with VoIP cabling and CISCO programming.']
            ]
        },
        'conference-rooms': { type: 'service', title: { es: 'Salas de conferencia', en: 'Conference rooms' }, image: 'case_datacenter.png', description: { es: 'Espacios de colaboración con integración audiovisual, conectividad y control sencillo para reuniones.', en: 'Collaboration spaces with audiovisual integration, connectivity and simple meeting controls.' }, es: [['Colaboración', 'Diseño de espacios para reuniones presenciales e híbridas.'], ['Audio y video', 'Integración de imagen, sonido y conexión para presentar contenido.']], en: [['Collaboration', 'Spaces designed for in-person and hybrid meetings.'], ['Audio and video', 'Image, sound and connection integrated for presentations.']] },
        telephony: { type: 'service', title: { es: 'Telefonía', en: 'Telephony' }, image: 'case_network.png', description: { es: 'Soluciones de telefonía y comunicación para mantener conectadas a las personas y áreas de la organización.', en: 'Telephony and communication solutions that keep people and teams connected.' }, es: [['Telefonía IP', 'Comunicación sobre redes corporativas.'], ['Continuidad', 'Diseño orientado a disponibilidad y crecimiento.']], en: [['IP telephony', 'Communication over corporate networks.'], ['Continuity', 'Design focused on availability and growth.']] },
        'audio-video': { type: 'service', title: { es: 'Audio y video', en: 'Audio and video' }, image: 'case_industrial.png', description: { es: 'Sistemas audiovisuales para comunicar, monitorear y presentar información con claridad.', en: 'Audiovisual systems for communication, monitoring and clear information sharing.' }, es: [['Integración', 'Equipos conectados en una experiencia sencilla.'], ['Monitoreo', 'Señal e información disponibles donde se necesitan.']], en: [['Integration', 'Connected equipment in a simple user experience.'], ['Monitoring', 'Signal and information available where needed.']] },
        'fire-suppression': { type: 'service', title: { es: 'Supresión de incendios', en: 'Fire suppression' }, image: 'datacenter.png', description: { es: 'Protección especializada para cuartos técnicos y centros de datos.', en: 'Specialized protection for technical rooms and data centers.' }, es: [['Detección', 'Identificación temprana de una condición de riesgo.'], ['Protección', 'Sistemas pensados para preservar el equipamiento crítico.']], en: [['Detection', 'Early identification of a risk condition.'], ['Protection', 'Systems designed to protect critical equipment.']] },
        software: { type: 'service', title: { es: 'Desarrollo de software', en: 'Software development' }, image: 'case_network.png', description: { es: 'Desarrollo e integración de herramientas digitales para necesidades específicas de la operación.', en: 'Development and integration of digital tools for specific operational needs.' }, es: [['Integración', 'Conexión con los sistemas que ya utiliza la organización.'], ['Adaptación', 'Flujos pensados para cada operación.']], en: [['Integration', 'Connection with the systems the organization already uses.'], ['Adaptation', 'Workflows shaped around each operation.']] },
        hardware: { type: 'service', title: { es: 'Consultoría de hardware', en: 'Hardware consulting' }, image: 'case_datacenter.png', description: { es: 'Acompañamiento para seleccionar, organizar y actualizar el equipamiento tecnológico.', en: 'Guidance to select, organize and update technology equipment.' }, es: [['Evaluación', 'Revisión de necesidades y compatibilidad.'], ['Planeación', 'Una ruta clara para crecer con control.']], en: [['Assessment', 'Review of needs and compatibility.'], ['Planning', 'A clear path to grow with control.']] },
        'structured-cabling': { type: 'service', title: { es: 'Cableado estructurado y fibra óptica', en: 'Structured cabling and fiber optics' }, image: 'case_network.png', description: { es: 'Infraestructura física para transportar información con orden, capacidad y trazabilidad.', en: 'Physical infrastructure for organized, capable and traceable information transport.' }, es: [['Cableado', 'Distribución ordenada para las áreas de trabajo.'], ['Fibra óptica', 'Conectividad de alta capacidad entre sitios.']], en: [['Cabling', 'Organized distribution for work areas.'], ['Fiber optics', 'High-capacity connectivity between sites.']] },
        networks: { type: 'service', title: { es: 'Redes', en: 'Networks' }, image: 'case_network.png', description: { es: 'Diseño e implementación de redes que acompañan el ritmo de la operación.', en: 'Network design and implementation that keeps pace with operations.' }, es: [['Diseño', 'Arquitectura preparada para disponibilidad y crecimiento.'], ['Conectividad', 'Comunicación estable entre usuarios, equipos y sitios.']], en: [['Design', 'Architecture prepared for availability and growth.'], ['Connectivity', 'Stable communication between users, equipment and sites.']] },
        'security-systems': { type: 'service', title: { es: 'Sistemas de seguridad', en: 'Security systems' }, image: 'case_industrial.png', description: { es: 'Tecnología para observar, controlar y responder a eventos relevantes de la operación.', en: 'Technology to observe, control and respond to relevant operational events.' }, es: [['Video', 'Monitoreo para apoyar la revisión de eventos.'], ['Accesos', 'Control de ingreso según las áreas definidas.']], en: [['Video', 'Monitoring to support event review.'], ['Access', 'Entry control according to defined areas.']] },
        'smart-workspaces': { type: 'service', title: { es: 'Espacios de trabajo inteligentes', en: 'Smart workspaces' }, image: 'case_datacenter.png', description: { es: 'Entornos de trabajo conectados, cómodos y listos para colaborar.', en: 'Connected, comfortable work environments ready for collaboration.' }, es: [['Automatización', 'Tecnología que simplifica tareas cotidianas.'], ['Experiencia', 'Espacios pensados para las personas que los usan.']], en: [['Automation', 'Technology that simplifies daily tasks.'], ['Experience', 'Spaces designed around the people who use them.']] }
    };
    const dialog = document.getElementById('detail-dialog');
    if (!dialog || typeof dialog.showModal !== 'function' || typeof translations === 'undefined') return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const closeButton = dialog.querySelector('.detail-close');
    let trigger;
    let activeKey;
    let closeTimer;
    let afterClose;

    function renderDetail() {
        const item = content[activeKey];
        if (!item) return;
        const language = document.documentElement.lang === 'en' ? 'en' : 'es';
        const labels = translations[language];
        const localized = value => typeof value === 'string' ? (labels[value] ?? value) : value[language];
        dialog.querySelector('#detail-title').textContent = localized(item.title);
        dialog.querySelector('#detail-label').textContent = labels[`detail-${item.type}`];
        dialog.querySelector('#detail-description').textContent = localized(item.description);
        dialog.querySelector('#detail-section-title').textContent = labels['detail-includes'];
        dialog.querySelector('#detail-image').src = `assets/images/${item.image}`;
        const points = item[language].map(([title, description]) => {
            const entry = document.createElement('li');
            const heading = document.createElement('strong');
            heading.textContent = title;
            const text = document.createElement('p');
            text.textContent = description;
            entry.append(heading, text);
            return entry;
        });
        dialog.querySelector('#detail-points').replaceChildren(...points);
    }
    function finishClose() {
        window.clearTimeout(closeTimer);
        closeTimer = null;
        dialog.classList.remove('is-closing');
        document.documentElement.classList.remove('detail-open');
        if (dialog.open) dialog.close();
        if (afterClose) { const action = afterClose; afterClose = null; action(); }
        else trigger?.focus({ preventScroll: true });
    }
    function closeDetail(action) {
        if (!dialog.open || closeTimer) return;
        afterClose = action;
        if (motion.matches) { finishClose(); return; }
        dialog.classList.add('is-closing');
        closeTimer = window.setTimeout(finishClose, 180);
    }
    document.querySelectorAll('[data-detail]').forEach(button => {
        if (!content[button.dataset.detail]) return;
        button.hidden = false;
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', 'detail-dialog');
        button.addEventListener('click', () => {
            trigger = button;
            activeKey = button.dataset.detail;
            renderDetail();
            document.documentElement.classList.add('detail-open');
            dialog.showModal();
            dialog.querySelector('.detail-panel').scrollTop = 0;
            closeButton.focus({ preventScroll: true });
        });
    });
    document.dispatchEvent(new CustomEvent('details-ready'));
    closeButton.addEventListener('click', () => closeDetail());
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeDetail(); });
    let startedOutside = false;
    const outside = event => {
        const box = dialog.getBoundingClientRect();
        return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    };
    dialog.addEventListener('pointerdown', event => { startedOutside = outside(event); });
    dialog.addEventListener('click', event => { if (startedOutside && outside(event)) closeDetail(); });
    dialog.querySelector('.detail-contact').addEventListener('click', event => {
        event.preventDefault();
        closeDetail(() => {
            window.location.hash = 'contacto';
            document.getElementById('full-name')?.focus({ preventScroll: true });
        });
    });
    document.addEventListener('languagechange', () => { if (dialog.open) renderDetail(); });
    motion.addEventListener('change', event => { if (event.matches && closeTimer) finishClose(); });
})();
