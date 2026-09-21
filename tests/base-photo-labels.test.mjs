import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/base-photo';

test('renders project hotspot labels with outlined handwriting and hover zoom', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /--font-hand/);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.ok(stylesheetPaths.length > 0);

  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');

  assert.match(css, /\.base-hotspot-title\s*\{[^}]*font-family:\s*var\(--font-hand\)/);
  assert.match(css, /\.base-hotspot-title\s*\{[^}]*-webkit-text-stroke:\s*[^;]*#fff/);
  assert.match(css, /@keyframes hotspot-title-in\s*\{[^}]*\}[^}]*scale\(1\.12\)/);
});
