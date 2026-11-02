const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const server = require('./preview.cjs');

(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion: 'reduce' });
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'domcontentloaded' });
            assert.equal(await page.locator('a.nav-link[href="#servicios"]').innerText(), 'Servicios');
            assert.equal(await page.locator('#servicios .section-heading .subtitle').count(), 0);
            assert.equal(await page.locator('#services-title').innerText(), 'Soluciones.');
            await page.locator('.hero-actions a').click();
            assert.equal(new URL(page.url()).hash, '#servicios');
            await page.locator('#lang-toggle').click();
            assert.equal(await page.locator('a.nav-link[href="#servicios"]').innerText(), 'Services');
            assert.equal(await page.locator('#services-title').innerText(), 'Solutions.');
            await page.locator('[data-chat-toggle]').click();
            await page.locator('[data-topic="services"]').click();
            await page.locator('.help-chat-action[href="#servicios"]').click();
            assert.equal(new URL(page.url()).hash, '#servicios');
            assert.deepEqual(errors, []);
            await page.close();
        }
        console.log('Services navigation passed at 390 and 1440 px in Spanish and English.');
    } finally {
        await browser.close();
        server.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
