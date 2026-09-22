import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

const siteUrl = process.env.SITE_TEST_URL ?? 'http://localhost:3000/#block-sketch';
const narrative = 'Block/sketch is a tactile exploration into the foundational processes of design. It proposes a bridge between the intuitive language of play and the expansive potential of digital imagination, using the human form as both a literal building block and a conceptual metaphor for community. Beginning with a collection of miniature, tiny “bodies” that can be joined, stacked, and merged by hand into a unique, composite shape. This act of physical assembly is a deliberate return to a primal, accessible form of creation. The resulting “sketch” is not drawn, but scanned into the 3d virtual space thought a self made 3D scanner, which provides the portal to endless possibilities sending through AI real time image generation, which is prompted to explore architectural possibilities inherent in the form. It is intentionally playful, designed to demystify the often-intimidating gateways of professional 3D modeling software. Here, design begins not with a blank screen and complex toolbars, but with the simple, satisfying click of connecting forms. The output is a series of speculative structures: buildings, pavilions, urban fragments that grow logically yet surprisingly from the initial, hand-held composition. The process creates a tangible loop: from body (the block) to collective body (the assembly) to digital body (the scan) to speculative body (the architecture).';

let pagePromise;

async function loadPage() {
  pagePromise ??= fetch(siteUrl).then(async (response) => {
    assert.equal(response.status, 200);
    return response.text();
  });
  return pagePromise;
}

function extractProject(html) {
  const project = html.match(/<details[^>]+id="block-sketch"[^>]*>([\s\S]*?)<\/details>/)?.[0];
  assert.ok(project, 'expected the Block / Sketch project to render');
  return project;
}

function extractLocalMedia(project) {
  return [...project.matchAll(/\bsrc="(\/projects\/block-sketch-case-study\/[^"?#]+)"/g)]
    .map((match) => match[1]);
}

test('opens Block / Sketch on white with the approved PDF hero, exact narrative, and current film', async () => {
  const html = await loadPage();
  const project = extractProject(html);
  const heroPosition = project.indexOf('/projects/block-sketch-case-study/opening.jpg');
  const narrativePosition = project.indexOf(narrative);
  const filmPosition = project.indexOf('block-sketch.mp4');

  assert.match(project, />Block \/ Sketch</);
  assert.match(project, /class="[^"]*block-sketch-case-study[^"]*"/);
  assert.notEqual(heroPosition, -1, 'expected page one of the supplied photo PDF as the opening image');
  assert.notEqual(narrativePosition, -1, 'expected the supplied Block / Sketch narrative verbatim');
  assert.notEqual(filmPosition, -1, 'expected the current Block / Sketch film');
  assert.ok(heroPosition < narrativePosition && narrativePosition < filmPosition);

  const mainFilm = project.match(/<video[^>]*>[\s\S]*?block-sketch\.mp4[\s\S]*?<\/video>/)?.[0] ?? '';
  assert.match(mainFilm, /autoplay/i);
  assert.match(mainFilm, /muted/i);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const response = await fetch(new URL(path, siteUrl));
    assert.equal(response.status, 200);
    return response.text();
  }))).join('\n');
  assert.match(css, /\.block-sketch-case-study\s*\{[^}]*background:\s*#fff/);
  assert.match(
    css,
    /\.block-sketch-case-study\s+\.block-sketch-logic-diagram\s+img\s*\{[^}]*filter:\s*invert\(1\)/,
    'expected a project-scoped filter that overrides the global image reset and removes the diagram black canvas',
  );
});

test('presents the approved Block / Sketch chapters in narrative order', async () => {
  const project = extractProject(await loadPage());
  const beats = [
    narrative,
    'block-sketch.mp4',
    '>Block<',
    '>Scanner<',
    '>Interaction Logic<',
    '>AI Translation<',
    '>Final Installation<',
  ];
  const positions = beats.map((beat) => project.indexOf(beat));

  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing Block / Sketch story beat: ${beats[index]}`);
    if (index > 0) assert.ok(positions[index - 1] < position, `${beats[index]} is out of order`);
  });
});

test('uses the local web-safe assembly film and omits duplicate media', async () => {
  const project = extractProject(await loadPage());
  const assembly = '/projects/block-sketch-case-study/assembly.mp4';
  const localMedia = extractLocalMedia(project);

  assert.ok(localMedia.includes(assembly), 'expected the supplied assembly animation as a local MP4');
  assert.doesNotMatch(project, /\.gif(?:["?#])/i, 'the duplicate GIF should not be rendered');
  assert.equal(localMedia.length, new Set(localMedia).size, 'each local media asset should render only once');

  const responses = await Promise.all(localMedia.map(async (asset) => {
    const response = await fetch(new URL(asset, siteUrl));
    assert.equal(response.status, 200, `Block / Sketch asset is not served: ${asset}`);
    return {
      asset,
      digest: createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex'),
    };
  }));
  const assetsByDigest = new Map();
  for (const { asset, digest } of responses) {
    const duplicate = assetsByDigest.get(digest);
    assert.equal(duplicate, undefined, `exact duplicate media rendered as both ${duplicate} and ${asset}`);
    assetsByDigest.set(digest, asset);
  }

  const assemblyResponse = await fetch(new URL(assembly, siteUrl));
  assert.match(assemblyResponse.headers.get('content-type') ?? '', /^video\/mp4\b/i);
});

test('places the modular-system caption directly beneath the exploded scanner drawing', async () => {
  const project = extractProject(await loadPage());
  const caption = 'The modular system separates and reconnects';
  const drawingFigure = project.match(/<figure class="block-sketch-technical-drawing">([\s\S]*?)<\/figure>/)?.[1] ?? '';
  const motionFigure = project.match(/<figure class="block-sketch-motion-card">([\s\S]*?)<\/figure>/)?.[1] ?? '';

  assert.match(drawingFigure, /scanner-exploded\.png/);
  assert.match(drawingFigure, new RegExp(`<figcaption>${caption}<\\/figcaption>`));
  assert.doesNotMatch(motionFigure, new RegExp(caption));
});

test('places the assembly video once, beside the Scanner introduction', async () => {
  const project = extractProject(await loadPage());
  const scannerStart = project.indexOf('class="block-sketch-section block-sketch-scanner"');
  const scannerEnd = project.indexOf('class="block-sketch-section block-sketch-logic"', scannerStart);
  const scanner = project.slice(scannerStart, scannerEnd);
  const intro = scanner.match(/<header class="block-sketch-scanner-intro">([\s\S]*?)<\/header>/)?.[1] ?? '';
  const videoPosition = intro.indexOf('/projects/block-sketch-case-study/assembly.mp4');
  const copyPosition = intro.indexOf('A self-made scanner carries the physical sketch into three-dimensional space.');

  assert.notEqual(videoPosition, -1, 'expected the assembly video inside the Scanner introduction');
  assert.notEqual(copyPosition, -1, 'expected the Scanner introduction copy');
  assert.ok(videoPosition < copyPosition, 'expected the assembly video before the Scanner copy in reading order');
  assert.equal(project.match(/assembly\.mp4/g)?.length, 1, 'expected the assembly video to render exactly once');
});

test('shows the hardware and electronics in complete landscape frames', async () => {
  const html = await loadPage();
  const project = extractProject(html);

  const extractFigureAround = (asset) => {
    const assetPosition = project.indexOf(asset);
    assert.notEqual(assetPosition, -1, `expected ${asset} to render`);
    const figureStart = project.lastIndexOf('<figure', assetPosition);
    const figureEnd = project.indexOf('</figure>', assetPosition);
    assert.notEqual(figureStart, -1, `expected ${asset} inside a figure`);
    assert.notEqual(figureEnd, -1, `expected ${asset} figure to close`);
    return project.slice(figureStart, figureEnd + '</figure>'.length);
  };

  const hardwareFigure = extractFigureAround('hardware-layout.jpg');
  const electronicsFigure = extractFigureAround('electronics.jpg');

  assert.match(hardwareFigure, /class="[^"]*block-sketch-build-card[^"]*block-sketch-build-card--rotated[^"]*"/);
  assert.match(electronicsFigure, /class="[^"]*block-sketch-build-card[^"]*"/);
  assert.doesNotMatch(electronicsFigure, /block-sketch-build-card--rotated/);
  assert.match(hardwareFigure, /class="block-sketch-build-media"/);
  assert.match(electronicsFigure, /class="block-sketch-build-media"/);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const response = await fetch(new URL(path, siteUrl));
    assert.equal(response.status, 200);
    return response.text();
  }))).join('\n');

  assert.match(css, /\.block-sketch-build-media\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*3[^}]*overflow:\s*hidden/);
  assert.match(
    css,
    /\.block-sketch-build-card\s+\.block-sketch-build-media\s+img\s*\{[^}]*object-fit:\s*contain/,
    'expected the contain rule to outrank the surrounding project gallery image rule',
  );
  assert.match(css, /\.block-sketch-build-card--rotated\s+\.block-sketch-build-media\s+img\s*\{[^}]*rotate\(90deg\)/);
});

test('serves the complete local Block / Sketch media sequence', async () => {
  const project = extractProject(await loadPage());
  const localMedia = extractLocalMedia(project);

  assert.ok(localMedia.length >= 12, 'expected media across all five Block / Sketch chapters');
  for (const asset of localMedia) {
    const response = await fetch(new URL(asset, siteUrl));
    assert.equal(response.status, 200, `Block / Sketch asset is not served: ${asset}`);
  }
});
