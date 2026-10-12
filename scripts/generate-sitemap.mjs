import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://freeeditingtools.com';

const categories = [
  'image-generic',
  'pdf',
  'string',
  'video',
  'time',
  'audio',
  'json',
  'list',
  'csv',
  'number',
  'png',
  'xml',
  'gif',
  'converters'
];

const staticPages = [
  '',
  'about',
  'privacy',
  'terms',
  'contact'
];

const toolPaths = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name === 'meta.ts' || entry.name === 'meta.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      const basePathMatch = content.match(/defineTool\(\s*['"]([^'"]+)['"]/);
      const pathMatch = content.match(/path:\s*['"]([^'"]+)['"]/);

      if (basePathMatch && pathMatch) {
        toolPaths.push(`${basePathMatch[1]}/${pathMatch[1]}`);
      }
    }
  }
}

walk(path.join(rootDir, 'src', 'pages', 'tools'));

const today = new Date().toISOString().split('T')[0];

const urls = [];

// Static pages
for (const p of staticPages) {
  const loc = p ? `${BASE_URL}/${p}` : `${BASE_URL}/`;
  const priority = p === '' ? '1.0' : '0.8';
  urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
}

// Category pages
for (const cat of categories) {
  urls.push(`  <url>
    <loc>${BASE_URL}/categories/${cat}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
}

// Tool pages
for (const tool of toolPaths.sort()) {
  urls.push(`  <url>
    <loc>${BASE_URL}/${tool}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');

console.log(`Generated sitemap with ${urls.length} URLs at: ${outputPath}`);
