const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const translationsPath = path.join(root, 'js/translations.js');
let translations = fs.readFileSync(translationsPath, 'utf8');
const unused = /^\s*"(?:hero-pill|hero-desc|hero-eyebrow|hero-contact|hero-note|hero-image-caption|hero-image-tag|arch-desc|cases-sub|case[123]-category|dc-[1234]|cyb-desc|sys-desc)":.*(?:\r?\n|$)/gm;
translations = translations.replace(unused, '');
fs.writeFileSync(translationsPath, translations);
const cssPath = path.join(root, 'css/expressive.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/^\s*--hero-badge:.*(?:\r?\n|$)/gm, '');
css = css.replace(/^\s*\.(?:hero-pill|hero-description|hero-note|hero-note-line|hero-image-caption|hero-image-tag|image-coordinate|service-symbol|service-list|section-mark|case-category)(?:\s[^\r\n{]*)?\s*\{[^\r\n]*\}(?:\r?\n|$)/gm, '');
fs.writeFileSync(cssPath, css);
fs.writeFileSync(path.join(root, 'LEEME-UI.md'), `# Naitels · Portada limpia y detalles interactivos

## Cambios

- Titular centrado en dos líneas, con más presencia y sin los textos secundarios que se retiraron.
- Efecto de escritura al cargar y al cambiar de idioma. Los caracteres conservan su espacio para evitar saltos de diseño.
- Logo vectorial con órbita azul y naranja, sin descriptor. Se adapta al tema claro y oscuro.
- Fondos azul suave y crema en modo claro, manteniendo la identidad actual.
- Tres proyectos con imágenes, contenedores y botones alineados. Se quitó la flecha decorativa.
- Las tres tarjetas de servicios y las tres de proyectos son clickeables en toda su superficie. Abren una ventana con imagen, descripción y detalles.
- El modal se cierra con Escape, clic fuera o el botón de cierre. Devuelve el foco a la tarjeta y permite ir al formulario de contacto.
- Animaciones de opacity y transform de 180–320 ms. El efecto de escritura revela un carácter cada 28 ms con una transición de 180 ms. Con prefers-reduced-motion el contenido aparece completo y sin animaciones.

## Archivos completos y dónde colocarlos

Los cambios ya están aplicados en esta carpeta. Para trasladarlos a otra copia, conserva estas rutas y reemplaza los archivos completos. No hay fragmentos que deban pegarse dentro de otro archivo.

| Ruta desde la carpeta del sitio | Contenido |
| --- | --- |
| index.html | HTML completo, logo, tarjetas y diálogo. |
| css/style.css | CSS base, accesibilidad y componentes compartidos. |
| css/expressive.css | Composición final, logo, portada, tarjetas y modal. Se carga después del CSS base. |
| js/main.js | Tema, escritura, navegación móvil, formulario y mapa. |
| js/details.js | Contenido en español e inglés y comportamiento de los seis modales. |
| js/translations.js | Textos y cambio de idioma de la página. |
| assets/images/naitels-logo.svg | Logo independiente para fondos claros. |
| assets/images/naitels-logo-dark.svg | Logo independiente para fondos oscuros. |
| assets/images/naitels-symbol.svg | Símbolo y favicon. |
| assets/images/ | Fotografías y mapa estático. |
| assets/data/ | Geografía local y procedencia de los datos. |
| assets/vendor/leaflet/ | Leaflet existente, guardado localmente junto a su licencia. |

El paquete Naitels-portada-y-detalles.zip incluye index.html, css, js, assets y esta guía. Puedes extraerlo en la carpeta que contiene el index.html de destino. La carpeta .review contiene comprobaciones y capturas; no se necesita para publicar.

## Mapa

El mapa regional usa geometría local de Natural Earth y Leaflet 1.9.4. No solicita teselas externas, por lo que evita la dependencia que generaba las imágenes 403. Conserva zoom, desplazamiento y seis ciudades seleccionables. Las coordenadas representan ciudades, no direcciones de oficinas. Sin JavaScript se muestra un mapa SVG local con enlaces a las ciudades.

La fuente Inter se obtiene de Google Fonts y tiene alternativas del sistema. No se añadieron librerías para las animaciones ni para los modales.

## Formulario

Conserva la validación y el aviso de demostración original. No envía correos; este proyecto no incluye un backend de envío.

## Volver a una versión anterior

En la carpeta superior se conservan Naitels-respaldo-antes-logo.zip y Naitels-propuesta-expresiva.zip. La versión minimalista anterior está en Naitels-version-minimalista.zip. Estos respaldos se mantienen separados del paquete nuevo.

## Verificación

Se revisaron en Edge/Chromium el centrado y la navegación de 320 a 1440 px, ambos idiomas, alineación de proyectos, los seis modales, clic en la tarjeta completa, teclado, retorno del foco, cierre siempre visible en móvil, enlace a contacto, efecto de escritura sin saltos y movimiento reducido. Las capturas e informes de esta versión están en .review/details/.
`);
console.log('Removed unused copy and wrote delivery guide');
