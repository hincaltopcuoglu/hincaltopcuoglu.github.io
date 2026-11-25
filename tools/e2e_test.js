/**
 * End-to-end checks for the rebuilt site.
 *
 * Serves the built output and drives it with a real browser to verify
 * the interactive features actually work:
 *   - dark mode toggle + persistence
 *   - blog topic filter (click + URL state + restore)
 *   - blog title filter
 *   - search modal ("/" shortcut, fuzzy match, empty state, Escape)
 *   - animated counters
 *   - scroll reveal
 *   - copy-to-clipboard buttons on code blocks
 *   - reading progress bar
 *   - table of contents
 *
 * Usage: node tools/e2e_test.js <build-dir> [base-url]
 */

const { chromium } = require('/tmp/node_modules/playwright-core');

const BUILD = process.argv[2] || '/tmp/site_build';
const BASE = process.argv[3] || 'http://127.0.0.1:8765';

const results = [];
function check(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push('PAGEERROR: ' + e.message));

  // ---------------- Home page ----------------
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  // Scroll through the whole page first: counters and reveals animate on
  // entry into the viewport. CSS smooth scrolling would make scrollTo
  // lag behind, so step with instant behaviour.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(1200);

  const counters = await page.$$eval('[data-count-to]', (els) =>
    els.map((e) => ({ to: e.getAttribute('data-count-to'), shown: e.textContent.trim() }))
  );
  const countersOk = counters.every((c) => {
    const expected = parseFloat(c.to);
    const actual = parseFloat(c.shown.replace(/[^0-9.]/g, ''));
    return Math.abs(expected - actual) < 0.02;
  });
  check('home: counters animate to final values', countersOk,
    counters.map((c) => `${c.shown}/${c.to}`).join(' '));

  const revealed = await page.$$eval('[data-reveal]', (els) =>
    els.filter((e) => e.classList.contains('revealed')).length
  );
  const revealTotal = await page.$$eval('[data-reveal]', (els) => els.length);
  check('home: scroll-reveal applied', revealed === revealTotal,
    `${revealed}/${revealTotal} revealed`);

  // Dark mode
  const themeBefore = await page.getAttribute('html', 'data-theme');
  await page.click('#theme-toggle');
  await page.waitForTimeout(400);
  const themeAfter = await page.getAttribute('html', 'data-theme');
  const stored = await page.evaluate(() => localStorage.getItem('ht_theme'));
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check('theme: toggle switches theme', themeBefore !== themeAfter, `${themeBefore} -> ${themeAfter}`);
  check('theme: persisted to localStorage', stored === themeAfter, `stored=${stored}`);
  check('theme: dark background applied', darkBg !== 'rgb(255, 255, 255)', darkBg);

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const themeAfterReload = await page.getAttribute('html', 'data-theme');
  check('theme: survives reload', themeAfterReload === themeAfter, themeAfterReload);
  await page.click('#theme-toggle');
  await page.waitForTimeout(300);

  // Search modal
  await page.keyboard.press('/');
  await page.waitForTimeout(400);
  const modalOpen = await page.isVisible('#search-modal');
  check('search: "/" opens the modal', modalOpen);

  await page.fill('#search-input', 'entropy');
  await page.waitForTimeout(400);
  const entropyHits = await page.$$eval('.search-result-title', (els) => els.map((e) => e.textContent.trim()));
  check('search: finds posts by title', entropyHits.length >= 3,
    `${entropyHits.length} hits: ${entropyHits.slice(0, 3).join(' | ')}`);

  await page.fill('#search-input', 'jackknife');
  await page.waitForTimeout(400);
  const fuzzyHits = await page.$$eval('.search-result-title', (els) => els.map((e) => e.textContent.trim()));
  check('search: fuzzy match works', fuzzyHits.length >= 1, fuzzyHits.join(' | '));

  await page.fill('#search-input', 'zzzqqqxyz');
  await page.waitForTimeout(400);
  const emptyShown = await page.isVisible('#search-empty');
  check('search: empty state shown', emptyShown);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  const modalClosed = !(await page.isVisible('#search-modal'));
  check('search: Escape closes the modal', modalClosed);

  await page.keyboard.press('/');
  await page.waitForTimeout(300);
  await page.fill('#search-input', 'entropy');
  await page.waitForTimeout(350);
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(200);
  const activeResult = await page.$$eval('.search-result.active', (els) => els.length);
  check('search: arrow key selects a result', activeResult === 1);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);

  // ---------------- Blog page ----------------
  await page.goto(`${BASE}/blog/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const totalCards = await page.$$eval('[data-post-card]', (els) => els.length);
  check('blog: all posts listed', totalCards === 30, `${totalCards} cards`);

  const allVisible = await page.$$eval('[data-post-card]', (els) => els.filter((e) => !e.hidden).length);
  check('blog: all posts visible by default', allVisible === 30, `${allVisible} visible`);

  const paperCards = await page.$$eval('.post-card-paper', (els) => els.length);
  check('blog: PDF papers listed', paperCards === 5, `${paperCards} papers`);

  const clicked = await page.evaluate(() => {
    const b = [...document.querySelectorAll('.filter-pills button')]
      .find((x) => x.getAttribute('data-filter') === 'Statistics');
    if (!b) return false;
    b.click();
    return true;
  });
  await page.waitForTimeout(500);
  const statsVisible = await page.$$eval('[data-post-card]', (els) => els.filter((e) => !e.hidden).length);
  const statsCats = await page.$$eval('[data-post-card]:not([hidden])', (els) =>
    [...new Set(els.map((e) => e.getAttribute('data-categories')))]);
  check('blog: topic filter narrows the list',
    clicked && statsVisible === 9 && statsCats.length === 1,
    `${statsVisible} visible, cats=${statsCats.join(',')}`);

  const statusText = (await page.textContent('#filter-status')).replace(/\s+/g, ' ').trim();
  check('blog: status line updates', /Showing 9 of 30/.test(statusText), statusText);

  const urlAfter = page.url();
  check('blog: filter writes to the URL', urlAfter.includes('topic=Statistics'), urlAfter);

  const activePill = await page.$$eval('.filter-pills button.active',
    (els) => els.map((e) => e.getAttribute('data-filter')));
  check('blog: correct pill marked active',
    activePill.length === 1 && activePill[0] === 'Statistics', activePill.join(','));

  await page.fill('#post-filter-input', 'poisson');
  await page.waitForTimeout(400);
  const titleFiltered = await page.$$eval('[data-post-card]', (els) => els.filter((e) => !e.hidden).length);
  check('blog: title filter works', titleFiltered === 1, `${titleFiltered} visible`);

  await page.fill('#post-filter-input', '');
  await page.waitForTimeout(300);

  await page.goto(`${BASE}/blog/?topic=Information%20Theory`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const restoredVisible = await page.$$eval('[data-post-card]', (els) => els.filter((e) => !e.hidden).length);
  const restoredPill = await page.$$eval('.filter-pills button.active',
    (els) => els.map((e) => e.getAttribute('data-filter')));
  // Information Theory now includes 3 of the PDF papers: 7 articles + 3 papers.
  check('blog: filter restored from URL',
    restoredVisible === 10 && restoredPill[0] === 'Information Theory',
    `${restoredVisible} visible, pill=${restoredPill.join(',')}`);

  // ---------------- Post page ----------------
  await page.goto(`${BASE}/blog/beyond-dashboards-behavioral-predictive-modeling.html`,
    { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const hasToc = await page.$$eval('#toc a', (els) => els.length);
  check('post: table of contents built', hasToc > 0, `${hasToc} entries`);

  // Copy buttons exist on the raw RStudio export posts too.
  await page.goto(`${BASE}/blog/beta_distribution.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const copyBtns = await page.$$eval('.copy-btn', (els) => els.length);
  check('post: copy buttons injected into code blocks', copyBtns > 0, `${copyBtns} buttons`);

  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(600);
  const progress = await page.$eval('#reading-progress', (el) => el.style.width);
  check('post: reading progress bar advances', parseFloat(progress) > 0, progress);

  const backToTopVisible = await page.$eval('#back-to-top', (el) =>
    el.classList.contains('visible'));
  check('post: back-to-top appears on scroll', backToTopVisible);

  const ga = await page.content();
  check('post: GA4 tag present', ga.includes('G-8H2BWG1389'));

  // ---------------- 404 page ----------------
  await page.goto(`${BASE}/404.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const errTitle = await page.textContent('.error-title');
  check('404: page renders', /doesn't exist/i.test(errTitle), errTitle.trim());

  // ---------------- Console cleanliness ----------------
  const realErrors = consoleErrors.filter((e) =>
    !/google-analytics|googletagmanager|ERR_ABORTED|net::|Failed to load resource/i.test(e));
  check('no JavaScript errors', realErrors.length === 0,
    realErrors.slice(0, 3).join(' | ') || 'clean');

  await browser.close();

  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) {
    console.log('\nFAILED:');
    failed.forEach((f) => console.log(`  - ${f.name} ${f.detail || ''}`));
    process.exit(1);
  }
})().catch((e) => {
  console.error('HARNESS ERROR:', e);
  process.exit(2);
});
