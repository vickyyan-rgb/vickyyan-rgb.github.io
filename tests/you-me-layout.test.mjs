import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/';

test('presents the PDF-inspired case-study story before the prototype chapter', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const storyBeats = [
    'Scope',
    'Technology pervades our lives, but when does it intercept us on a real social level?',
    'Relevance',
    'A Problem: social hub shut down',
    'Reveal something that is felt but not seen.',
    'Design Logic',
    'From placing to feeling',
    'Turning temperature into a reliable interaction.',
  ];

  const positions = storyBeats.map((beat) => html.indexOf(beat));
  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing story beat: ${storyBeats[index]}`);
  });

  for (let index = 1; index < positions.length; index += 1) {
    assert.ok(
      positions[index - 1] < positions[index],
      `${storyBeats[index]} should follow ${storyBeats[index - 1]}`,
    );
  }
});

test('uses pure-black surfaces, scroll-reactive chapter headings, and still images', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<h3 class="case-study-scroll-heading">Scope<\/h3>/);
  assert.match(html, /<h4 class="case-study-scroll-heading">Design Logic<\/h4>/);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.ok(stylesheetPaths.length > 0, 'expected the rendered page to load a stylesheet');

  const stylesheets = await Promise.all(
    stylesheetPaths.map(async (path) => {
      const stylesheetResponse = await fetch(new URL(path, siteUrl));
      assert.equal(stylesheetResponse.status, 200);
      return stylesheetResponse.text();
    }),
  );
  const css = stylesheets.join('\n');

  assert.match(css, /\.case-study-scope[^}]*background:\s*#000/);
  assert.match(css, /\.case-study-scroll-heading[^}]*animation-timeline:\s*view\(\)/);
  assert.match(css, /\.you-me-case-study figure:hover img[^}]*transform:\s*none/);
});
