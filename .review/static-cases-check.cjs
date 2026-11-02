const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const details = fs.readFileSync(path.join(root, 'js/details.js'), 'utf8');
const branches = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/branches.json'), 'utf8'));

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

const detailKeys = [...html.matchAll(/data-detail="([^"]+)"/g)].map(match => match[1]);
const missingDetails = [...new Set(detailKeys)].filter(key => !details.includes(`${key}:`) && !details.includes(`'${key}'`));
assert(missingDetails.length === 0, `Missing detail content: ${missingDetails.join(', ')}`);
assert((html.match(/class="carousel-item/g) || []).length === 3, 'Expected three success-case cards');
const serviceKeys = ['conference-rooms', 'telephony', 'audio-video', 'fire-suppression', 'software', 'hardware', 'structured-cabling', 'networks', 'security-systems', 'smart-workspaces'];
assert(serviceKeys.every(key => html.includes(`data-detail="${key}"`)), 'Service catalog is missing one or more entries');
assert((html.match(/data-detail="(?:conference-rooms|telephony|audio-video|fire-suppression|software|hardware|structured-cabling|networks|security-systems|smart-workspaces)"/g) || []).length === serviceKeys.length, 'Expected ten service chips');
assert(html.includes('data-service-carousel') && html.includes('data-service-prev') && html.includes('data-service-next'), 'Service carousel controls are missing');
assert(html.includes('assets/images/hero.png') && !html.includes('assets/images/case_pulses.png'), 'Pulses still references its previous image');
assert((html.match(/class="branch-item/g) || []).length === branches.length, 'Branch markup count does not match branches.json');
assert(details.length > 0, 'Detail content is empty');
const main = fs.readFileSync(path.join(root, 'js/main.js'), 'utf8');
assert(main.includes('data-branch-point') && main.includes('location.pointLink'), 'Interactive map point links are missing');
assert(main.includes('details-ready') && main.includes('viewport.scrollBy'), 'Service carousel behavior is missing');
assert(main.includes('setInterval') && main.includes('startAuto') && main.includes('motionPreference'), 'Service carousel autoplay is missing');
assert(html.includes('id="nosotros"') && html.includes('data-i18n="about-mission"'), 'About section is missing');
assert(details.includes("title: 'dc-title'") && details.includes("description: 'dc-desc'"), 'Data center detail is missing');
for (const branch of branches) {
    assert(html.includes(encodeURIComponent(branch.address)), `Google Maps address missing for ${branch.id}`);
}
assert(fs.existsSync(path.join(root, 'assets/images/case_pulses.png')), 'Pulses image is missing');
assert(!html.includes('Manufactura Inteligente') && !html.includes('Redes de Ultra Velocidad') && !html.includes('Alta Disponibilidad'), 'Removed case labels are still visible');
console.log(`Static cases check passed: ${new Set(detailKeys).size} details, 3 cases, 10 services, ${branches.length} branches.`);
