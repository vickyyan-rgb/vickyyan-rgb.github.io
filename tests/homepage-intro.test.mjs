import assert from 'node:assert/strict';
import test from 'node:test';

const homeUrl = process.env.HOME_TEST_URL ?? 'http://localhost:3000/';

test('describes the practice across physical, digital, and research work', async () => {
  const response = await fetch(homeUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /My practice moves fluidly between physical prototyping, digital product design, and human-centered research, using AI and emerging technologies to create more intuitive relationships between people, products, and space\./,
  );
  assert.doesNotMatch(html, /I(?:&#x27;|')m a multidisciplinary designer exploring/);
});

test('presents Product Designer and Human-AI Interaction on separate lines', async () => {
  const response = await fetch(homeUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<h1>Product Designer \/<br\s*\/>Human-AI Interaction<\/h1>/,
  );
  assert.doesNotMatch(html, /Product · Interaction · Experience/);
});
