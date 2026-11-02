const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/jpeg' };
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const file = path.resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { const body = await fs.readFile(file); res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(body); }
    catch { res.writeHead(404).end(); }
});
const checks = [];
function pass(label) { checks.push(label); console.log('PASS ' + label); }
(async () => {
    await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
        const page = await context.newPage();
        const errors = [];
        const externalFailures = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('requestfailed', request => externalFailures.push(request.url()));
        await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
        await page.locator('.hero-copy.is-entering').waitFor({ state: 'detached' });
        assert.ok((await page.locator('.hero-description').innerText()).includes('Ingeniería especializada'));
        await page.locator('.map-container').scrollIntoViewIfNeeded();
        await page.locator('.leaflet-marker-icon').first().waitFor();
        assert.equal(await page.locator('.leaflet-marker-icon').count(), 6);
        assert.equal(await page.locator('.leaflet-control-attribution').count(), 1);
        assert.equal((await page.locator('img[fetchpriority="high"]').evaluate(img => img.naturalWidth)), 1024);
        pass('Hero text/images, six map locations and map attribution load');
        await page.locator('.logo').click();
        await page.screenshot({ path: path.join(__dirname, 'desktop-light.png') });
        await page.locator('a[href="#arquitectura"]').first().click();
        await page.locator('.service-card').first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(360);
        await page.screenshot({ path: path.join(__dirname, 'services-light.png') });
        await page.locator('#theme-toggle').click();
        assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
        assert.equal(await page.locator('#theme-toggle').getAttribute('aria-pressed'), 'true');
        await page.locator('.logo').click();
        await page.screenshot({ path: path.join(__dirname, 'desktop-dark.png') });
        await page.locator('#lang-toggle').click();
        assert.equal(await page.locator('html').getAttribute('lang'), 'en');
        assert.ok((await page.locator('.hero-description').innerText()).startsWith('Specialized engineering'));
        assert.equal(await page.locator('label[for="email"]').innerText(), 'Email address *');
        assert.equal(await page.locator('.leaflet-control-zoom-in').getAttribute('aria-label'), 'Zoom in');
        await page.reload({ waitUntil: 'networkidle' });
        assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
        assert.equal(await page.locator('html').getAttribute('lang'), 'en');
        pass('Theme/language controls, labels and persisted preferences');
        for (const width of [320, 390, 600, 768, 800, 801, 960, 1024, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
            assert.equal(overflow, false, 'Overflow at width ' + width);
            if (width > 800) {
                const overlap = await page.evaluate(() => {
                    const logo = document.querySelector('.logo').getBoundingClientRect();
                    const nav = document.querySelector('.site-nav').getBoundingClientRect();
                    const actions = document.querySelector('.header-actions').getBoundingClientRect();
                    return logo.right > nav.left || nav.right > actions.left;
                });
                assert.equal(overlap, false, 'Header overlaps at ' + width);
            }
        }
        pass('No page overflow or header collisions across nine viewport widths (320–1440)');
        await page.setViewportSize({ width: 390, height: 844 });
        assert.equal(await page.locator('#site-nav').evaluate(el => el.inert), true);
        await page.locator('.mobile-menu-btn').click();
        assert.equal(await page.locator('.mobile-menu-btn').getAttribute('aria-expanded'), 'true');
        assert.equal(await page.locator('#site-nav').evaluate(el => el.inert), false);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.mobile-menu-btn').evaluate(el => el === document.activeElement), true);
        await page.locator('.mobile-menu-btn').click();
        await page.locator('a[href="#industrias"]').click();
        assert.equal(new URL(page.url()).hash, '#industrias');
        assert.equal(await page.locator('#site-nav').evaluate(el => el.inert), true);
        pass('Mobile menu: open, Escape, restored focus, inert links and anchor navigation');
        await page.locator('.carousel-container').focus();
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);
        assert.ok(await page.locator('.carousel-container').evaluate(el => el.scrollLeft > 0));
        pass('Project gallery can scroll using the keyboard on mobile');
        await page.locator('.submit-button').click();
        assert.equal(await page.locator('#full-name').evaluate(el => el.validity.valueMissing), true);
        assert.equal(await page.locator('#full-name').evaluate(el => el === document.activeElement), true);
        const focus = await page.locator('#full-name').evaluate(el => getComputedStyle(el).outlineWidth);
        assert.equal(focus, '2px');
        await page.locator('#full-name').fill('Revisión UI');
        await page.locator('#email').fill('invalid');
        await page.locator('#message').fill('Verificación local sin envío de datos.');
        assert.equal(await page.locator('#email').evaluate(el => el.validity.typeMismatch), true);
        await page.locator('#email').fill('prueba@example.com');
        let dialogMessage;
        page.once('dialog', async dialog => { dialogMessage = dialog.message(); await dialog.accept(); });
        await page.locator('.submit-button').click();
        assert.equal(dialogMessage, 'Request sent successfully.');
        pass('Form: required fields, email validation, visible focus and original demo alert');
        await page.locator('#lang-toggle').click();
        await page.locator('#theme-toggle').click();
        await page.screenshot({ path: path.join(__dirname, 'mobile-contact.png') });
        await page.locator('.logo').click();
        await page.screenshot({ path: path.join(__dirname, 'mobile-light.png') });
        const invalidTransitions = await page.evaluate(() => {
            const invalid = [];
            for (const element of document.querySelectorAll('body *')) {
                if (element.closest('.leaflet-container')) continue;
                for (const pseudo of [null, '::before', '::after']) {
                    const style = getComputedStyle(element, pseudo);
                    const durations = style.transitionDuration.split(',').map(v => parseFloat(v) * 1000);
                    const properties = style.transitionProperty.split(',').map(v => v.trim());
                    properties.forEach((property, i) => {
                        const duration = durations[i % durations.length];
                        if (duration && (!['transform', 'opacity'].includes(property) || duration < 150 || duration > 400)) invalid.push({ tag: element.className, property, duration });
                    });
                }
            }
            return invalid;
        });
        assert.deepEqual(invalidTransitions, []);
        pass('Computed transitions use only opacity/transform and stay within 150–400 ms');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.reload({ waitUntil: 'networkidle' });
        assert.equal(await page.locator('.is-pending, .is-entering').count(), 0);
        assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
        await page.locator('.mobile-menu-btn').click();
        assert.equal(await page.locator('#site-nav').evaluate(el => getComputedStyle(el).opacity), '1');
        await page.keyboard.press('Escape');
        await page.screenshot({ path: path.join(__dirname, 'mobile-full.png'), fullPage: true });
        pass('Reduced motion disables animation while preserving menu/content');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.reload({ waitUntil: 'networkidle' });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await page.locator('.is-pending, .is-entering').count(), 0);
        pass('Changing reduced-motion preference live reveals all pending content');
        const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
        const noJs = await noJsContext.newPage();
        await noJs.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
        assert.equal(await noJs.locator('#site-nav').isVisible(), true);
        assert.equal(await noJs.locator('.hero-description').isVisible(), true);
        assert.equal(await noJs.locator('.is-pending').count(), 0);
        assert.equal(await noJs.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        pass('Without JavaScript, content and mobile navigation remain visible');
        await noJsContext.close();
        const fallbackContext = await browser.newContext();
        await fallbackContext.addInitScript(() => {
            Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage denied'); } });
            delete window.IntersectionObserver;
        });
        await fallbackContext.route('**/leaflet.js', route => route.abort());
        const fallback = await fallbackContext.newPage();
        fallback.on('pageerror', error => errors.push(error.message));
        await fallback.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
        assert.equal(await fallback.locator('.is-pending').count(), 0);
        assert.equal(await fallback.locator('.map-fallback').isVisible(), true);
        await fallback.locator('#theme-toggle').click();
        await fallback.locator('#lang-toggle').click();
        assert.equal(await fallback.locator('html').getAttribute('data-theme'), 'dark');
        assert.equal(await fallback.locator('html').getAttribute('lang'), 'en');
        pass('Storage/IntersectionObserver/Leaflet failures do not break the remaining UI');
        await fallbackContext.close();
        assert.deepEqual(errors, []);
        pass('No JavaScript runtime errors');
        await fs.writeFile(path.join(__dirname, 'verification.json'), JSON.stringify({ checks, errors, externalFailures }, null, 2));
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
