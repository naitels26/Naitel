const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');
const server = require('./preview.cjs');
(async () => {
    await new Promise(resolve => server.listen(4174, '127.0.0.1', resolve));
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
        await page.goto('http://127.0.0.1:4174', { waitUntil: 'networkidle' });
        const results = [];
        for (const theme of ['light', 'dark']) {
            await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
            const contrast = await page.evaluate(() => {
                const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number);
                const luminance = color => rgb(color).map(x => x / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4).reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0);
                const items = [];
                for (const element of document.querySelectorAll('body *')) {
                    if (element.closest('.leaflet-container, [aria-hidden="true"]') || !element.getClientRects().length) continue;
                    const directText = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join('');
                    if (!directText) continue;
                    const style = getComputedStyle(element);
                    let ancestor = element;
                    while (ancestor && getComputedStyle(ancestor).backgroundColor === 'rgba(0, 0, 0, 0)') ancestor = ancestor.parentElement;
                    const background = ancestor ? getComputedStyle(ancestor).backgroundColor : 'rgb(255, 255, 255)';
                    const a = luminance(style.color), b = luminance(background);
                    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
                    const size = parseFloat(style.fontSize);
                    const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
                    items.push({ text: directText.slice(0, 60), ratio: Number(ratio.toFixed(2)), passes: ratio >= (large ? 3 : 4.5) });
                }
                return items;
            });
            assert.deepEqual(contrast.filter(item => !item.passes), [], theme + ' text contrast');
            results.push({ theme, textSamples: contrast.length, minimumRatio: Math.min(...contrast.map(item => item.ratio)) });
            console.log('PASS ' + theme + ' contrast: ' + contrast.length + ' text samples');
            await page.locator('#exito').scrollIntoViewIfNeeded();
            await page.waitForFunction(() => [...document.querySelectorAll('.case-image img')].every(img => img.complete && img.naturalWidth > 0));
            await page.locator('.case-image img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            await page.screenshot({ path: path.join(__dirname, 'projects-' + theme + '.png') });
            await page.locator('#contact-form').scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(__dirname, 'contact-' + theme + '.png') });
        }
        await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('#contact-form').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(__dirname, 'mobile-contact.png') });
        await page.locator('.mobile-menu-btn').click();
        await page.screenshot({ path: path.join(__dirname, 'mobile-menu.png') });
        await page.keyboard.press('Escape');
        await page.locator('.map-container').scrollIntoViewIfNeeded();
        await page.waitForFunction(() => {
            const tiles = [...document.querySelectorAll('.leaflet-tile')];
            return tiles.length > 0 && tiles.every(tile => tile.complete && tile.naturalWidth > 0);
        });
        await page.locator('.leaflet-tile').evaluateAll(images => Promise.all(images.map(img => img.decode())));
        await page.screenshot({ path: path.join(__dirname, 'map-final.png') });
        await page.locator('.logo').click();
        await page.locator('.logo').evaluate(el => el.blur());
        await page.screenshot({ path: path.join(__dirname, 'mobile-full.png'), fullPage: true });
        await fs.writeFile(path.join(__dirname, 'contrast.json'), JSON.stringify(results, null, 2));
        console.log('PASS final desktop/mobile visual captures');
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
