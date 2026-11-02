const { chromium } = require('C:/Users/Aleon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const output = path.join(__dirname, process.env.NAITELS_REVIEW_DIR || 'details');
const checks = [];
const pass = label => { checks.push(label); console.log('PASS ' + label); };
(async () => {
    await fs.mkdir(output, { recursive: true });
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.goto('http://127.0.0.1:4174/?version=details', { waitUntil: 'networkidle' });
        await page.locator('.hero-image img').evaluate(img => img.decode());
        await page.screenshot({ path: path.join(output, 'desktop-light.png') });
        await page.locator('#theme-toggle').click();
        await page.screenshot({ path: path.join(output, 'desktop-dark.png') });
        await page.locator('#theme-toggle').click();
        const text = await page.locator('body').innerText();
        for (const removed of ['Ingeniería especializada.', 'Technology Integrator', 'Infraestructura. Seguridad. Conectividad.', 'Tu operación nunca se detiene.']) {
            assert.ok(!text.toLowerCase().includes(removed.toLowerCase()), removed);
        }
        assert.equal(await page.locator('#exito .section-mark').count(), 0);
        pass('Redundant text and decorative project arrow removed');
        for (const lang of ['es', 'en']) {
            if (await page.locator('html').getAttribute('lang') !== lang) await page.locator('#lang-toggle').click();
            for (const width of [320, 390, 600, 768, 800, 801, 960, 1024, 1440]) {
                await page.setViewportSize({ width, height: 1000 });
                const layout = await page.evaluate(() => {
                    const rect = sel => document.querySelector(sel).getBoundingClientRect();
                    const logo = rect('.logo'), actions = rect('.header-actions'), nav = rect('.site-nav');
                    const lines = [...document.querySelectorAll('.hero-line')].map(el => {
                        const r = el.getBoundingClientRect();
                        return { left: r.left, right: r.right, center: r.left + r.width / 2, overflow: el.scrollWidth > el.clientWidth + 1 };
                    });
                    return { width: document.body.getBoundingClientRect().width, scrollWidth: document.documentElement.scrollWidth, lines,
                        overlaps: innerWidth > 800 ? logo.right > nav.left || nav.right > actions.left : logo.right > actions.left };
                });
                assert.ok(layout.scrollWidth <= width, `Page overflow ${lang} ${width}: ${JSON.stringify(layout)}`);
                assert.equal(layout.overlaps, false, `Header collision ${lang} ${width}`);
                for (const line of layout.lines) {
                    assert.equal(line.overflow, false, `Title overflow ${lang} ${width}`);
                    assert.ok(Math.abs(line.center - layout.width / 2) < 2, `Title centered ${lang} ${width}`);
                }
            }
        }
        pass('Centered heading and header fit ES/EN at nine widths, 320–1440 px');
        await page.locator('#lang-toggle').click();
        await page.locator('#arquitectura').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(output, 'services-light.png') });
        await page.locator('.stats-section').scrollIntoViewIfNeeded();
        await page.locator('.stats-section').screenshot({ path: path.join(output, 'stats-light.png') });
        await page.locator('#exito').scrollIntoViewIfNeeded();
        await page.locator('.case-image img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
        const cards = await page.locator('.carousel-item').evaluateAll(els => els.map(el => {
            const r = el.getBoundingClientRect(); const btn = el.querySelector('button').getBoundingClientRect();
            return { top: r.top, height: r.height, button: btn.bottom };
        }));
        for (const card of cards) assert.deepEqual(card, cards[0]);
        await page.screenshot({ path: path.join(output, 'projects-light.png') });
        pass('Project cards and buttons share identical vertical alignment');
        const dialog = page.locator('#detail-dialog');
        for (const key of ['data-centers', 'cybersecurity', 'special-systems', 'manufacturing', 'availability', 'connectivity']) {
            const button = page.locator(`[data-detail="${key}"]`);
            await button.click();
            assert.equal(await dialog.evaluate(el => el.open), true, key);
            assert.ok((await page.locator('#detail-title').innerText()).length > 5);
            assert.ok(await page.locator('#detail-points li').count() >= 3);
            assert.equal(await page.locator('.detail-close').evaluate(el => el === document.activeElement), true);
            await page.locator('#detail-image').evaluate(img => img.decode());
            await page.keyboard.press('Tab');
            assert.equal(await page.locator('.detail-contact').evaluate(el => el === document.activeElement), true);
            await page.keyboard.press('Tab');
            // Native dialog may allow a stop in the browser chrome before wrapping.
            if (await page.evaluate(() => document.activeElement === document.body)) await page.keyboard.press('Tab');
            assert.equal(await page.locator('.detail-close').evaluate(el => el === document.activeElement), true);
            if (key === 'data-centers') await page.screenshot({ path: path.join(output, 'modal-desktop.png') });
            await page.keyboard.press('Escape');
            assert.equal(await dialog.evaluate(el => el.open), false);
            assert.equal(await button.evaluate(el => el === document.activeElement), true);
            assert.equal(await page.locator('html').evaluate(el => el.classList.contains('detail-open')), false);
        }
        pass('All six detail modals open, trap focus, close with Escape and restore focus');
        await page.locator('.carousel-item').first().scrollIntoViewIfNeeded();
        const imageBox = await page.locator('.carousel-item').first().locator('img').boundingBox();
        await page.mouse.click(imageBox.x + imageBox.width / 2, imageBox.y + imageBox.height / 2);
        assert.equal(await page.locator('#detail-title').innerText(), 'Manufactura Inteligente');
        await page.mouse.click(3, 3);
        assert.equal(await dialog.evaluate(el => el.open), false);
        await page.locator('.service-card').first().scrollIntoViewIfNeeded();
        const headingBox = await page.locator('.service-card').first().locator('h3').boundingBox();
        await page.mouse.click(headingBox.x + headingBox.width / 2, headingBox.y + headingBox.height / 2);
        assert.equal(await dialog.evaluate(el => el.open), true);
        await page.locator('.detail-close').click();
        pass('Whole cards are clickable; backdrop and close button work');
        await page.locator('#lang-toggle').click();
        await page.locator('[data-detail="manufacturing"]').click();
        assert.equal(await page.locator('#detail-title').innerText(), 'Smart Manufacturing');
        await page.locator('.detail-contact').click();
        assert.equal(await page.locator('#full-name').evaluate(el => el === document.activeElement), true);
        assert.ok(page.url().endsWith('#contacto'));
        pass('Detail copy translates; CTA reaches and focuses contact form');
        await page.locator('#lang-toggle').click();
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('.logo').click();
        await page.locator('.logo').evaluate(el => el.blur());
        await page.screenshot({ path: path.join(output, 'mobile-light.png') });
        await page.locator('.stats-section').scrollIntoViewIfNeeded();
        await page.locator('.stats-section').screenshot({ path: path.join(output, 'stats-mobile.png') });
        await page.locator('[data-detail="data-centers"]').click();
        await page.screenshot({ path: path.join(output, 'modal-mobile.png') });
        const closeBox = await page.locator('.detail-close').boundingBox();
        await page.locator('.detail-panel').evaluate(el => { el.scrollTop = el.scrollHeight; });
        assert.deepEqual(await page.locator('.detail-close').boundingBox(), closeBox);
        assert.equal(await dialog.evaluate(el => el.scrollWidth > el.clientWidth), false);
        await page.locator('.detail-close').click();
        await page.setViewportSize({ width: 320, height: 568 });
        await page.locator('[data-detail="connectivity"]').click();
        assert.equal(await page.locator('.detail-panel').evaluate(el => el.scrollWidth > el.clientWidth), false);
        await page.locator('.detail-contact').click();
        pass('Mobile detail panel scrolls; close control stays visible; small-screen CTA works');
        await page.locator('.mobile-menu-btn').click();
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.mobile-menu-btn').getAttribute('aria-expanded'), 'false');
        await page.locator('.map-container').scrollIntoViewIfNeeded();
        await page.locator('.custom-leaflet-icon').first().waitFor();
        assert.equal(await page.locator('.custom-leaflet-icon').count(), 6);
        assert.equal(await page.locator('.leaflet-tile').count(), 0);
        pass('Mobile navigation and local vector map remain functional');
        assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
        pass('Reduced motion removes all running animations');
        const motion = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
        motion.on('pageerror', e => errors.push(e.message));
        await motion.goto('http://127.0.0.1:4174', { waitUntil: 'domcontentloaded' });
        await motion.waitForFunction(() => document.querySelector('#hero-title').dataset.typing === 'complete');
        await motion.evaluate(() => document.querySelector('#lang-toggle').click());
        assert.equal(await motion.locator('#hero-title').getAttribute('data-typing'), 'active');
        const before = await motion.locator('#hero-title').boundingBox();
        await motion.waitForFunction(() => document.querySelector('#hero-title').dataset.typing === 'complete');
        assert.deepEqual(await motion.locator('#hero-title').boundingBox(), before);
        await motion.evaluate(() => document.querySelector('#lang-toggle').click());
        await motion.emulateMedia({ reducedMotion: 'reduce' });
        await motion.waitForFunction(() => document.querySelector('#hero-title').dataset.typing === 'complete');
        assert.equal(await motion.locator('.hero-line').first().evaluate(el => getComputedStyle(el.firstChild).opacity), '1');
        pass('Typing runs once per language change, keeps layout stable and stops for reduced motion');
        assert.deepEqual(errors, []);
        pass('No JavaScript errors');
        await fs.writeFile(path.join(output, 'checks.json'), JSON.stringify(checks, null, 2));
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
