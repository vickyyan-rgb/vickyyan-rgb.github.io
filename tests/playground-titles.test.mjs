import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/playground';

let pagePromise;

async function loadPlayground() {
  pagePromise ??= fetch(siteUrl).then(async (response) => {
    assert.equal(response.status, 200);
    return response.text();
  });
  return pagePromise;
}

test('shows the approved Playground project titles without filename or author suffixes', async () => {
  const html = await loadPlayground();
  const titles = [...html.matchAll(/<h2>([^<]*)<\/h2>/g)].map((match) => match[1]);

  assert.deepEqual(titles, ['Traces of home', 'Future Time-Giant Wheel', 'Troitsky Bridge']);
  assert.doesNotMatch(titles.join('\n'), /\.mov|Vicky Yan/i);
});

test('shows thumbnail triggers instead of loading the full media in the overview', async () => {
  const html = await loadPlayground();

  const triggers = [...html.matchAll(/aria-label="Open ([^"]+) project"/g)]
    .map((match) => match[1]);

  assert.deepEqual(triggers, ['Traces of home', 'Future Time-Giant Wheel', 'Troitsky Bridge']);
  assert.doesNotMatch(html, /<video/);

  const media = [...html.matchAll(/data-detail-media="([^"]+)"/g)]
    .map((match) => match[1]);

  assert.deepEqual(media, [
    '/playground/traces-of-home-final-3.mp4',
    '/playground/future-time-giant-wheel-vicky-yan.mp4',
    '/playground/troitsky-bridge-thumbnail.jpg',
  ]);
});

test('uses the three supplied thumbnail images in the approved order', async () => {
  const html = await loadPlayground();

  assert.match(html, />01 \/ 03</);
  assert.match(html, />02 \/ 03</);
  assert.match(html, />03 \/ 03</);

  const thumbnails = [
    '/playground/traces-of-home-thumbnail.png',
    '/playground/future-time-giant-wheel-thumbnail.png',
    '/playground/troitsky-bridge-thumbnail.jpg',
  ];

  for (const thumbnail of thumbnails) {
    assert.match(html, new RegExp(thumbnail.split('/').at(-1).replace('.', '\\.')));
    const imageResponse = await fetch(new URL(thumbnail, siteUrl));
    assert.equal(imageResponse.status, 200);
  }
});
