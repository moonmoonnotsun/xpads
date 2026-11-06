#!/usr/bin/env node
/**
 * Build the homepage and localized pages from scripts/home.template.html.
 * Usage: node scripts/build-locale-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copy, seo } from '../locales/home-copy.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'scripts/home.template.html');
const APP_ID = '6747011858';
const BASE_URL = 'https://xpads.app';
const APP_NAME = 'Beat Maker Drum Pad: Xpads';

const LOCALE_CONFIG = {
  de: { dir: 'de', hreflang: 'de', label: 'DE', htmlLang: 'de', country: 'de' },
  fr: { dir: 'fr', hreflang: 'fr', label: 'FR', htmlLang: 'fr', country: 'fr' },
  es: { dir: 'es', hreflang: 'es', label: 'ES', htmlLang: 'es', country: 'es' },
  ru: { dir: 'ru', hreflang: 'ru', label: 'RU', htmlLang: 'ru', country: 'ru' },
  pl: { dir: 'pl', hreflang: 'pl', label: 'PL', htmlLang: 'pl', country: 'pl' },
  ja: { dir: 'ja', hreflang: 'ja', label: 'JA', htmlLang: 'ja', country: 'jp' },
  'pt-BR': { dir: 'pt', hreflang: 'pt-BR', label: 'PT', htmlLang: 'pt-BR', country: 'br' },
  'zh-Hans': { dir: 'zh', hreflang: 'zh-Hans', label: 'ZH', htmlLang: 'zh-Hans', country: 'cn' },
  ko: { dir: 'ko', hreflang: 'ko', label: 'KO', htmlLang: 'ko', country: 'kr' },
  it: { dir: 'it', hreflang: 'it', label: 'IT', htmlLang: 'it', country: 'it' },
  nl: { dir: 'nl', hreflang: 'nl', label: 'NL', htmlLang: 'nl', country: 'nl' },
  tr: { dir: 'tr', hreflang: 'tr', label: 'TR', htmlLang: 'tr', country: 'tr' },
  uk: { dir: 'uk', hreflang: 'uk', label: 'UK', htmlLang: 'uk', country: 'ua' },
  ar: { dir: 'ar', hreflang: 'ar', label: 'AR', htmlLang: 'ar', country: 'sa', htmlDir: 'rtl' },
  sv: { dir: 'sv', hreflang: 'sv', label: 'SV', htmlLang: 'sv', country: 'se' },
  'zh-Hant': { dir: 'zh-tw', hreflang: 'zh-Hant', label: 'TW', htmlLang: 'zh-Hant', country: 'tw' },
  'pt-PT': { dir: 'pt-pt', hreflang: 'pt-PT', label: 'PT-PT', htmlLang: 'pt-PT', country: 'pt' },
  vi: { dir: 'vi', hreflang: 'vi', label: 'VI', htmlLang: 'vi', country: 'vn' },
  id: { dir: 'id', hreflang: 'id', label: 'ID', htmlLang: 'id', country: 'id' },
  th: { dir: 'th', hreflang: 'th', label: 'TH', htmlLang: 'th', country: 'th' },
  cs: { dir: 'cs', hreflang: 'cs', label: 'CS', htmlLang: 'cs', country: 'cz' },
  da: { dir: 'da', hreflang: 'da', label: 'DA', htmlLang: 'da', country: 'dk' },
  nb: { dir: 'nb', hreflang: 'nb', label: 'NB', htmlLang: 'nb', country: 'no' },
  fi: { dir: 'fi', hreflang: 'fi', label: 'FI', htmlLang: 'fi', country: 'fi' },
  he: { dir: 'he', hreflang: 'he', label: 'HE', htmlLang: 'he', country: 'il', htmlDir: 'rtl' },
  ca: { dir: 'ca', hreflang: 'ca', label: 'CA', htmlLang: 'ca', country: 'es' },
  hr: { dir: 'hr', hreflang: 'hr', label: 'HR', htmlLang: 'hr', country: 'hr' },
  el: { dir: 'el', hreflang: 'el', label: 'EL', htmlLang: 'el', country: 'gr' },
  hi: { dir: 'hi', hreflang: 'hi', label: 'HI', htmlLang: 'hi', country: 'in' },
  hu: { dir: 'hu', hreflang: 'hu', label: 'HU', htmlLang: 'hu', country: 'hu' },
  ms: { dir: 'ms', hreflang: 'ms', label: 'MS', htmlLang: 'ms', country: 'my' },
  'es-MX': { dir: 'es-mx', hreflang: 'es-MX', label: 'ES-MX', htmlLang: 'es-MX', country: 'mx' },
  ro: { dir: 'ro', hreflang: 'ro', label: 'RO', htmlLang: 'ro', country: 'ro' },
  sk: { dir: 'sk', hreflang: 'sk', label: 'SK', htmlLang: 'sk', country: 'sk' },
  'fr-CA': { dir: 'fr-ca', hreflang: 'fr-CA', label: 'FR-CA', htmlLang: 'fr-CA', country: 'ca' },
};

const FONT_LINKS = {
  ru: 'Manrope:wght@400;500;600;700;800',
  uk: 'Manrope:wght@400;500;600;700;800',
  el: 'Noto+Sans:wght@400;500;600;700;800',
  ar: 'Noto+Sans+Arabic:wght@400;500;600;700;800',
  he: 'Noto+Sans+Hebrew:wght@400;500;600;700;800',
  th: 'Noto+Sans+Thai:wght@400;500;600;700;800',
  hi: 'Noto+Sans+Devanagari:wght@400;500;600;700;800',
  ja: 'Noto+Sans+JP:wght@400;500;700',
  ko: 'Noto+Sans+KR:wght@400;500;700',
  'zh-Hans': 'Noto+Sans+SC:wght@400;500;700',
  'zh-Hant': 'Noto+Sans+TC:wght@400;500;700',
};

const LOCALES = Object.keys(LOCALE_CONFIG);
const ALL_LOCALES = [
  { code: 'en', hreflang: 'en', path: '/', label: 'EN' },
  ...LOCALES.map((code) => ({
    code,
    hreflang: LOCALE_CONFIG[code].hreflang,
    path: `/${LOCALE_CONFIG[code].dir}/`,
    label: LOCALE_CONFIG[code].label,
  })),
];

const RAW_KEYS = new Set([
  'heroHtml',
  'packsHtml',
  'playHtml',
  'stylesHtml',
  'schemaName',
  'featureList',
  'hreflang',
  'ogLocaleAlternates',
  'localeRedirect',
  'langSwitcher',
  'langScript',
  'htmlDirAttr',
  'extraFonts',
  'storeUrl',
]);

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const englishKeys = Object.keys(copy.en);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function appStoreUrl(country) {
  if (!country) return `https://apps.apple.com/app/id${APP_ID}`;
  return `https://apps.apple.com/${country}/app/id${APP_ID}`;
}

function hreflangBlock() {
  const lines = ALL_LOCALES.map(
    ({ hreflang, path: p }) =>
      `    <link rel="alternate" hreflang="${hreflang}" href="${BASE_URL}${p === '/' ? '/' : p}">`,
  );
  lines.push(`    <link rel="alternate" hreflang="x-default" href="${BASE_URL}/">`);
  return lines.join('\n');
}

function localeRedirectScript() {
  const routeEntries = ALL_LOCALES.filter(({ path: p }) => p !== '/').flatMap(({ path: p }) => {
    const dir = p.replace(/\//g, '');
    const entries = [[dir, p]];
    if (dir === 'pt') entries.push(['pt-br', p]);
    if (dir === 'zh') entries.push(['zh-cn', p], ['zh-hans', p]);
    if (dir === 'zh-tw') entries.push(['zh-hant', p], ['zh-hk', p], ['zh-tw', p]);
    if (dir === 'pt-pt') entries.push(['pt-pt', p]);
    if (dir === 'uk') entries.push(['ua', p]);
    if (dir === 'nb') entries.push(['no', p], ['nn', p]);
    if (dir === 'es-mx') entries.push(['es-mx', p]);
    if (dir === 'fr-ca') entries.push(['fr-ca', p]);
    return entries;
  });
  const routesJson = JSON.stringify(Object.fromEntries(routeEntries));
  return `    <script>
        (function () {
            var routes = ${routesJson};
            var path = window.location.pathname;
            if (path !== '/' && path !== '/index.html') return;
            var langs = navigator.languages || [navigator.language || 'en'];
            var primary = (langs[0] || 'en').toLowerCase();
            if (primary === 'en' || primary.indexOf('en-') === 0) return;
            var tag = primary;
            var base = primary.split('-')[0];
            if (routes[tag]) { window.location.replace(routes[tag]); return; }
            if (routes[base]) { window.location.replace(routes[base]); return; }
        })();
    </script>`;
}

function langSwitcherScript() {
  return `    <script>
        (function () {
            var select = document.getElementById('lang-select');
            if (!select) return;
            select.addEventListener('change', function () {
                if (!this.value) return;
                window.location.href = this.value;
            });
        })();
    </script>`;
}

function langSwitcher(currentCode, label) {
  const options = ALL_LOCALES.map(({ code, path: p, label: localeLabel }) => {
    const selected = code === currentCode ? ' selected' : '';
    return `<option value="${p}"${selected}>${localeLabel}</option>`;
  }).join('\n                        ');
  return `<label class="lang">${escapeHtml(label)}
                    <select id="lang-select" aria-label="${escapeHtml(label)}">
                        ${options}
                    </select>
                </label>`;
}

function ogLocaleAlternates(current) {
  return ALL_LOCALES
    .filter(({ code }) => code !== current)
    .map(({ code }) => `    <meta property="og:locale:alternate" content="${seo[code].ogLocale}">`)
    .join('\n');
}

function extraFonts(code) {
  const family = FONT_LINKS[code];
  if (!family) return '';
  return `    <link href="https://fonts.googleapis.com/css2?family=${family}&display=swap" rel="stylesheet">`;
}

function fill(html, values) {
  let out = html;
  for (const [key, value] of Object.entries(values)) {
    const safe = RAW_KEYS.has(key) ? String(value) : escapeHtml(value);
    out = out.split(`{{${key}}}`).join(safe);
  }
  const leftover = out.match(/\{\{[a-zA-Z0-9]+\}\}/);
  if (leftover) throw new Error(`Unfilled placeholder ${leftover[0]}`);
  return out;
}

function buildPage(code) {
  const strings = copy[code];
  const pageSeo = seo[code];
  if (!strings) throw new Error(`Missing copy for ${code}`);
  if (!pageSeo?.metaTitle || !pageSeo?.metaDescription || !pageSeo?.keywords || !pageSeo?.ogLocale) {
    throw new Error(`Missing SEO for ${code}`);
  }
  for (const key of englishKeys) {
    if (typeof strings[key] !== 'string' || !strings[key]) {
      throw new Error(`Missing ${code}.${key}`);
    }
  }
  const isEnglish = code === 'en';
  const cfg = isEnglish ? null : LOCALE_CONFIG[code];
  const pagePath = isEnglish ? '/' : `/${cfg.dir}/`;
  const pageUrl = `${BASE_URL}${pagePath === '/' ? '/' : pagePath}`;
  const featureList = [1, 2, 3, 4, 5, 6].map((n) => strings[`f${n}Title`]);
  const values = {
    ...strings,
    htmlLang: isEnglish ? 'en' : cfg.htmlLang,
    htmlDirAttr: !isEnglish && cfg.htmlDir ? ` dir="${cfg.htmlDir}"` : '',
    metaTitle: pageSeo.metaTitle,
    metaDescription: pageSeo.metaDescription,
    keywords: pageSeo.keywords,
    pageUrl,
    ogLocale: pageSeo.ogLocale,
    ogLocaleAlternates: ogLocaleAlternates(code),
    storeUrl: appStoreUrl(isEnglish ? '' : cfg.country),
    schemaName: JSON.stringify(APP_NAME),
    featureList: JSON.stringify(featureList),
    hreflang: hreflangBlock(),
    localeRedirect: isEnglish ? localeRedirectScript() : '',
    langSwitcher: langSwitcher(code, strings.langLabel),
    langScript: langSwitcherScript(),
    extraFonts: extraFonts(code),
  };
  let html = fill(template, values);
  if (!isEnglish) {
    html = html.replace(/href="assets\//g, 'href="../assets/');
    html = html.replace(/src="assets\//g, 'src="../assets/');
  }
  return html;
}

for (const code of ['en', ...LOCALES]) {
  const html = buildPage(code);
  const outPath = code === 'en'
    ? path.join(ROOT, 'index.html')
    : path.join(ROOT, LOCALE_CONFIG[code].dir, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`Built ${code === 'en' ? 'index.html' : `${LOCALE_CONFIG[code].dir}/index.html`}`);
}

const today = new Date().toISOString().slice(0, 10);
const alternates = ALL_LOCALES.map(({ hreflang, path: p }) => {
  const href = `${BASE_URL}${p === '/' ? '/' : p}`;
  return `        <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
}).concat(`        <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`).join('\n');
const urls = ALL_LOCALES.map(({ path: p }) => `    <url>
        <loc>${BASE_URL}${p === '/' ? '/' : p}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${p === '/' ? '1.0' : '0.9'}</priority>
${alternates}
    </url>`);
fs.writeFileSync(
  path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
);
fs.writeFileSync(
  path.join(ROOT, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`,
);
console.log('Updated sitemap.xml and robots.txt');
