const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(config.outputDirectory, 'dist');
assert.equal(config.public, false);
const headers = Object.fromEntries(config.headers.find(rule => rule.source === '/(.*)').headers.map(header => [header.key.toLowerCase(), header.value]));
const policy = Object.fromEntries(headers['content-security-policy'].split(';').map(value => value.trim().split(/\s+/)).filter(parts => parts[0]).map(([directive, ...values]) => [directive, values]));
for (const directive of ['script-src-attr', 'style-src-attr', 'object-src', 'base-uri', 'frame-ancestors', 'frame-src', 'worker-src']) assert.deepEqual(policy[directive], ["'none'"], directive);
assert.deepEqual(policy['script-src'], ["'self'"]);
assert(!headers['content-security-policy'].includes('unsafe-inline'));
assert(!headers['content-security-policy'].includes('unsafe-eval'));
assert(policy['connect-src'].includes('https://formsubmit.co'));
assert(policy['form-action'].includes('https://formsubmit.co'));
assert(policy['style-src'].includes('https://fonts.googleapis.com'));
assert(policy['font-src'].includes('https://fonts.gstatic.com'));
assert.equal(headers['x-frame-options'], 'DENY');
assert.equal(headers['x-content-type-options'], 'nosniff');
assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
const files = [];
function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        assert(!entry.isSymbolicLink(), 'Output must not contain symlinks');
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) walk(file); else files.push(file);
    }
}
walk(output);
const relativeFiles = files.map(file => path.relative(output, file).split(path.sep).join('/'));
for (const relative of relativeFiles) {
    assert(!/(^|\/)(?:\.git|\.review|\.github|scripts|node_modules)(?:\/|$)/.test(relative), `Internal path published: ${relative}`);
    assert(!/(?:^|\/)\.env(?:\.|$)|\.(?:zip|cjs|md|log|map)$/i.test(relative), `Internal file published: ${relative}`);
}
const secretPattern = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:AKIA|ASIA)[A-Z0-9]{16}|github_pat_[A-Za-z0-9_]{30,}|gh[pousr]_[A-Za-z0-9]{30,}|sk-proj-[A-Za-z0-9_-]{30,}/;
for (const file of files) {
    if (!/\.(?:html|htm|js|css|json|svg|txt)$/i.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    assert(!secretPattern.test(text), `Possible credential in ${path.relative(output, file)} (value not printed)`);
    if (file.endsWith('.js')) new vm.Script(text, { filename: file });
    if (file.endsWith('.js') && !file.includes(`${path.sep}vendor${path.sep}`)) {
        assert(!/\b(?:innerHTML|outerHTML|insertAdjacentHTML)\b|\beval\s*\(|\bnew\s+Function\s*\(/.test(text), `Review unsafe DOM/code operation: ${path.relative(output, file)}`);
    }
}
const pages = files.filter(file => path.dirname(file) === output && file.endsWith('.html'));
assert.equal(pages.length, 8);
for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const name = path.basename(file);
    assert(!/\s(?:on\w+|style)\s*=|(?:href|src)\s*=\s*["']\s*javascript:/i.test(html), `Inline executable content/style: ${name}`);
    assert(!/<(?:base|object|embed|iframe)\b/i.test(html), `Unexpected embedded document: ${name}`);
    for (const match of html.matchAll(/<script\b([^>]*)>/gi)) {
        const source = match[1].match(/\bsrc="([^"]+)"/i)?.[1];
        assert(source && !/^(?:https?:)?\/\//.test(source), `Unexpected script source: ${name}`);
    }
    for (const match of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
        if (/^(?:https?:|mailto:|tel:|data:)/.test(match[1])) continue;
        assert(fs.existsSync(path.join(output, match[1])), `Missing public dependency: ${name}: ${match[1]}`);
    }
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) assert(/rel="[^"]*noopener/.test(match[0]), `Unsafe external window: ${name}`);
    for (const match of html.matchAll(/<form\b[^>]*action="([^"]+)"/gi)) assert.equal(new URL(match[1]).origin, 'https://formsubmit.co');
}
assert(fs.existsSync(path.join(output, 'assets/vendor/leaflet/LICENSE')), 'Retain the bundled library license');
console.log(`Security checks passed: ${pages.length} pages, ${files.length} public files, restrictive CSP, safe resource references, private artifacts excluded and credential-pattern scan.`);
console.log('This checks local build output; deployed headers, account access and provider-side abuse controls require separate verification.');
