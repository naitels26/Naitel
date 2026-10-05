// Generates static, accessible branch details. Node is only needed when editing data.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const branches = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/branches.json'), 'utf8'));
const dictionarySource = fs.readFileSync(path.join(root, 'js/translations.js'), 'utf8').split('const placeholders =')[0];
const labels = vm.runInNewContext(dictionarySource + '\ntranslations.es;');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const translated = key => `<span data-i18n="${key}">${escape(labels[key])}</span>`;
const phone = number => `<a href="tel:${number.replace(/[^+\d]/g, '')}">${escape(number)}</a>`;
const maps = branch => branch.mapsUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(branch.address);
const list = branches.map((branch, index) => {
    const url = escape(maps(branch));
    return `                        <li class="branch-item" data-branch="${branch.id}" data-lat="${branch.regionalCoords[0]}" data-lng="${branch.regionalCoords[1]}">
                            <a class="location-link" data-location="${branch.id}" href="${url}" target="_blank" rel="noopener noreferrer"><span class="location-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="location-name">${escape(branch.name)}</span><span aria-hidden="true">↗</span></a>
                            <details class="branch-details" name="branches">
                                <summary><span data-i18n="branch-info">Info</span><span class="branch-summary-name"> — ${escape(branch.name)}</span><span class="branch-plus" aria-hidden="true">+</span></summary>
                                <div class="branch-info">
                                    <p class="branch-region">${escape(branch.region)}</p>
                                    <address><a class="branch-address" href="${url}" target="_blank" rel="noopener noreferrer">${escape(branch.address)} <span aria-hidden="true">↗</span></a></address>
                                    <ul class="branch-phones">${branch.phones.map(item => `<li>${translated(item.label)}: ${phone(item.number)}</li>`).join('')}</ul>
                                    <h3 data-i18n="branch-contact">Contacto</h3>
                                    <ul class="branch-contacts">${branch.contacts.map(person => `<li><strong>${escape(person.name)}</strong><a href="mailto:${escape(person.email)}">${escape(person.email)}</a>${person.phone ? phone(person.phone) : ''}</li>`).join('')}</ul>
                                    <h3 data-i18n="branch-hours">Horario local</h3>
                                    <dl class="branch-hours">${branch.hours.map(row => `<div><dt>${translated(row.days)}</dt><dd>${row.time ? escape(row.time) : translated(row.status)}</dd></div>`).join('')}</dl>
                                </div>
                            </details>
                        </li>`;
}).join('\n');
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('<!-- branches:start -->')) throw new Error('Branch insertion markers missing');
html = html.replace(/<!-- branches:start -->[\s\S]*?<!-- branches:end -->/, `<!-- branches:start -->\n${list}\n                        <!-- branches:end -->`);
html = html.replace(/(<span class="coverage-count" aria-hidden="true">)\d+/, '$1' + String(branches.length).padStart(2, '0'));
fs.writeFileSync(htmlPath, html);
// Regenerate just the regional dots; country outlines remain untouched.
const svgPath = path.join(root, 'assets/images/coverage-map.svg');
const svg = fs.readFileSync(svgPath, 'utf8');
const mercator = latitude => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360));
const north = mercator(36), south = mercator(14);
const markers = branches.map(branch => {
    const [lat, lng] = branch.regionalCoords;
    const x = ((lng + 118) / 32 * 700).toFixed(2);
    const y = ((north - mercator(lat)) / (north - south) * 480).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="5" fill="#f26522" stroke="#fff" stroke-width="2"/>`;
}).join('');
fs.writeFileSync(svgPath, svg.replace(/<circle[\s\S]*<\/svg>/, markers + '</svg>'));
console.log(`Generated ${branches.length} branch links and contact panels.`);
