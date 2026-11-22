import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const BASE_URL = 'https://www.freeeditingtools.com';

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory not found. Please run "vite build" first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf8');

function writePage(subPath, html) {
  const targetDir = path.join(distDir, subPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml({ title, description, canonicalUrl, ogType = 'website', bodyContent, jsonLd }) {
  let html = baseTemplate;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Replace or add <meta name="description">
  if (html.includes('name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
  }

  // Canonical tag
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Open Graph
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:type" content=".*?" \/>/i, `<meta property="og:type" content="${ogType}" />`);

  // Twitter
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  // JSON-LD Schema
  if (jsonLd) {
    const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n</head>`;
    html = html.replace('</head>', schemaScript);
  }

  // Inject prerendered body into <div id="root">
  if (bodyContent) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);
  }

  return html;
}

// -------------------------------------------------------------
// 1. PRERENDER BLOG POSTS (Full content for Google & AdSense)
// -------------------------------------------------------------
const blogPath = path.join(rootDir, 'src', 'content', 'blogPosts.json');
let blogCount = 0;

if (fs.existsSync(blogPath)) {
  const blogPosts = JSON.parse(fs.readFileSync(blogPath, 'utf8'));

  for (const post of blogPosts) {
    const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
    const pageTitle = `${post.title} - FreeEditingTools`;
    const description = post.excerpt || post.intro || 'Read our expert guide on image, video, and data optimization.';

    // Build rich semantic body for crawlers
    let sectionsHtml = '';
    if (Array.isArray(post.sections)) {
      for (const section of post.sections) {
        const paragraphs = Array.isArray(section.paragraphs)
          ? section.paragraphs.map(p => `<p style="margin-bottom:1.25rem;font-size:1.0625rem;line-height:1.75;color:#334155;">${escapeHtml(p)}</p>`).join('')
          : '';
        const referenceHtml = section.reference
          ? `<p style="margin-top:0.75rem;font-size:0.9rem;color:#64748b;">Reference: <a href="${escapeHtml(section.reference.url)}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;">${escapeHtml(section.reference.label)}</a></p>`
          : '';

        sectionsHtml += `
          <section style="margin-top:2.5rem;">
            <h2 style="font-size:1.625rem;font-weight:700;color:#0f172a;margin-bottom:1rem;">${escapeHtml(section.heading)}</h2>
            ${paragraphs}
            ${referenceHtml}
          </section>
        `;
      }
    }

    let relatedToolsHtml = '';
    if (Array.isArray(post.tools) && post.tools.length > 0) {
      const toolLinks = post.tools.map(t => `<li style="margin-bottom:0.5rem;"><a href="${escapeHtml(t.path)}" style="color:#2563eb;text-decoration:underline;font-weight:600;">${escapeHtml(t.label)}</a></li>`).join('');
      relatedToolsHtml = `
        <div style="margin-top:3rem;padding:1.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
          <h3 style="margin-top:0;font-size:1.25rem;color:#0f172a;">Try the Tools Mentioned</h3>
          <ul style="padding-left:1.25rem;margin:0;">
            ${toolLinks}
          </ul>
        </div>
      `;
    }

    const bodyContent = `
      <main class="ssr-article-wrapper" style="max-width:820px;margin:0 auto;padding:3rem 1.25rem;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;">
        <nav style="font-size:0.875rem;color:#64748b;margin-bottom:2rem;">
          <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; 
          <a href="/blog" style="color:#2563eb;text-decoration:none;">Blog</a> &gt; 
          <span style="color:#0f172a;">${escapeHtml(post.title)}</span>
        </nav>
        <article>
          <header style="margin-bottom:2rem;">
            <span style="display:inline-block;padding:4px 12px;background:#e2e8f0;border-radius:9999px;font-size:0.75rem;font-weight:700;text-transform:uppercase;color:#475569;margin-bottom:1rem;">${escapeHtml(post.category)}</span>
            <h1 style="font-size:2.25rem;font-weight:800;line-height:1.25;color:#0f172a;margin:0 0 1rem 0;">${escapeHtml(post.title)}</h1>
            <p style="font-size:0.9rem;color:#64748b;margin:0;">Published on <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time> • Author: ${escapeHtml(post.author || 'Taha Mazhar')}</p>
          </header>
          <p style="font-size:1.1875rem;line-height:1.75;color:#1e293b;font-weight:500;margin-bottom:2rem;padding-left:1rem;border-left:4px solid #2563eb;">${escapeHtml(post.intro)}</p>
          ${sectionsHtml}
          ${relatedToolsHtml}
        </article>
      </main>
    `;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': description,
      'datePublished': post.date,
      'author': {
        '@type': 'Person',
        'name': post.author || 'Taha Mazhar'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'FreeEditingTools',
        'url': BASE_URL
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    };

    const fullHtml = buildHtml({
      title: pageTitle,
      description,
      canonicalUrl,
      ogType: 'article',
      bodyContent,
      jsonLd
    });

    writePage(`blog/${post.slug}`, fullHtml);
    blogCount++;
  }
}

console.log(`✓ Prerendered ${blogCount} blog articles with full static HTML & Schema.`);

// -------------------------------------------------------------
// 2. PRERENDER TOOL PAGES (With semantic content & WebApp schema)
// -------------------------------------------------------------
const localesDir = path.join(rootDir, 'public', 'locales', 'en');
const locales = {};

if (fs.existsSync(localesDir)) {
  for (const file of fs.readdirSync(localesDir)) {
    if (file.endsWith('.json')) {
      const name = file.replace('.json', '');
      try {
        locales[name] = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
      } catch (e) {}
    }
  }
}

function resolveLocaleValue(localeKey) {
  if (!localeKey || !localeKey.includes(':')) return null;
  const [namespace, keyPath] = localeKey.split(':');
  const fileData = locales[namespace];
  if (!fileData) return null;

  const parts = keyPath.split('.');
  let current = fileData;
  for (const p of parts) {
    if (current && typeof current === 'object' && p in current) {
      current = current[p];
    } else {
      return null;
    }
  }
  return typeof current === 'string' ? current : null;
}

const toolEntries = [];
function walkTools(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTools(fullPath);
    } else if (entry.name === 'meta.ts' || entry.name === 'meta.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      const basePathMatch = content.match(/defineTool\(\s*['"]([^'"]+)['"]/);
      const pathMatch = content.match(/path:\s*['"]([^'"]+)['"]/);
      const titleMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
      const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);

      if (basePathMatch && pathMatch) {
        toolEntries.push({
          category: basePathMatch[1],
          toolPath: pathMatch[1],
          rawTitleKey: titleMatch ? titleMatch[1] : null,
          rawDescKey: descMatch ? descMatch[1] : null
        });
      }
    }
  }
}

walkTools(path.join(rootDir, 'src', 'pages', 'tools'));

let toolCount = 0;
for (const entry of toolEntries) {
  const localizedTitle = resolveLocaleValue(entry.rawTitleKey) || `${entry.toolPath.replace(/-/g, ' ')} Tool`;
  const localizedDesc = resolveLocaleValue(entry.rawDescKey) || `Free online browser utility for ${entry.toolPath.replace(/-/g, ' ')}. 100% private, client-side execution.`;
  const canonicalUrl = `${BASE_URL}/${entry.category}/${entry.toolPath}`;
  const pageTitle = `${localizedTitle} - Free Online Tool | FreeEditingTools`;

  const bodyContent = `
    <main class="ssr-tool-preview" style="max-width:960px;margin:0 auto;padding:3rem 1.25rem;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      <nav style="font-size:0.875rem;color:#64748b;margin-bottom:2rem;">
        <a href="/" style="color:#2563eb;text-decoration:none;">Home</a> &gt; 
        <a href="/categories/${escapeHtml(entry.category)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(entry.category)}</a> &gt; 
        <span style="color:#0f172a;">${escapeHtml(localizedTitle)}</span>
      </nav>
      <header style="margin-bottom:2rem;">
        <h1 style="font-size:2.25rem;font-weight:800;color:#0f172a;margin:0 0 1rem 0;">${escapeHtml(localizedTitle)}</h1>
        <p style="font-size:1.125rem;line-height:1.75;color:#334155;">${escapeHtml(localizedDesc)}</p>
      </header>

      <section style="margin:2.5rem 0;padding:1.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <h2 style="font-size:1.375rem;font-weight:700;color:#0f172a;margin-top:0;">Key Tool Highlights</h2>
        <ul style="padding-left:1.25rem;color:#475569;line-height:1.75;">
          <li><strong>100% Private:</strong> Files are processed locally in your browser using modern WebAssembly / client-side APIs. Your data never leaves your device.</li>
          <li><strong>Fast &amp; Free:</strong> Zero waiting queues, zero file size limits, and no account registration required.</li>
          <li><strong>No Watermarks:</strong> Exports are clean and full resolution.</li>
        </ul>
      </section>

      <section style="margin-top:2.5rem;">
        <h2 style="font-size:1.375rem;font-weight:700;color:#0f172a;">How to Use ${escapeHtml(localizedTitle)}</h2>
        <ol style="padding-left:1.25rem;color:#334155;line-height:1.8;">
          <li>Select or drag-and-drop your file into the tool interface.</li>
          <li>Adjust the desired settings or options to customize the result.</li>
          <li>Click process and download your optimized file instantly.</li>
        </ol>
      </section>
    </main>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': localizedTitle,
    'description': localizedDesc,
    'url': canonicalUrl,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  const html = buildHtml({
    title: pageTitle,
    description: localizedDesc,
    canonicalUrl,
    bodyContent,
    jsonLd
  });

  writePage(`${entry.category}/${entry.toolPath}`, html);
  toolCount++;
}

console.log(`✓ Prerendered ${toolCount} tool pages with metadata & WebApp schema.`);

// -------------------------------------------------------------
// 3. PRERENDER CATEGORIES & STATIC PAGES
// -------------------------------------------------------------
const categories = [
  'image-generic', 'pdf', 'string', 'video', 'time', 'audio',
  'json', 'list', 'csv', 'number', 'png', 'xml', 'gif', 'converters'
];

for (const cat of categories) {
  const catTitle = `${cat.replace(/-/g, ' ').toUpperCase()} Free Online Tools - FreeEditingTools`;
  const catDesc = `Browse all free online browser tools for ${cat.replace(/-/g, ' ')}. 100% client-side, secure, and free.`;
  const canonicalUrl = `${BASE_URL}/categories/${cat}`;

  const matchingTools = toolEntries.filter(t => t.category === cat);
  const toolListHtml = matchingTools.map(t => {
    const title = resolveLocaleValue(t.rawTitleKey) || t.toolPath;
    return `<li><a href="/${t.category}/${t.toolPath}" style="color:#2563eb;text-decoration:underline;">${escapeHtml(title)}</a></li>`;
  }).join('');

  const bodyContent = `
    <main style="max-width:900px;margin:0 auto;padding:3rem 1.25rem;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
      <h1>${cat.replace(/-/g, ' ').toUpperCase()} Tools</h1>
      <p>${catDesc}</p>
      <ul style="line-height:1.8;padding-left:1.5rem;">${toolListHtml}</ul>
    </main>
  `;

  const html = buildHtml({
    title: catTitle,
    description: catDesc,
    canonicalUrl,
    bodyContent
  });

  writePage(`categories/${cat}`, html);
}

const staticPages = [
  { path: 'about', title: 'About Us - FreeEditingTools', desc: 'Learn more about FreeEditingTools, our privacy-first philosophy, and our free in-browser utilities.' },
  { path: 'privacy', title: 'Privacy Policy - FreeEditingTools', desc: 'Privacy Policy for FreeEditingTools. All file processing occurs client-side in your browser.' },
  { path: 'terms', title: 'Terms of Service - FreeEditingTools', desc: 'Terms of Service for using FreeEditingTools.' },
  { path: 'contact', title: 'Contact Us - FreeEditingTools', desc: 'Contact the FreeEditingTools team for feedback, tool requests, or support.' },
  { path: 'blog', title: 'Blog & Optimization Guides - FreeEditingTools', desc: 'Guides and tutorials on optimizing images, trimming videos, managing PDFs, and data conversion.' }
];

for (const sp of staticPages) {
  const canonicalUrl = `${BASE_URL}/${sp.path}`;
  const html = buildHtml({
    title: sp.title,
    description: sp.desc,
    canonicalUrl
  });
  writePage(sp.path, html);
}

console.log('✓ Prerendered static and category pages successfully.');
console.log('🚀 Build prerendering completed! All pages now contain static HTML for Googlebot and AdSense.');
