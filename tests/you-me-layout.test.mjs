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
    'A Problem: Social hub shut down',
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

test('presents the revised drawings, hover-reveal journey, and reordered motion studies', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const expectedDrawings = [
    '/projects/you-me-case-study/scope-social-distance-v2.png',
    '/projects/you-me-case-study/scope-installation-sketch-v2.png',
    '/projects/you-me-case-study/process/design-logic-v2.png',
  ];

  for (const drawing of expectedDrawings) {
    assert.match(html, new RegExp(drawing.replaceAll('/', '\\/')));
    const drawingResponse = await fetch(new URL(drawing, siteUrl));
    assert.equal(drawingResponse.status, 200, `expected ${drawing} to load`);
  }

  assert.equal((html.match(/class="case-study-reveal-card"/g) ?? []).length, 4);
  assert.doesNotMatch(html, /Second draft/);

  const placingPosition = html.indexOf('From placing to feeling');
  const motionPosition = html.indexOf('You are a line, but which line?');
  const prototypePosition = html.indexOf('Turning temperature into a reliable interaction.');
  assert.ok(placingPosition < motionPosition, 'motion studies should follow the placing-to-feeling journey');
  assert.ok(motionPosition < prototypePosition, 'motion studies should precede the prototype chapter');
  assert.match(
    html,
    /Each circle breathes and distorts to the thermal rhythm of a participant(?:&#x27;|')s drink, directly translating temperature data into a fluid, visual form\./,
  );
  assert.doesNotMatch(html, /case-study-route-turn/);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const stylesheets = await Promise.all(
    stylesheetPaths.map(async (path) => {
      const stylesheetResponse = await fetch(new URL(path, siteUrl));
      assert.equal(stylesheetResponse.status, 200);
      return stylesheetResponse.text();
    }),
  );
  const css = stylesheets.join('\n');

  assert.match(css, /\.case-study-reveal-card:hover[^}]*figure img[^}]*transform:\s*scale\(1\.06\)/);
  assert.match(css, /\.case-study-reveal-card:hover[^}]*>div[^}]*opacity:\s*1/);
  assert.match(css, /\.case-study-problem-photo[^}]*width:\s*min\(47%,708px\)/);
  assert.match(css, /\.case-study-problem\s*\{[^}]*padding-top:\s*clamp\(140px,18vw,280px\)/);
  assert.match(css, /\.case-study-manifesto\s*\{[^}]*padding-top:\s*clamp\(120px,16vw,240px\)/);
  assert.match(css, /\.case-study-manifesto>h4\s*\{[^}]*text-align:\s*center/);
  assert.match(css, /\.case-study-manifesto>div\s*\{[^}]*grid-template-columns:\s*1fr[^}]*text-align:\s*center/);
  assert.doesNotMatch(css, /\.case-study-manifesto p:last-child\s*\{[^}]*font-size:/);
  assert.match(css, /\.case-study-scope-relevance[^}]*border:\s*0/);
  assert.match(css, /\.you-me-case-study \.case-study-logic-diagram img[^}]*filter:\s*none/);
});
