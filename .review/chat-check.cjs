const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const server = require('./preview.cjs');

(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({ viewport: { width, height: 780 }, reducedMotion: 'reduce' });
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
            await page.locator('#inicio').screenshot({ path: path.join(__dirname, `refinement-hero-${width}.png`) });
            await page.locator('#arquitectura').screenshot({ path: path.join(__dirname, `refinement-services-${width}.png`) });
            if (width === 1440) await page.locator('#exito').screenshot({ path: path.join(__dirname, 'refinement-cases-1440.png') });
            const launcher = page.locator('[data-chat-toggle]');
            await launcher.click();
            assert.equal(await launcher.getAttribute('aria-expanded'), 'true');
            assert.equal(await page.locator('.help-chat-panel').isVisible(), true);
            await page.locator('[data-topic="data"]').click();
            assert.match(await page.locator('.help-chat-messages').innerText(), /evaluación integral/);
            await page.locator('[data-chat-input]').fill('¿Dónde están las sucursales?');
            await page.locator('[data-chat-send]').click();
            assert.equal(await page.locator('.help-chat-action[href="#sucursales"]').count(), 1);
            await page.locator('#lang-toggle').click();
            assert.match(await page.locator('.help-chat-messages').innerText(), /comprehensive facilities assessment/);
            await page.locator('[data-chat-input]').fill('a question the FAQ cannot answer');
            await page.locator('[data-chat-send]').click();
            assert.match(await page.locator('.help-chat-messages').innerText(), /do not have a precise answer/);
            await page.locator('.help-chat-action[href="#sucursales"]').click();
            assert.equal(new URL(page.url()).hash, '#sucursales');
            assert.equal(await page.locator('.help-chat-panel').isVisible(), false);
            await page.locator('.branch-details summary').first().click();
            assert.match(await page.locator('.branch-details').first().innerText(), /Switchboard/);
            await page.locator('#lang-toggle').click();
            assert.match(await page.locator('.branch-details').first().innerText(), /Conmutador/);
            await launcher.click();
            const panel = page.locator('.help-chat-panel');
            const box = await panel.boundingBox();
            assert(box.x >= 0 && box.y >= 0 && box.x + box.width <= width + 1, 'Chat fits viewport');
            if (width === 1440) await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
            await page.screenshot({ path: path.join(__dirname, `chat-${width}.png`) });
            await page.keyboard.press('Escape');
            assert.equal(await launcher.getAttribute('aria-expanded'), 'false');
            assert.equal(await page.locator('.help-chat-panel').isVisible(), false);
            assert.equal(await launcher.evaluate(element => element === document.activeElement), true);
            assert.deepEqual(errors, []);
            await page.close();
        }
        console.log('Site check passed: chat, switchboard labels, localization, links, keyboard and responsive layout.');
    } finally {
        await browser.close();
        server.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
