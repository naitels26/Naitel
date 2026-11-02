const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const server = require('./preview.cjs');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const htmlPath = path.resolve(__dirname, '../index.html');
const action = fs.readFileSync(htmlPath, 'utf8').match(/id="contact-form"[^>]*action="([^"]+)"/)[1];
const ajaxEndpoint = action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    let browser;
    try {
        browser = await chromium.launch({ headless: true, channel: 'msedge' });
        for (const width of [390, 1440]) {
            const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            let outcome = 'success';
            let requests = 0;
            await page.route('https://formsubmit.co/**', async route => {
                requests++;
                const request = route.request();
                assert.equal(request.method(), 'POST');
                assert.equal(request.url(), ajaxEndpoint);
                const data = Object.fromEntries(new URLSearchParams(request.postData()));
                assert.equal(data._cc, undefined);
                assert.equal(data._captcha, 'false');
                assert.equal(data.email, 'prueba@example.com');
                assert.ok(data.message);
                if (outcome === 'network') return route.abort();
                const result = outcome === 'pending' ? { success: 'false', message: 'Please activate your email address.' }
                    : { success: outcome === 'success' ? 'true' : 'false', message: 'Test response' };
                await new Promise(resolve => setTimeout(resolve, 1000));
                await route.fulfill({ status: outcome === 'limited' ? 429 : outcome === 'http' ? 500 : 200, contentType: 'application/json', body: outcome === 'invalidJSON' ? '<html>Unavailable</html>' : JSON.stringify(result) });
            });
            await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'domcontentloaded' });
            assert.equal(await page.locator('body').innerText().then(text => text.includes('ventas@naitel.com')), false);
            assert.equal(await page.locator('a[href="mailto:ventas@naitel.com"]').count(), 0);
            await page.evaluate(() => {
                window.testMarkers = [];
                const original = L.marker;
                L.marker = (...args) => {
                    const marker = original(...args);
                    if (args[1]?.title) window.testMarkers.push({ marker, coords: [...args[0]] });
                    return marker;
                };
            });
            await page.locator('#sucursales').scrollIntoViewIfNeeded();
            await page.locator('.map-point-link').first().waitFor();
            assert.equal(await page.locator('.map-point-link[href="#contact-form"]').count(), 7);
            assert.equal(await page.locator('.location-link[href="#contact-form"]').count(), 7);
            const checkMarkers = () => page.evaluate(() => window.testMarkers.length === 7 && window.testMarkers.every(({ marker, coords }) => marker.getLatLng().lat === coords[0] && marker.getLatLng().lng === coords[1]));
            assert.ok(await checkMarkers());
            await page.locator('.leaflet-control-zoom-in').click();
            assert.ok(await checkMarkers());
            await page.locator('[data-location="chihuahua"]').click();
            await page.waitForFunction(() => location.hash === '#contact-form');
            assert.ok(await page.locator('#full-name').evaluate(el => el === document.activeElement));
            assert.equal(await page.locator('#contact-form').getAttribute('action'), action);
            assert.equal(await page.locator('#contact-form').evaluate(el => el.checkValidity()), false);
            await page.locator('#full-name').fill('Prueba local');
            await page.locator('#email').fill('prueba@example.com');
            await page.locator('#message').fill('Consulta de prueba sin envío real.');
            const initialUrl = page.url();
            await page.locator('#contact-form [type="submit"]').click();
            assert.equal(await page.locator('#contact-form').getAttribute('aria-busy'), 'true');
            assert.equal(await page.locator('#contact-form [type="submit"]').isDisabled(), true);
            assert.equal(await page.locator('.submit-button').evaluate(el => getComputedStyle(el, '::before').display), 'block');
            assert.equal(await page.locator('.submit-button').evaluate(el => getComputedStyle(el, '::before').opacity), '1');
            await page.screenshot({ path: `${__dirname}/ventas-loading-${width}.png` });
            await page.locator('#contact-alert[open]').waitFor();
            assert.equal(await page.locator('#contact-alert').getAttribute('data-result'), 'success');
            assert.equal(await page.locator('#contact-alert-title').textContent(), '¡Éxito!');
            assert.equal(await page.locator('#full-name').inputValue(), '');
            assert.equal(page.url(), initialUrl);
            await page.screenshot({ path: `${__dirname}/ventas-success-${width}.png` });
            await page.locator('#contact-alert-close').click();
            for (outcome of ['error', 'http', 'network', 'pending', 'limited', 'invalidJSON']) {
                await page.locator('#full-name').fill('Prueba local');
                await page.locator('#email').fill('prueba@example.com');
                await page.locator('#message').fill('Consulta sin envío real.');
                const before = requests;
                await page.locator('#contact-form').evaluate(el => { el.requestSubmit(); el.requestSubmit(); });
                await page.locator('#contact-alert[open]').waitFor();
                assert.equal(requests, before + 1, 'No duplicate requests');
                assert.equal(await page.locator('#contact-alert').getAttribute('data-result'), outcome === 'pending' ? 'pending' : 'error');
                assert.equal(await page.locator('#full-name').inputValue(), 'Prueba local');
                assert.equal(await page.locator('#contact-form [type="submit"]').isEnabled(), true);
                assert.equal(await page.locator('#contact-form').getAttribute('aria-busy'), null);
                if (outcome === 'limited') assert.match(await page.locator('#contact-alert-message').innerText(), /ocupado/);
                assert.equal((await page.locator('#contact-alert').innerText()).includes('ventas@naitel.com'), false);
                await page.keyboard.press('Escape');
            }
            await page.locator('#theme-toggle').click();
            assert.equal(await page.locator('.brand-symbol circle').evaluate(el => getComputedStyle(el).fill), 'rgb(154, 201, 236)');
            await page.locator('#inicio').scrollIntoViewIfNeeded();
            await page.screenshot({ path: `${__dirname}/ventas-dark-${width}.png` });
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
            assert.deepEqual(errors, []);
            console.log(`OK ${width}px: map, validation, success modal, rejection, HTTP/network failure, activation, retries, duplicate prevention, dark logo.`);
            await page.close();
        }
        for (const finish of ['success', 'timeout']) {
            const slow = await browser.newPage({ reducedMotion: 'reduce' });
            await slow.goto(`http://127.0.0.1:${server.address().port}/`);
            await slow.clock.install();
            let release;
            const gate = new Promise(resolve => { release = resolve; });
            let count = 0;
            await slow.route('https://formsubmit.co/**', async route => {
                count++;
                await gate;
                try { await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true }) }); }
                catch { /* The timeout test has already aborted its request. */ }
            });
            await slow.locator('#full-name').fill('Respuesta lenta');
            await slow.locator('#email').fill('prueba@example.com');
            await slow.locator('#message').fill('Consulta simulada.');
            const request = slow.waitForRequest('https://formsubmit.co/**');
            await slow.locator('#contact-form [type="submit"]').click();
            await request;
            await slow.clock.fastForward(13000);
            assert.match(await slow.locator('#contact-status').innerText(), /tardando/);
            await slow.clock.fastForward(17000);
            assert.equal(await slow.locator('#contact-form').getAttribute('aria-busy'), 'true');
            assert.equal(await slow.locator('#contact-alert').getAttribute('open'), null);
            if (finish === 'success') release();
            else await slow.clock.fastForward(31000);
            await slow.locator('#contact-alert[open]').waitFor();
            assert.equal(await slow.locator('#contact-alert').getAttribute('data-result'), finish === 'success' ? 'success' : 'error');
            if (finish === 'timeout') {
                assert.match(await slow.locator('#contact-alert-message').innerText(), /tardó demasiado/);
                assert.equal(await slow.locator('#full-name').inputValue(), 'Respuesta lenta');
                release();
            }
            assert.equal(count, 1);
            assert.equal(await slow.locator('#contact-form [type="submit"]').isEnabled(), true);
            await slow.close();
        }
        console.log('OK slow provider: pending at 30s, delayed success, 60s timeout, no automatic resend.');
        const local = await browser.newPage();
        let localRequests = 0;
        await local.route('https://formsubmit.co/**', route => { localRequests++; return route.abort(); });
        await local.goto(pathToFileURL(htmlPath).href);
        await local.locator('#full-name').fill('Prueba local');
        await local.locator('#email').fill('prueba@example.com');
        await local.locator('#message').fill('No enviar desde file.');
        await local.locator('#contact-form [type="submit"]').click();
        await local.locator('#contact-alert[open]').waitFor();
        assert.match(await local.locator('#contact-alert-message').innerText(), /vista previa local/);
        assert.equal(localRequests, 0);
        assert.equal(await local.locator('#full-name').inputValue(), 'Prueba local');
        console.log('OK file://: helpful preview message, retained fields, no request.');
        await local.close();
    } finally {
        await browser?.close();
        server.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
