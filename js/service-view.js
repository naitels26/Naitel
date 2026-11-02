(() => {
    'use strict';
    const page = servicePages[document.body.dataset.servicePage];
    if (!page) return;
    const labels = {
        es: { back: 'Todos los servicios', about: 'Sobre esta solución', stages: 'Un proyecto. Cuatro etapas.', disciplines: 'Áreas de servicio', cta: 'Hablemos de tu proyecto.', advice: 'Solicitar asesoría ↗', related: 'Otros servicios' },
        en: { back: 'All services', about: 'About this solution', stages: 'One project. Four stages.', disciplines: 'Service areas', cta: 'Let’s talk about your project.', advice: 'Request guidance ↗', related: 'Other services' }
    };
    function render() {
        const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
        document.querySelectorAll('[data-service-copy]').forEach(element => { element.textContent = page[element.dataset.serviceCopy][lang]; });
        document.querySelectorAll('[data-service-label]').forEach(element => { element.textContent = labels[lang][element.dataset.serviceLabel]; });
        document.querySelectorAll('[data-service-stage]').forEach(element => {
            const [index, field] = element.dataset.serviceStage.split(':');
            element.textContent = page.stages[lang][index][field];
        });
        document.querySelectorAll('[data-discipline-copy]').forEach(element => {
            const [id, field] = element.dataset.disciplineCopy.split(':');
            element.textContent = serviceDisciplines[id][field][lang];
        });
        document.querySelectorAll('[data-service-group]').forEach(element => {
            const [index, field] = element.dataset.serviceGroup.split(':');
            element.textContent = page.groups[index][field][lang];
        });
        document.querySelector('[data-service-topic-nav]')?.setAttribute('aria-label', lang === 'es' ? 'Temas de esta solución' : 'Topics in this solution');
        document.querySelectorAll('[data-related-service]').forEach(element => { element.textContent = servicePages[element.dataset.relatedService].title[lang]; });
        document.title = `${page.title[lang]} | Naitel`;
        document.querySelector('meta[name="description"]').content = page.about[lang];
        document.dispatchEvent(new CustomEvent('service-heading-ready'));
    }
    render();
    document.addEventListener('languagechange', render);
})();
