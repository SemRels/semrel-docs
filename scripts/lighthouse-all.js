#!/usr/bin/env node
/**
 * lighthouse-all.js
 *
 * Runs Lighthouse on every page in the built semrel-docs site and produces:
 *   - lighthouse-reports/<slug>.json   — raw Lighthouse JSON per page
 *   - lighthouse-reports/summary.html  — sortable HTML table of all scores
 *   - lighthouse-reports/summary.json  — machine-readable summary
 *
 * Usage:
 *   node scripts/lighthouse-all.js [--port 4321] [--build] [--categories perf,a11y,seo,bp]
 *
 * The script expects `astro preview` to already be running, OR pass --build to
 * run `astro build` + `astro preview` automatically.
 *
 * Examples:
 *   node scripts/lighthouse-all.js --build
 *   node scripts/lighthouse-all.js --port 4321
 *   node scripts/lighthouse-all.js --build --categories perf,seo
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const DIST      = path.join(ROOT, 'dist');
const REPORTS   = path.join(ROOT, 'lighthouse-reports');

// ── CLI args ──────────────────────────────────────────────────────────────────
const { values: args } = parseArgs({
  options: {
    port:       { type: 'string',  default: '4321' },
    build:      { type: 'boolean', default: false },
    categories: { type: 'string',  default: 'performance,accessibility,best-practices,seo' },
    output:     { type: 'string',  default: 'html,json' },
    throttle:   { type: 'boolean', default: false }, // false = no throttling (localhost perf)
    concurrency:{ type: 'string',  default: '1' },   // Lighthouse is CPU-heavy — keep at 1
    'max-pages':{ type: 'string',  default: '0' },   // 0 = all pages
    help:       { type: 'boolean', default: false },
  },
  strict: false,
});

if (args.help) {
  console.log(`
Usage: node scripts/lighthouse-all.js [options]

  --build             Run astro build + astro preview before auditing
  --port <n>          Preview server port (default: 4321)
  --categories <csv>  Comma-separated categories to include
                      (default: performance,accessibility,best-practices,seo)
  --throttle          Apply Lighthouse mobile throttling (default: off for localhost)
  --max-pages <n>     Only audit first N pages (0 = all, default: 0)
  --help              Show this help
`);
  process.exit(0);
}

const PORT       = parseInt(args.port, 10);
const BASE_URL   = `http://localhost:${PORT}`;
const CATEGORIES = args.categories.split(',').map(s => s.trim());
const MAX_PAGES  = parseInt(args['max-pages'], 10);

// ── Helpers ───────────────────────────────────────────────────────────────────
function log(msg)  { process.stdout.write(`${msg}\n`); }
function info(msg) { log(`  ℹ  ${msg}`); }
function ok(msg)   { log(`  ✓  ${msg}`); }
function warn(msg) { log(`  ⚠  ${msg}`); }
function fail(msg) { log(`  ✗  ${msg}`); }

function slugify(url) {
  return url
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/\//g, '__') || 'index';
}

// ── Collect pages from dist/sitemap-*.xml ─────────────────────────────────────
function getPagesFromSitemap() {
  const sitemapIndex = path.join(DIST, 'sitemap-index.xml');
  if (!fs.existsSync(sitemapIndex)) {
    throw new Error(`sitemap-index.xml not found at ${sitemapIndex}. Run "npm run build" first.`);
  }

  const urls = new Set();

  // Read index to find child sitemaps
  const indexXml = fs.readFileSync(sitemapIndex, 'utf8');
  const childSitemaps = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

  for (const sitemapUrl of childSitemaps) {
    // Convert absolute URL to local file
    const filename = path.basename(sitemapUrl);
    const sitemapFile = path.join(DIST, filename);
    if (!fs.existsSync(sitemapFile)) {
      warn(`Sitemap file not found: ${sitemapFile}`);
      continue;
    }
    const xml = fs.readFileSync(sitemapFile, 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      urls.add(m[1]);
    }
  }

  return [...urls].sort();
}

// ── Convert production URLs → localhost URLs ───────────────────────────────────
function toLocalUrl(prodUrl) {
  return prodUrl.replace(/^https?:\/\/[^/]+/, BASE_URL);
}

// ── Wait for server ────────────────────────────────────────────────────────────
async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch { /* not ready yet */ }
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not respond within ${timeoutMs}ms`);
}

// ── Run a single Lighthouse audit ─────────────────────────────────────────────
async function runLighthouse(url, chrome) {
  const lhConfig = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: CATEGORIES,
      formFactor: args.throttle ? 'mobile' : 'desktop',
      throttlingMethod: args.throttle ? 'simulate' : 'provided',
      ...(args.throttle ? {} : {
        throttling: {
          rttMs: 0, throughputKbps: 0, cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0,
        },
        screenEmulation: { disabled: true },
      }),
    },
  };

  const result = await lighthouse(url, {
    port: chrome.port,
    output: ['json', 'html'],
    logLevel: 'error',
  }, lhConfig);

  return result;
}

// ── Score → colour ─────────────────────────────────────────────────────────────
function scoreClass(score) {
  if (score === null) return 'na';
  if (score >= 90) return 'good';
  if (score >= 50) return 'needs';
  return 'poor';
}

function scoreCell(score) {
  if (score === null) return `<td class="na">N/A</td>`;
  const cls = scoreClass(score);
  return `<td class="${cls}">${score}</td>`;
}

// ── Generate summary HTML ──────────────────────────────────────────────────────
function buildSummaryHtml(rows) {
  const tableRows = rows.map(r => {
    const slug = slugify(r.url);
    const reportLink = `<a href="${slug}.html" target="_blank">${r.path}</a>`;
    return `<tr>
      <td class="url">${reportLink}</td>
      ${scoreCell(r.performance)}
      ${scoreCell(r.accessibility)}
      ${scoreCell(r['best-practices'])}
      ${scoreCell(r.seo)}
      <td>${r.fcp}</td>
      <td>${r.lcp}</td>
      <td>${r.tbt}</td>
      <td>${r.cls}</td>
      <td class="issues">${r.issues.map(i => `<span class="issue">${i}</span>`).join('')}</td>
    </tr>`;
  }).join('\n');

  const avg = (key) => {
    const vals = rows.map(r => r[key]).filter(v => v !== null);
    if (!vals.length) return 'N/A';
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const totalPages = rows.length;
  const perfect100 = ['performance','accessibility','best-practices','seo'].map(c => {
    const n = rows.filter(r => r[c] === 100).length;
    return `${c}: ${n}/${totalPages} pages at 100`;
  }).join(' · ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>semrel-docs — Lighthouse Report Summary</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; font-size: 14px;
           background: #0f0f13; color: #e0e0e0; padding: 2rem; }
    h1  { font-size: 1.5rem; margin-bottom: .5rem; color: #fff; }
    .meta { color: #888; margin-bottom: 1.5rem; font-size: .85rem; }
    .avg-row { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    .avg-card { background: #1a1a24; border: 1px solid #333; border-radius: 8px;
                padding: .75rem 1.25rem; text-align: center; }
    .avg-card .label { font-size: .75rem; color: #888; text-transform: uppercase; letter-spacing: .05em; }
    .avg-card .value { font-size: 2rem; font-weight: 700; }
    .avg-card.good .value  { color: #4ade80; }
    .avg-card.needs .value { color: #fbbf24; }
    .avg-card.poor .value  { color: #f87171; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #222; }
    th { background: #1a1a24; color: #aaa; font-size: .75rem; text-transform: uppercase;
         letter-spacing: .05em; cursor: pointer; user-select: none; }
    th:hover { color: #fff; }
    tr:hover td { background: rgba(255,255,255,.03); }
    td.good   { color: #4ade80; font-weight: 600; }
    td.needs  { color: #fbbf24; font-weight: 600; }
    td.poor   { color: #f87171; font-weight: 600; }
    td.na     { color: #555; }
    td.url a  { color: #818cf8; text-decoration: none; }
    td.url a:hover { text-decoration: underline; }
    td.issues { max-width: 300px; }
    .issue { display: inline-block; background: rgba(248,113,113,.15); color: #f87171;
             border: 1px solid rgba(248,113,113,.3); border-radius: 4px;
             padding: 1px 6px; font-size: .7rem; margin: 1px; }
    .perfect { color: #888; font-size: .8rem; margin-bottom: 1rem; }
    input[type=text] { background: #1a1a24; border: 1px solid #333; color: #e0e0e0;
                       padding: 6px 12px; border-radius: 6px; margin-bottom: 1rem;
                       font-size: .9rem; width: 300px; }
    input[type=text]:focus { outline: none; border-color: #818cf8; }
  </style>
</head>
<body>
  <h1>🔦 semrel-docs — Lighthouse Summary</h1>
  <p class="meta">Generated: ${new Date().toLocaleString()} · ${totalPages} pages audited</p>

  <div class="avg-row">
    ${['performance','accessibility','best-practices','seo'].map(c => {
      const a = avg(c);
      const cls = typeof a === 'number' ? scoreClass(a) : 'na';
      return `<div class="avg-card ${cls}">
        <div class="label">${c}</div>
        <div class="value">${a}</div>
      </div>`;
    }).join('')}
  </div>

  <p class="perfect">${perfect100}</p>

  <input type="text" id="filter" placeholder="Filter by URL…" oninput="filterRows(this.value)">

  <table id="table">
    <thead>
      <tr>
        <th onclick="sortBy('url')">Page</th>
        <th onclick="sortBy('performance')">Perf</th>
        <th onclick="sortBy('accessibility')">A11y</th>
        <th onclick="sortBy('best-practices')">BP</th>
        <th onclick="sortBy('seo')">SEO</th>
        <th>FCP</th>
        <th>LCP</th>
        <th>TBT</th>
        <th>CLS</th>
        <th>Issues</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>

  <script>
    const rows = ${JSON.stringify(rows)};
    let sortKey = '', sortDir = 1;

    function filterRows(q) {
      const lq = q.toLowerCase();
      document.querySelectorAll('#table tbody tr').forEach(tr => {
        tr.style.display = tr.cells[0].textContent.toLowerCase().includes(lq) ? '' : 'none';
      });
    }

    function sortBy(key) {
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = 1; }
      const tbody = document.querySelector('#table tbody');
      const trs = [...tbody.querySelectorAll('tr')];
      trs.sort((a, b) => {
        const ri = rows.find(r => r.path === a.cells[0].textContent.trim());
        const rj = rows.find(r => r.path === b.cells[0].textContent.trim());
        const vi = ri?.[key] ?? -1;
        const vj = rj?.[key] ?? -1;
        if (vi < vj) return -sortDir;
        if (vi > vj) return sortDir;
        return 0;
      });
      trs.forEach(tr => tbody.appendChild(tr));
    }
  </script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Optionally build
  let previewProc = null;
  if (args.build) {
    info('Building site…');
    execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
    ok('Build complete');
    info('Starting preview server…');
    previewProc = spawn('node', ['node_modules/.bin/astro', 'preview', '--port', String(PORT)], {
      cwd: ROOT, stdio: 'ignore', detached: false,
    });
    await waitForServer(BASE_URL);
    ok(`Preview running at ${BASE_URL}`);
  } else {
    info(`Assuming server running at ${BASE_URL}`);
    await waitForServer(BASE_URL, 5000).catch(() => {
      warn(`Server not responding at ${BASE_URL} — start with: npm run preview`);
      process.exit(1);
    });
  }

  // 2. Collect pages
  const prodUrls = getPagesFromSitemap();
  const pages = prodUrls.map(u => toLocalUrl(u));

  const limited = MAX_PAGES > 0 ? pages.slice(0, MAX_PAGES) : pages;
  log(`\n📄 Auditing ${limited.length} pages (${prodUrls.length} total)…\n`);

  // 3. Prepare output dir
  fs.rmSync(REPORTS, { recursive: true, force: true });
  fs.mkdirSync(REPORTS, { recursive: true });

  // 4. Launch Chrome once
  // In WSL, chrome-launcher picks up Windows Chrome which can't be reached from Linux.
  // Detect WSL and prefer the Linux system Chrome binary.
  const isWsl = fs.existsSync('/proc/version') &&
    fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft');
  const linuxChrome = ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
                       '/usr/bin/chromium', '/usr/bin/chromium-browser']
    .find(p => fs.existsSync(p));
  const chromePath = process.env.CHROME_PATH ??
    (isWsl && linuxChrome ? linuxChrome : undefined);

  if (chromePath) info(`Using Chrome: ${chromePath}`);

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
    ],
    connectionPollInterval: 500,
    maxConnectionRetries: 20,
  });
  info(`Chrome launched on port ${chrome.port}`);

  // 5. Audit pages
  const summary = [];
  let done = 0;

  for (const url of limited) {
    done++;
    const slug = slugify(url);
    process.stdout.write(`  [${done}/${limited.length}] ${url} … `);

    try {
      const result = await runLighthouse(url, chrome);
      const { lhr, report } = result;

      // Save JSON
      fs.writeFileSync(path.join(REPORTS, `${slug}.json`), report[0]);
      // Save HTML
      fs.writeFileSync(path.join(REPORTS, `${slug}.html`), report[1]);

      const cats = lhr.categories;
      const s = (key) => cats[key] ? Math.round(cats[key].score * 100) : null;
      const m = (key) => lhr.audits[key]?.displayValue ?? '—';

      // Collect failing audits as issues
      const issues = [];
      for (const [id, audit] of Object.entries(lhr.audits)) {
        const sc = audit.score;
        const mode = audit.scoreDisplayMode;
        if (mode === 'binary' && sc === 0) issues.push(audit.title);
        else if (mode === 'numeric' && sc !== null && sc < 0.5) issues.push(audit.title);
      }

      const row = {
        url,
        path: url.replace(BASE_URL, '') || '/',
        performance:    s('performance'),
        accessibility:  s('accessibility'),
        'best-practices': s('best-practices'),
        seo:            s('seo'),
        fcp: m('first-contentful-paint'),
        lcp: m('largest-contentful-paint'),
        tbt: m('total-blocking-time'),
        cls: m('cumulative-layout-shift'),
        issues,
      };

      summary.push(row);

      const p = row.performance;
      const a = row.accessibility;
      const b = row['best-practices'];
      const seo = row.seo;
      const label = [p, a, b, seo].every(v => v !== null && v >= 90) ? '✓' : '⚠';
      process.stdout.write(`${label} Perf=${p} A11y=${a} BP=${b} SEO=${seo}\n`);
    } catch (err) {
      process.stdout.write(`✗ ERROR: ${err.message}\n`);
      summary.push({
        url, path: url.replace(BASE_URL, '') || '/',
        performance: null, accessibility: null, 'best-practices': null, seo: null,
        fcp: '—', lcp: '—', tbt: '—', cls: '—',
        issues: [`ERROR: ${err.message}`],
      });
    }
  }

  // 6. Kill Chrome
  await chrome.kill();

  // 7. Save summary files
  fs.writeFileSync(path.join(REPORTS, 'summary.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(REPORTS, 'summary.html'), buildSummaryHtml(summary));

  // 8. Print totals
  const counts = { good: 0, needs: 0, poor: 0 };
  for (const r of summary) {
    const scores = ['performance','accessibility','best-practices','seo']
      .map(k => r[k]).filter(v => v !== null);
    const min = Math.min(...scores);
    if (min >= 90) counts.good++;
    else if (min >= 50) counts.needs++;
    else counts.poor++;
  }

  log(`\n${'─'.repeat(60)}`);
  log(`📊 Summary: ${summary.length} pages audited`);
  log(`   ✅ All scores ≥90: ${counts.good}`);
  log(`   🟡 Needs improvement: ${counts.needs}`);
  log(`   🔴 Poor (any score <50): ${counts.poor}`);
  log(`\n📁 Reports saved to: ${REPORTS}`);
  log(`   → Open: ${path.join(REPORTS, 'summary.html')}`);

  if (previewProc) {
    previewProc.kill();
  }

  // Exit with error if any page is poor
  process.exit(counts.poor > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(2);
});
