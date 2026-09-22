import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/base-photo';

async function loadPageCss() {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.ok(stylesheetPaths.length > 0);

  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');

  return { html, css };
}

test('renders uppercase black project labels without outlines and keeps You / Me / We / It white', async () => {
  const { html, css } = await loadPageCss();
  assert.doesNotMatch(html, /--font-hand/);

  assert.match(css, /\.base-hotspot-title\s*\{[^}]*font-family:\s*var\(--font-inter\)/);
  assert.match(css, /\.base-hotspot-title\s*\{[^}]*font-size:\s*clamp\(12px,1\.5vw,23px\)/);
  const hotspotRule = css.match(/\.base-hotspot-title\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.match(hotspotRule, /color:\s*#000/);
  assert.match(hotspotRule, /font-weight:\s*300/);
  assert.match(hotspotRule, /text-transform:\s*uppercase/);
  assert.doesNotMatch(hotspotRule, /text-stroke/);
  assert.match(css, /\.base-hotspot-title--you-me-we-it\s*\{[^}]*color:\s*#fff/);
  assert.match(css, /@keyframes hotspot-title-in\s*\{[^}]*\}[^}]*scale\(1\.12\)/);
});

test('keeps the top and revealed Interactive Study images registered during hotspot hover', async () => {
  const { css } = await loadPageCss();
  const baseRule = css.match(/\.base-photo-layer\s*\{([^}]*interaction-base\.jpg[^}]*)\}/)?.[1] ?? '';
  const topRule = css.match(/\.base-white-veil::before\s*\{([^}]*interaction-top\.jpg[^}]*)\}/)?.[1] ?? '';
  const activeRule = css.match(/\.base-experience\.is-hotspot-active \.base-photo-layer\s*\{([^}]*filter:[^}]*)\}/)?.[1] ?? '';

  assert.match(baseRule, /inset:\s*0/);
  assert.match(baseRule, /background:\s*url\('\/interaction-base\.jpg'\) center\/cover no-repeat/);
  assert.match(topRule, /inset:\s*0/);
  assert.match(topRule, /background:\s*#fff url\('\/interaction-top\.jpg'\) center\/cover no-repeat/);
  assert.doesNotMatch(baseRule, /transform:\s*scale/);
  assert.doesNotMatch(activeRule, /transform:\s*scale/);
  assert.match(activeRule, /filter:\s*contrast\(1\.16\) brightness\(1\.04\)/);
});
