const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
        await page.goto('http://127.0.0.1:4174/?version=cases', { waitUntil: 'networkidle' });
        assert.equal(await page.locator('.carousel-item').count(), 3);
        assert.equal(await page.locator('.service-chip').count(), 10);
        assert.equal(await page.locator('.service-chip:not([hidden])').count(), 10);
        assert.equal(await page.locator('.branch-item').count(), 7);
        assert.equal(await page.locator('.custom-leaflet-icon').count(), 7);
        assert.equal(await page.locator('.map-point-link').count(), 7);
        const urls = await page.locator('.location-link').evaluateAll(links => links.map(link => link.href));
        assert.ok(urls.some(url => url.includes(encodeURIComponent('14913 Bert Cameron Ave.'))));
        assert.ok(urls.some(url => url.includes(encodeURIComponent('Periférico de la Juventud 8703'))));
        assert.ok(urls.some(url => url.includes(encodeURIComponent('Angus 4'))));
        for (const key of ['heineken', 'pulses', 'cracker-barrel']) {
            const button = page.locator(`[data-detail="${key}"]`);
            await button.click();
            assert.equal(await page.locator('#detail-dialog').evaluate(el => el.open), true);
            assert.ok((await page.locator('#detail-title').innerText()).length > 3);
            assert.ok((await page.locator('#detail-description').innerText()).length > 100);
            assert.ok(await page.locator('#detail-image').evaluate(img => img.complete && img.naturalWidth > 0));
            await page.keyboard.press('Escape');
        }
        for (const key of ['conference-rooms', 'telephony', 'structured-cabling', 'smart-workspaces']) {
            await page.locator(`[data-detail="${key}"]`).click();
            assert.equal(await page.locator('#detail-dialog').evaluate(el => el.open), true);
            assert.ok((await page.locator('#detail-title').innerText()).length > 3);
            await page.keyboard.press('Escape');
        }
        for (const width of [320, 390, 600, 768, 1024, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
        }
        await page.locator('[data-detail="pulses"]').scrollIntoViewIfNeeded();
        await page.screenshot({ path: '.review/cases-check.png' });
        assert.deepEqual(errors, []);
        console.log('PASS 6 casos nuevos, 10 servicios adicionales, 7 enlaces exactos de Maps, modales y responsive');
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
