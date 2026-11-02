const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const output = path.join(__dirname, 'expressive');
const checks = [];
const pass = label => { checks.push(label); console.log('PASS ' + label); };
(async () => {
    await fs.mkdir(output, { recursive: true });
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
        const errors = [];
        const tileRequests = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('request', request => { if (/openstreetmap|cartocdn/.test(request.url())) tileRequests.push(request.url()); });
        await page.goto('http://127.0.0.1:4174/?version=expressive', { waitUntil: 'networkidle' });
        await page.locator('.hero-image img').evaluate(img => img.decode());
        await page.screenshot({ path: path.join(output, 'desktop-light.png') });
        await page.locator('#theme-toggle').click();
        await page.screenshot({ path: path.join(output, 'desktop-dark.png') });
        for (const lang of ['es', 'en']) {
            if (await page.locator('html').getAttribute('lang') !== lang) await page.locator('#lang-toggle').click();
            for (const width of [320, 390, 600, 768, 800, 801, 960, 1024, 1440]) {
                await page.setViewportSize({ width, height: 1000 });
                assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow ${lang} ${width}`);
                if (width > 800) {
                    assert.equal(await page.evaluate(() => {
                        const nav = document.querySelector('.site-nav').getBoundingClientRect();
                        return document.querySelector('.logo').getBoundingClientRect().right > nav.left || nav.right > document.querySelector('.header-actions').getBoundingClientRect().left;
                    }), false, `Header ${lang} ${width}`);
                }
            }
        }
        pass('Responsive in ES/EN at nine widths (320–1440), no overflow or header overlap');
        await page.locator('#lang-toggle').click();
        await page.locator('#theme-toggle').click();
        await page.locator('#arquitectura').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, 'services-light.png') });
        await page.locator('#exito').scrollIntoViewIfNeeded();
        await page.locator('.case-image img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
        await page.screenshot({ path: path.join(output, 'projects-light.png') });
        await page.locator('#contacto').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, 'contact-light.png') });
        await page.locator('.coverage-layout').scrollIntoViewIfNeeded();
        await page.locator('.custom-leaflet-icon').first().waitFor();
        assert.equal(await page.locator('.custom-leaflet-icon').count(), 6);
        assert.ok(await page.locator('.leaflet-overlay-pane path').count() >= 7);
        assert.equal(await page.locator('.leaflet-tile').count(), 0);
        assert.equal(await page.locator('button.location-link').count(), 6);
        assert.ok(await page.locator('.leaflet-overlay-pane svg').evaluate(svg => svg.getBoundingClientRect().width > 300));
        await page.screenshot({ path: path.join(output, 'coverage-desktop.png') });
        for (const id of ['juarez', 'chihuahua', 'el-paso', 'monterrey', 'san-luis', 'queretaro']) {
            await page.locator(`button[data-location="${id}"]`).click();
            assert.equal(await page.locator(`button[data-location="${id}"]`).getAttribute('aria-pressed'), 'true');
            assert.equal(await page.locator('.location-link[aria-pressed="true"]').count(), 1);
            assert.equal(await page.locator('.leaflet-popup-content a').getAttribute('target'), '_blank');
        }
        await page.locator('.map-overview').click();
        assert.equal(await page.locator('.location-link[aria-pressed="true"]').count(), 0);
        await page.locator('.leaflet-control-zoom-in').click();
        await page.locator('.map-overview').click();
        assert.deepEqual(tileRequests, []);
        pass('Local vector map: six selectable cities, SVG geometry, overview and zoom; zero tile requests');
        await page.locator('#lang-toggle').click();
        assert.equal(await page.locator('.map-overview').innerText(), 'View all');
        assert.equal(await page.locator('.leaflet-control-zoom-in').getAttribute('aria-label'), 'Zoom in');
        assert.equal(await page.locator('.hero-accent').innerText(), 'infrastructure.');
        await page.locator('#lang-toggle').click();
        pass('New headings, city selection status and map controls translate');
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('.logo').click();
        await page.locator('.logo').evaluate(el => el.blur());
        await page.screenshot({ path: path.join(output, 'mobile-light.png') });
        await page.locator('.mobile-menu-btn').click();
        assert.equal(await page.locator('#site-nav').evaluate(el => el.inert), false);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#site-nav').evaluate(el => el.inert), true);
        assert.equal(await page.locator('.mobile-menu-btn').evaluate(el => el === document.activeElement), true);
        pass('Mobile menu and keyboard focus remain functional');
        await page.locator('.submit-button').click();
        assert.equal(await page.locator('#full-name').evaluate(el => el.validity.valueMissing), true);
        await page.locator('#full-name').fill('Revisión UI');
        await page.locator('#email').fill('revision@example.com');
        await page.locator('#message').fill('Revisión local, sin envío.');
        let dialogText;
        page.once('dialog', async dialog => { dialogText = dialog.message(); await dialog.accept(); });
        await page.locator('.submit-button').click();
        assert.equal(dialogText, 'Solicitud enviada exitosamente.');
        pass('Existing form validation and demo submission remain intact');
        await page.locator('.map-container').scrollIntoViewIfNeeded();
        await page.locator('.map-overview').click();
        await page.screenshot({ path: path.join(output, 'coverage-mobile.png') });
        assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        const invalidTransitions = await page.evaluate(() => {
            const invalid = [];
            for (const element of document.querySelectorAll('body *')) {
                if (element.closest('.leaflet-container')) continue;
                for (const pseudo of [null, '::before', '::after']) {
                    const style = getComputedStyle(element, pseudo);
                    const durations = style.transitionDuration.split(',').map(v => parseFloat(v) * 1000);
                    style.transitionProperty.split(',').map(v => v.trim()).forEach((property, i) => {
                        const duration = durations[i % durations.length];
                        if (duration && (!['transform', 'opacity'].includes(property) || duration < 150 || duration > 400)) invalid.push({ property, duration });
                    });
                }
            }
            return invalid;
        });
        assert.deepEqual(invalidTransitions, []);
        pass('Reduced motion and 150–400 ms transform/opacity constraints preserved');
        // Direct-file use with every HTTP request blocked reproduces the user's likely scenario.
        const offline = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
        offline.on('pageerror', error => errors.push(error.message));
        await offline.route(/^https?:/, route => route.abort());
        await offline.goto('file:///' + path.resolve(__dirname, '../index.html').replaceAll('\\', '/'));
        await offline.locator('.map-container').scrollIntoViewIfNeeded();
        await offline.locator('.custom-leaflet-icon').first().waitFor();
        assert.equal(await offline.locator('.custom-leaflet-icon').count(), 6);
        await offline.locator('button[data-location="el-paso"]').click();
        assert.equal(await offline.locator('#coverage-status').innerText(), 'El Paso, TX');
        await offline.locator('.map-overview').click();
        await offline.screenshot({ path: path.join(output, 'map-without-network.png') });
        pass('Map works from file:// with all HTTP/HTTPS requests blocked');
        const noJs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
        await noJs.goto('http://127.0.0.1:4174', { waitUntil: 'networkidle' });
        assert.equal(await noJs.locator('.map-fallback-image').count(), 1);
        assert.equal(await noJs.locator('a.location-link').count(), 6);
        assert.equal(await noJs.locator('#site-nav').isVisible(), true);
        pass('Without JavaScript, static local map, city links and mobile navigation remain available');
        assert.deepEqual(errors, []);
        pass('No JavaScript runtime errors');
        await fs.writeFile(path.join(output, 'verification.json'), JSON.stringify({ checks, errors, tileRequests }, null, 2));
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
