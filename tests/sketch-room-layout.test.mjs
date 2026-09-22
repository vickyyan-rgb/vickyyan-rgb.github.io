import assert from 'node:assert/strict';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/#sketch-a-home';
const narrativeOpening = 'Sketch-a-room aims to visually represent the levels of community engagement';

let pagePromise;

async function loadPage() {
  pagePromise ??= fetch(siteUrl).then(async (response) => {
    assert.equal(response.status, 200);
    return response.text();
  });
  return pagePromise;
}

function extractProject(html) {
  const project = html.match(/<details[^>]+id="sketch-a-home"[^>]*>([\s\S]*?)<\/details>/)?.[0];
  assert.ok(project, 'expected the Sketch-a-room project to render');
  return project;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test('opens Sketch-a-room on white with its supplied hero, narrative, and autoplay film', async () => {
  const html = await loadPage();
  const project = extractProject(html);
  const hero = '/projects/sketch-a-room/opening.jpg';
  const heroPosition = project.indexOf(hero);
  const narrativePosition = project.indexOf(narrativeOpening);
  const filmPosition = project.indexOf('sketch-a-home.mp4');

  assert.match(project, />Sketch-a-room</);
  assert.match(project, /class="[^"]*sketch-room-case-study[^"]*"/);
  assert.notEqual(heroPosition, -1, 'expected the supplied opening photograph');
  assert.notEqual(narrativePosition, -1, 'expected the approved opening narrative');
  assert.notEqual(filmPosition, -1, 'expected the existing Sketch-a-home film');
  assert.ok(heroPosition < narrativePosition && narrativePosition < filmPosition);

  const mainFilm = project.match(/<video[^>]*>[\s\S]*?sketch-a-home\.mp4[\s\S]*?<\/video>/)?.[0] ?? '';
  assert.match(mainFilm, /autoplay/i);
  assert.match(mainFilm, /muted/i);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const response = await fetch(new URL(path, siteUrl));
    assert.equal(response.status, 200);
    return response.text();
  }))).join('\n');
  assert.match(css, /\.sketch-room-case-study\s*\{[^}]*background:\s*#fff/);
});

test('presents the approved case-study chapters in narrative order', async () => {
  const project = extractProject(await loadPage());
  const beats = [
    narrativeOpening,
    'sketch-a-home.mp4',
    '>Site Context<',
    '>Design Logic<',
    '>Interaction Storyboard<',
    '>Prototypes<',
    '>Final<',
  ];
  const positions = beats.map((beat) => project.indexOf(beat));

  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing Sketch-a-room story beat: ${beats[index]}`);
    if (index > 0) assert.ok(positions[index - 1] < position, `${beats[index]} is out of order`);
  });
});

test('shows nine unique prototype clips once and ends with the three final images in order', async () => {
  const project = extractProject(await loadPage());
  const prototypeVideos = [
    '/projects/sketch-a-room/prototypes/proto-1.mp4',
    '/projects/sketch-a-room/prototypes/proto-2.mp4',
    '/projects/sketch-a-room/prototypes/proto-3.mp4',
    '/projects/sketch-a-room/prototypes/proto-4.mp4',
    '/projects/sketch-a-room/prototypes/proto-5.mp4',
    '/projects/sketch-a-room/prototypes/interaction-201305.mp4',
    '/projects/sketch-a-room/prototypes/interaction-201641.mp4',
    '/projects/sketch-a-room/prototypes/interaction-202853.mp4',
    '/projects/sketch-a-room/prototypes/interaction-231551.mp4',
  ];

  for (const video of prototypeVideos) {
    const occurrences = project.match(new RegExp(escapeRegex(video), 'g')) ?? [];
    assert.equal(occurrences.length, 1, `expected exactly one rendered copy of ${video}`);
  }

  const finalHeadingPosition = project.indexOf('>Final<');
  const finalImages = [
    '/projects/sketch-a-room/final-physical-1.jpg',
    '/projects/sketch-a-room/final-physical-2.jpg',
    '/projects/sketch-a-room/final-ai-room.png',
  ];
  const finalPositions = finalImages.map((image) => project.indexOf(image));
  finalPositions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing final image: ${finalImages[index]}`);
    assert.ok(finalHeadingPosition < position, `${finalImages[index]} should follow the Final heading`);
    if (index > 0) assert.ok(finalPositions[index - 1] < position, `${finalImages[index]} is out of order`);
  });
});

test('serves every local Sketch-a-room image and video', async () => {
  const project = extractProject(await loadPage());
  const localMedia = [...project.matchAll(/\bsrc="(\/projects\/sketch-a-room\/[^"]+)"/g)]
    .map((match) => match[1]);

  assert.ok(localMedia.length >= 16, 'expected the complete local Sketch-a-room media sequence');
  for (const asset of new Set(localMedia)) {
    const response = await fetch(new URL(asset, siteUrl));
    assert.equal(response.status, 200, `Sketch-a-room asset is not served: ${asset}`);
  }
});

test('places the gesture instructions before the Sketch-a-room installation outcomes', async () => {
  const project = extractProject(await loadPage());
  const finalHeadingPosition = project.indexOf('>Final<');
  const instructions = '/projects/sketch-a-room/interaction-instructions.jpg';
  const instructionsPosition = project.indexOf(instructions);
  const firstInstallationPosition = project.indexOf('/projects/sketch-a-room/final-physical-1.jpg');

  assert.notEqual(instructionsPosition, -1, 'expected the supplied gesture instructions in the Final section');
  assert.ok(finalHeadingPosition < instructionsPosition, 'instructions should follow the Final heading');
  assert.ok(instructionsPosition < firstInstallationPosition, 'instructions should precede the installation outcomes');

  const assetResponse = await fetch(new URL(instructions, siteUrl));
  assert.equal(assetResponse.status, 200, 'gesture instruction image should be served locally');
});
