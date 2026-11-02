const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const { servicePages, serviceDisciplines } = vm.runInNewContext(
    fs.readFileSync(path.join(root, 'js/service-data.js'), 'utf8') + '\n({servicePages, serviceDisciplines})'
);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const header = source.match(/    <header class="site-header">[\s\S]*?<\/header>/)[0].replace(/href="#/g, 'href="index.html#');
const dialog = source.match(/    <dialog class="detail-dialog"[\s\S]*?<\/dialog>/)[0].replace('href="#contacto"', 'href="index.html#contact-form"');
const footer = source.match(/    <footer class="site-footer">[\s\S]*?<\/footer>/)[0];
for (const [key, page] of Object.entries(servicePages)) {
    let head = source.slice(0, source.indexOf('<body>'))
        .replace(/<title>.*?<\/title>/, `<title>${escape(page.title.es)} | Naitel</title>`)
        .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="${escape(page.about.es)}">`)
        .replace(/^.*(?:leaflet|coverage\.js|appointments\.js|calendar\.js|contact\.js|chatbot).*(?:\r?\n|$)/gm, '')
        .replace('    <script src="js/details.js" defer></script>', '    <script src="js/service-view.js" defer></script>\n    <script src="js/details.js" defer></script>')
        .replace('</head>', '    <link rel="stylesheet" href="css/service-pages.css">\n</head>');
    const stages = page.stages ? `
        <section class="service-stages section-padding" aria-labelledby="stages-title">
            <div class="container">
                <h2 id="stages-title" data-service-label="stages">Un proyecto. Cuatro etapas.</h2>
                <ol class="service-stage-grid">${page.stages.es.map(([title, description], i) => `
                    <li class="reveal"><span class="stage-number" aria-hidden="true">0${i + 1}</span><h3 data-service-stage="${i}:0">${escape(title)}</h3><p data-service-stage="${i}:1">${escape(description)}</p></li>`).join('')}
                </ol>
            </div>
        </section>` : '';
    const card = (id, i) => {
        const item = serviceDisciplines[id];
        return `
                    <article class="discipline-card reveal">
                        <div class="discipline-photo"><img src="assets/images/${item.image}" alt="" width="960" height="640" loading="lazy" decoding="async"><span class="card-index" aria-hidden="true">${String(i + 1).padStart(2, '0')} /</span></div>
                        <h4 id="discipline-${id}" data-discipline-copy="${id}:title">${escape(item.title.es)}</h4>
                        <p data-discipline-copy="${id}:summary">${escape(item.summary.es)}</p>
                        <button type="button" class="card-open" data-detail="${id}" aria-labelledby="discipline-${id}" hidden><span class="detail-plus" aria-hidden="true">+</span></button>
                    </article>`;
    };
    const groups = page.groups.map((group, index) => `
                <section class="discipline-group" id="topic-${index}" aria-labelledby="topic-title-${index}">
                    <div class="discipline-group-heading reveal"><span class="topic-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><div><h3 id="topic-title-${index}" data-service-group="${index}:title">${escape(group.title.es)}</h3><p data-service-group="${index}:description">${escape(group.description.es)}</p></div></div>
                    <div class="discipline-grid topic-columns-${Math.min(3, group.items.length)}">${group.items.map(id => card(id, page.disciplines.indexOf(id))).join('')}
                    </div>
                </section>`).join('');
    const topicNav = key !== 'data-centers' && page.groups.length > 1 ? `<nav class="topic-nav" aria-label="Temas de esta solución" data-service-topic-nav>${page.groups.map((group, index) => `<a href="#topic-${index}" data-service-group="${index}:title">${escape(group.title.es)}</a>`).join('')}</nav>` : '';
    const related = (page.related || Object.keys(servicePages).filter(id => id !== key).slice(0, 2)).map(id => {
        const item = servicePages[id];
        return `
                    <a class="related-service" href="${item.file}"><img src="assets/images/${item.image}" alt="" width="160" height="100" loading="lazy"><span data-related-service="${id}">${escape(item.title.es)}</span><span aria-hidden="true">↗</span></a>`;
    }).join('');
    const html = `${head}<body data-service-page="${key}">
    <a class="skip-link" href="#contenido" data-i18n="skip-link">Saltar al contenido</a>
${header}
    <main id="contenido" tabindex="-1">
        <section class="service-page-hero section-padding" aria-labelledby="service-title">
            <div class="container">
                <a class="service-back" href="index.html#servicios"><span aria-hidden="true">←</span><span data-service-label="back">Todos los servicios</span></a>
                <div class="service-page-heading reveal">
                    <h1 id="service-title" data-service-copy="title">${escape(page.title.es)}</h1>
                    <p class="service-tagline" data-service-copy="intro">${escape(page.intro.es)}</p>
                </div>
                <figure class="service-page-image reveal"><img src="assets/images/${page.image}" alt="" width="1024" height="1024" fetchpriority="high"><figcaption data-service-copy="title">${escape(page.title.es)}</figcaption></figure>
                <div class="service-overview reveal"><h2 data-service-label="about">Sobre esta solución</h2><p data-service-copy="about">${escape(page.about.es)}</p></div>
            </div>
        </section>${stages}
        <section class="service-disciplines section-padding" aria-labelledby="disciplines-title">
            <div class="container">
                <div class="section-heading reveal"><h2 id="disciplines-title" data-service-label="disciplines">Áreas de servicio</h2></div>
                ${topicNav}${groups}
                <noscript><p>Activa JavaScript para explorar los detalles. / Enable JavaScript to explore details.</p></noscript>
            </div>
        </section>
        <section class="service-next section-padding">
            <div class="container">
                <div class="service-cta"><div><h2 data-service-label="cta">Hablemos de tu proyecto.</h2></div><a class="btn btn-primary" href="index.html#contact-form" data-service-label="advice">Solicitar asesoría ↗</a></div>
                <h2 class="related-title" data-service-label="related">Otros servicios</h2>
                <div class="related-services">${related}
                </div>
            </div>
        </section>
    </main>
${dialog}
${footer}
</body>
</html>
`;
    fs.writeFileSync(path.join(root, page.file), html);
}
console.log(`Generated ${Object.keys(servicePages).length} service pages.`);
