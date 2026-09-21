import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/';

async function loadPage() {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);
  return response.text();
}

async function loadStyles(html) {
  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.ok(stylesheetPaths.length > 0);

  return (await Promise.all(stylesheetPaths.map(async (path) => {
    const response = await fetch(new URL(path, siteUrl));
    assert.equal(response.status, 200);
    return response.text();
  }))).join('\n');
}

test('opens Embodied Cognition with the second final photograph, narrative, and film', async () => {
  const html = await loadPage();
  const openingPosition = html.indexOf('/projects/embodied-case-study/final/opening-installation.jpg');
  const narrativePosition = html.indexOf('The installation aims to visually represent the levels of community engagement');
  const filmPosition = html.indexOf('embodied-cognition.mp4');

  assert.notEqual(openingPosition, -1);
  assert.notEqual(narrativePosition, -1);
  assert.notEqual(filmPosition, -1);
  assert.ok(openingPosition < narrativePosition);
  assert.ok(narrativePosition < filmPosition);
  assert.match(html, /<video[^>]+autoPlay=""[^>]+muted=""/);
});

test('presents the idea and interaction flow with both supplied diagrams', async () => {
  const html = await loadPage();
  const beats = [
    '<h3 class="embodied-scroll-heading">Scope</h3>',
    '/projects/embodied-case-study/interaction-storyboard.png',
    '<h4 class="embodied-scroll-heading">Design Logic</h4>',
    '/projects/embodied-case-study/logic-diagram.jpg',
    'From presence to a shared field',
    '<h3 class="embodied-scroll-heading">Process</h3>',
    '<h3 class="embodied-scroll-heading">Final</h3>',
  ];
  const positions = beats.map((beat) => html.indexOf(beat));

  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing Embodied Cognition story beat: ${beats[index]}`);
    if (index > 0) assert.ok(positions[index - 1] < position);
  });
  assert.equal((html.match(/class="embodied-reveal-card"/g) ?? []).length, 5);
});

test('includes every supplied process video and the remaining final photographs', async () => {
  const html = await loadPage();
  const media = [
    '/projects/embodied-case-study/process/hand-prototype.mp4',
    '/projects/embodied-case-study/process/tracking-test.mp4',
    '/projects/embodied-case-study/process/tracking-contribution.mp4',
    '/projects/embodied-case-study/process/body-tracking-collision.mp4',
    '/projects/embodied-case-study/process/body-tracking-boundary.mp4',
    '/projects/embodied-case-study/process/blob-pulse.mp4',
    '/projects/embodied-case-study/final/final-field.jpg',
    '/projects/embodied-case-study/final/audience-interaction.jpg',
    '/projects/embodied-case-study/final/blob-community.jpg',
  ];

  for (const asset of media) {
    assert.match(html, new RegExp(asset.replaceAll('/', '\\/')));
    const response = await fetch(new URL(asset, siteUrl));
    assert.equal(response.status, 200, `expected ${asset} to load`);
  }
});

test('uses the shared five-level Inter hierarchy, black canvas, scroll headings, and hover reveal cards', async () => {
  const html = await loadPage();
  const css = await loadStyles(html);

  assert.match(css, /#embodied-cognition\s*\{[^}]*--case-xl:/);
  assert.match(css, /\.embodied-case-study\s*\{[^}]*background:\s*#000/);
  assert.match(css, /\.embodied-case-study[^}]*font-family:\s*var\(--font-inter\)/);
  assert.match(css, /\.embodied-scroll-heading[^}]*animation-timeline:\s*view\(\)/);
  assert.match(css, /\.embodied-reveal-card:hover[^}]*figure img[^}]*transform:\s*scale\(1\.06\)/);
  assert.match(css, /\.embodied-reveal-card:hover[^}]*>div[^}]*opacity:\s*1/);

  const fontSizes = [...css.matchAll(/([^{}]*embodied[^{}]*)\{([^{}]*)\}/g)]
    .flatMap(([, , declarations]) => [...declarations.matchAll(/font-size:\s*([^;}]+)/g)])
    .map((match) => match[1].trim());
  const allowed = new Set([
    'var(--case-xl)',
    'var(--case-lg)',
    'var(--case-md)',
    'var(--case-sm)',
    'var(--case-xs)',
  ]);

  assert.ok(fontSizes.length > 0);
  for (const size of fontSizes) assert.ok(allowed.has(size), `unexpected Embodied Cognition font size: ${size}`);
});
