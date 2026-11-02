const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const server = require('./preview.cjs');

(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion: 'reduce' });
            await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'domcontentloaded' });
            await page.waitForFunction(() => document.querySelectorAll('.service-chip:not([hidden])').length === 10);
            const value = () => page.locator('[data-service-progress]').evaluate(element => Number(element.style.transform.match(/scaleX\(([^)]+)\)/)?.[1] || 0));
            await page.waitForFunction(() => document.querySelector('[data-service-progress]').style.transform !== '');
            const start = await value();
            assert(start > 0 && start < 1, 'Progress must start partially filled');
            await page.locator('[data-service-next]').click();
            await page.waitForFunction(previous => Number(document.querySelector('[data-service-progress]').style.transform.match(/scaleX\(([^)]+)\)/)?.[1] || 0) > previous, start);
            await page.locator('.service-chip-viewport').evaluate(element => { element.scrollLeft = element.scrollWidth; });
            await page.waitForFunction(() => document.querySelector('[data-service-progress]').style.transform === 'scaleX(1)');
            await page.locator('[data-service-prev]').click();
            await page.waitForFunction(() => Number(document.querySelector('[data-service-progress]').style.transform.match(/scaleX\(([^)]+)\)/)?.[1] || 0) < 1);
            await page.close();
        }
        const autoPage = await browser.newPage({ viewport: { width: 1440, height: 800 } });
        await autoPage.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'domcontentloaded' });
        await autoPage.waitForFunction(() => document.querySelector('[data-service-progress]').style.transform !== '');
        const initialAuto = await autoPage.locator('[data-service-progress]').evaluate(element => Number(element.style.transform.match(/scaleX\(([^)]+)\)/)?.[1] || 0));
        await autoPage.waitForFunction(previous => Number(document.querySelector('[data-service-progress]').style.transform.match(/scaleX\(([^)]+)\)/)?.[1] || 0) > previous, initialAuto, { timeout: 7000 });
        await autoPage.close();
        console.log('Service progress check passed at 390 and 1440 px, including autoplay.');
    } finally {
        await browser.close();
        server.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
