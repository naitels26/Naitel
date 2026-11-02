const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const server = require('./preview.cjs');
const path = require('node:path');
(async () => {
    await new Promise(resolve => server.listen(4174, '127.0.0.1', resolve));
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
        await page.goto('http://127.0.0.1:4174', { waitUntil: 'networkidle' });
        await page.locator('.map-container').scrollIntoViewIfNeeded();
        await page.waitForFunction(() => document.querySelectorAll('.leaflet-tile-loaded').length >= 4);
        await page.waitForLoadState('networkidle');
        console.log(JSON.stringify(await page.locator('.leaflet-tile').evaluateAll(images => images.map(img => ({ src: img.src, box: img.getBoundingClientRect().toJSON(), opacity: getComputedStyle(img).opacity, visibility: getComputedStyle(img).visibility, cls: img.className }))), null, 2));
        await page.screenshot({ path: path.join(__dirname, 'map-final.png') });
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
