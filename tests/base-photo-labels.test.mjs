import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/base-photo';

test('renders project hotspot labels at the Interactive Study size with a white outline and hover zoom', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.doesNotMatch(html, /--font-hand/);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.ok(stylesheetPaths.length > 0);

  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');

  assert.match(css, /\.base-hotspot-title\s*\{[^}]*font-family:\s*var\(--font-inter\)/);
  assert.match(css, /\.base-hotspot-title\s*\{[^}]*font-size:\s*clamp\(12px,1\.5vw,23px\)/);
  assert.match(css, /\.base-hotspot-title\s*\{[^}]*color:\s*transparent/);
  assert.match(css, /\.base-hotspot-title\s*\{[^}]*-webkit-text-stroke:\s*[^;]*#fff/);
  assert.match(css, /@keyframes hotspot-title-in\s*\{[^}]*\}[^}]*scale\(1\.12\)/);
});
