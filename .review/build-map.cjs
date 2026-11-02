const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(__dirname, 'natural-earth-countries.geojson'));
const features = JSON.parse(source).features.filter(feature => ['MEX', 'USA', 'GTM', 'BLZ', 'CUB', 'HND', 'SLV'].includes(feature.properties.ADM0_A3)).map(feature => ({
    type: 'Feature', properties: { code: feature.properties.ADM0_A3, name: feature.properties.NAME },
    geometry: feature.geometry
}));
const data = { type: 'FeatureCollection', features };
fs.writeFileSync(path.join(root, 'assets/data/coverage.js'), '// Natural Earth 1:110m, public domain. See SOURCE.md. No network requests.\nconst naitelsMapData = ' + JSON.stringify(data) + ';\n');
fs.writeFileSync(path.join(root, 'assets/data/SOURCE.md'), '# Map data\n\nNatural Earth 1:110m Admin 0 Countries. Public domain.\n\nSource: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson\n\nTerms: https://www.naturalearthdata.com/about/terms-of-use/\n\nRetrieved: 2026-09-29\nSHA-256 of source: ' + crypto.createHash('sha256').update(source).digest('hex') + '\n\nOnly Mexico and nearby countries are retained. Country properties are reduced to code and name; coordinates are unchanged. These generalized outlines support a regional coverage map, not street navigation.\n');
// Local fallback for disabled/unavailable JavaScript, using the same coordinates.
const mercatorY = latitude => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360));
const left = -118, right = -86, north = mercatorY(36), south = mercatorY(14);
const project = ([longitude, latitude]) => [((longitude - left) / (right - left) * 700).toFixed(2), ((north - mercatorY(latitude)) / (north - south) * 480).toFixed(2)];
const shapes = features.map(feature => {
    const polygons = feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates];
    const d = polygons.map(polygon => polygon.map(ring => 'M' + ring.map(point => project(point).join(',')).join('L') + 'Z').join('')).join('');
    return `<path d="${d}" fill="${feature.properties.code === 'MEX' ? '#173f63' : '#0b2c49'}" stroke="#50718c" stroke-width="1"/>`;
}).join('');
const locations = [[-106.4245,31.6904],[-106.0691,28.6330],[-106.4850,31.7619],[-100.3161,25.6866],[-100.9855,22.1565],[-100.3899,20.5888]];
const markers = locations.map(point => { const [cx, cy] = project(point); return `<circle cx="${cx}" cy="${cy}" r="5" fill="#f26522" stroke="#fff" stroke-width="2"/>`; }).join('');
fs.writeFileSync(path.join(root,'assets/images/coverage-map.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 480"><rect width="700" height="480" fill="#001f3f"/>${shapes}${markers}</svg>`);
console.log('Local vector coverage:', features.length, 'countries;', fs.statSync(path.join(root, 'assets/data/coverage.js')).size, 'bytes');
