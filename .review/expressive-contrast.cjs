const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
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
            await page.screenshot({ path: path.join(__dirname, 'expressive/desktop-' + theme + '.png') });
            console.log('PASS ' + theme + ': ' + contrast.length + ' text contrast samples');
        }
        const noJs = await browser.newPage({ javaScriptEnabled: false });
        await noJs.goto('file:///' + path.resolve(__dirname, '../index.html').replaceAll('\\', '/'));
        await noJs.locator('.map-container').scrollIntoViewIfNeeded();
        await noJs.locator('.map-fallback-image').evaluate(img => img.decode());
        assert.ok(await noJs.locator('.map-fallback-image').evaluate(img => img.naturalWidth > 0));
        console.log('PASS static map image decodes without JavaScript');
        await fs.writeFile(path.join(__dirname, 'expressive/contrast.json'), JSON.stringify(results, null, 2));
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
