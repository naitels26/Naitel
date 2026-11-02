// Publish a defined set of site files, never the whole working directory.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Invalid public output directory');
if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw new Error('Public output must not be a symbolic link');

require('./build-service-pages.cjs');
const pages = vm.runInNewContext(fs.readFileSync(path.join(root, 'js/service-data.js'), 'utf8') + '\nservicePages');
const htmlFiles = ['index.html', ...Object.values(pages).map(page => page.file)];
const extensions = new Set(['.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.ttf', '.woff', '.woff2']);
const files = new Set(htmlFiles);
function collect(relative) {
    const absolute = path.resolve(root, relative);
    if (!absolute.startsWith(root + path.sep)) throw new Error('Source path is outside the site');
    const info = fs.lstatSync(absolute);
    if (info.isSymbolicLink()) throw new Error(`Symbolic link cannot be published: ${relative}`);
    if (info.isDirectory()) {
        for (const name of fs.readdirSync(absolute)) if (!name.startsWith('.')) collect(path.join(relative, name));
    } else if (extensions.has(path.extname(relative).toLowerCase()) || /^LICENSE(?:\.|$)/i.test(path.basename(relative))) {
        files.add(relative);
    }
}
for (const directory of ['css', 'js', 'assets']) collect(directory);
// Retain the font's bundled licensing/readme information without exposing source documentation.
files.add('assets/fonts/D3Euronism-readme.htm');
for (const relative of files) {
    const absolute = path.resolve(root, relative);
    if (!absolute.startsWith(root + path.sep) || fs.lstatSync(absolute).isSymbolicLink()) throw new Error(`Invalid public file: ${relative}`);
}

// The only recursively replaced directory is the checked, generated workspace/dist above.
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
for (const relative of files) {
    const destination = path.join(output, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(root, relative), destination);
}
console.log(`Public build: ${files.size} files in ${output}`);
