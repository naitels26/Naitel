const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const output = path.join(__dirname, process.env.NAITELS_REVIEW_DIR || 'details');
(async () => {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
        await page.goto('http://127.0.0.1:4174/?version=clean-details', { waitUntil: 'networkidle' });
        const scan = () => page.evaluate(() => {
            const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number);
            const luminance = color => rgb(color).map(x => x / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4).reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0);
            const items = [];
            const modal = document.querySelector('dialog[open]');
            for (const element of (modal || document.body).querySelectorAll('*')) {
                if (element.closest('.leaflet-container') || !element.getClientRects().length) continue;
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
        const results = [];
        for (const theme of ['light', 'dark']) {
            await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
            const main = await scan();
            assert.deepEqual(main.filter(item => !item.passes), [], theme + ' text contrast');
            await page.locator('[data-detail="data-centers"]').click();
            const modal = await scan();
            assert.deepEqual(modal.filter(item => !item.passes), [], theme + ' modal text contrast');
            await page.locator('#detail-image').evaluate(img => img.decode());
            await page.screenshot({ path: path.join(output, 'modal-' + theme + '.png') });
            await page.keyboard.press('Escape');
            results.push({ theme, main: main.length, modal: modal.length, minimumRatio: Math.min(...main.concat(modal).map(item => item.ratio)) });
            console.log(`PASS ${theme}: ${main.length} page and ${modal.length} modal text samples`);
        }
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.locator('[data-detail="availability"]').click();
        await page.locator('.detail-close').click();
        await page.waitForFunction(() => !document.querySelector('dialog').open);
        assert.equal(await page.locator('[data-detail="availability"]').evaluate(el => el === document.activeElement), true);
        const invalid = await page.evaluate(() => {
            const bad = [];
            for (const el of document.querySelectorAll('body *')) {
                if (el.closest('.leaflet-container')) continue;
                for (const pseudo of [null, '::before', '::after']) {
                    const style = getComputedStyle(el, pseudo);
                    const props = style.transitionProperty.split(',').map(s => s.trim());
                    const durations = style.transitionDuration.split(',').map(parseFloat);
                    for (let i = 0; i < props.length; i++) {
                        const duration = durations[i % durations.length];
                        if (duration && (!['transform', 'opacity'].includes(props[i]) || duration < 0.15 || duration > 0.4)) bad.push([el.className, props[i], duration]);
                    }
                }
            }
            return bad;
        });
        assert.deepEqual(invalid, []);
        console.log('PASS Animated modal close and 150–400 ms transform/opacity transitions');
        const file = 'file:///' + path.resolve(__dirname, '../index.html').replaceAll('\\', '/');
        const offline = await browser.newPage({ reducedMotion: 'reduce' });
        await offline.route(/^https?:/, route => route.abort());
        await offline.goto(file);
        await offline.locator('[data-detail="manufacturing"]').click();
        assert.equal(await offline.locator('#detail-title').innerText(), 'Manufactura Inteligente');
        await offline.keyboard.press('Escape');
        await offline.locator('.map-container').scrollIntoViewIfNeeded();
        await offline.locator('.custom-leaflet-icon').first().waitFor();
        assert.equal(await offline.locator('.custom-leaflet-icon').count(), 6);
        const noJs = await browser.newPage({ javaScriptEnabled: false });
        await noJs.goto(file);
        await noJs.locator('.map-container').scrollIntoViewIfNeeded();
        await noJs.locator('.map-fallback-image').evaluate(img => img.decode());
        assert.equal(await noJs.locator('[data-detail]:visible').count(), 0);
        console.log('PASS Offline details and map; no-JS page retains its static fallback');
        await fs.writeFile(path.join(output, 'audit.json'), JSON.stringify(results, null, 2));
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
