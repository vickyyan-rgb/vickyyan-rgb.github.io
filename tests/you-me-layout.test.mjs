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
    'Technical Application',
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

test('uses one five-level responsive typography hierarchy throughout the case study', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
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
  const expectedLevels = [
    'var(--case-xl)',
    'var(--case-lg)',
    'var(--case-md)',
    'var(--case-sm)',
    'var(--case-xs)',
  ];

  for (const [name, value] of [
    ['--case-xl', 'clamp(51.2px,7.2vw,113.6px)'],
    ['--case-lg', 'clamp(30.4px,3.28vw,51.2px)'],
    ['--case-md', 'clamp(24px,2.8vw,42px)'],
    ['--case-sm', 'clamp(15px,1.05vw,18px)'],
    ['--case-xs', '12px'],
  ]) {
    assert.match(css, new RegExp(`${name}:\\s*${value.replace(/[().]/g, '\\$&')}`));
  }

  const caseStudyFontSizes = [...css.matchAll(/([^{}]*(?:case-study|you-me-case-study)[^{}]*)\{([^{}]*)\}/g)]
    .flatMap(([, , declarations]) => [...declarations.matchAll(/font-size:\s*([^;}]+)/g)])
    .map((match) => match[1].trim());
  const uniqueFontSizes = [...new Set(caseStudyFontSizes)];

  assert.deepEqual(uniqueFontSizes.sort(), expectedLevels.sort());
  assert.ok(uniqueFontSizes.length <= 5);
  assert.match(css, /\.case-study-scope>h3[^}]*font-size:\s*var\(--case-xl\)/);
  assert.match(css, /\.case-study-manifesto>h4[^}]*font-size:\s*var\(--case-lg\)/);
  assert.match(css, /\.case-study-process-header h4[^}]*font-size:\s*var\(--case-md\)/);
  assert.match(css, /\.case-study-process-header p[^}]*font-size:\s*var\(--case-sm\)/);
  assert.match(css, /\.case-study-scope-meta dt[^}]*font-size:\s*var\(--case-xs\)/);
  assert.match(css, /#you-me-we-it>summary \.project-title[^}]*font-size:\s*var\(--case-md\)/);
  assert.match(css, /#you-me-we-it>summary \.project-toggle[^}]*font-size:\s*var\(--case-sm\)/);
  assert.match(css, /#you-me-we-it>summary :is\(\.project-number,\.project-field,\.project-year\)[^}]*font-size:\s*var\(--case-xs\)/);
});

test('restores the original case-study composition while keeping prototype and digital iteration media compact', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);
  const html = await response.text();

  const caseStudyHtml = html.match(/<details class="project" id="you-me-we-it">([\s\S]*?)<details class="project" id="embodied-cognition">/)?.[1];
  assert.ok(caseStudyHtml, 'expected the You / Me / We / It case study to render');
  const autoplayVideos = [...caseStudyHtml.matchAll(/<video[^>]*autoplay/gi)];
  assert.equal(autoplayVideos.length, 10, 'every You / Me / We / It video should autoplay');

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');

  assert.doesNotMatch(css, /\.you-me-case-study\s*\{[^}]*--case-media-width:/);
  assert.match(css, /\.case-study-design-logic>ol\s*\{[^}]*grid-template-columns:\s*repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(css, /\.case-study-motion-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.case-study-installation-grid\s*\{[^}]*grid-template-columns:\s*\.72fr 1\.25fr \.72fr/);
  assert.match(css, /\.case-study-final-grid\s*\{[^}]*grid-template-columns:\s*repeat\(12,minmax\(0,1fr\)\)/);
  assert.match(css, /\.you-me-case-study \.case-study-fabrication-media>figure\s*\{[^}]*width:\s*50%[^}]*margin-inline:\s*auto/);
  assert.match(css, /\.you-me-case-study \.case-study-digital-media>\.project-video\s*\{[^}]*width:\s*50%[^}]*margin-inline:\s*auto/);
  assert.match(css, /@media\s*\(max-width:700px\)[\s\S]*\.you-me-case-study :is\(\.case-study-fabrication-media>figure,\.case-study-digital-media>\.project-video\)\s*\{[^}]*width:\s*100%/);
});

test('removes the approach label and presents the remaining statement as small centered text', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.doesNotMatch(html, />Approach</);
  assert.match(html, /I listen closely, reduce noise, and design from the human out\./);

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');

  assert.match(css, /\.about-preview\s*\{[^}]*justify-content:\s*center/);
  assert.match(css, /\.about-preview p\s*\{[^}]*font-size:\s*16px[^}]*text-align:\s*center/);
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
  const placingPosition = html.indexOf('From placing to feeling');
  const motionPosition = html.indexOf('You are a line, but which line?');
  const prototypePosition = html.indexOf('>Prototypes<');
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

test('removes the concept sketch and crops the four technical drawings away from their captions', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.doesNotMatch(html, /process\/concept-sketches\.jpg/);
  assert.doesNotMatch(html, />Concept direction</);

  const drawingCrops = [
    ['table-elevation.jpg', 'elevation'],
    ['sensor-layout.jpg', 'sensor'],
    ['table-assembly.jpg', 'assembly'],
    ['arduino-tinkercad.png', 'circuit'],
  ];
  for (const [asset, cropClass] of drawingCrops) {
    assert.match(
      html,
      new RegExp(`case-study-drawing-crop case-study-drawing-crop--${cropClass}[\\s\\S]*?${asset}`),
      `expected ${asset} inside its crop frame`,
    );
  }

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');

  assert.match(css, /\.case-study-drawing-crop\s*\{[^}]*overflow:\s*hidden/);
  assert.match(css, /\.case-study-drawing-grid figcaption\s*\{[^}]*padding-top:\s*clamp\(20px,2vw,30px\)/);
  assert.match(css, /\.case-study-drawing-crop--sensor\s*\{[^}]*aspect-ratio:\s*1684\/1191/);
  for (const [, cropClass] of drawingCrops) {
    assert.match(css, new RegExp(`\\.case-study-drawing-crop--${cropClass}\\s*\\{`));
  }
});

test('uses the revised opening story and centers the motion-study introduction', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);
  const html = await response.text();

  const opening = html.match(/<section class="case-study-opening"[\s\S]*?<blockquote>\s*<p>(.*?)<\/p>/)?.[1]
    .replaceAll('&#x27;', "'")
    .replaceAll('&apos;', "'");
  assert.equal(opening, 'Our You / Me / We / It is sited within Café 059, a once-vital hub now silent. The installation aims to reactivate the space through inheriting their original subject matter, beverages as the input devise to translate into visualizations that reflects “social warmth”. The installation invites participants to be curious and follow their circle, seeing its encounters and comparing to its Neighbours. The visuals sends messages: when two drinks share a temperature, their circles align and blend into a unified hue, forming a connective geometry. This dynamic visualization serves as a metaphor for the social “temperature” and distance of the Daniels social fabric, using the tangible residue of interaction to create a live, data-driven portrait of the space\'s lost vitality, literally projecting energy back into the empty room.');

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');
  assert.match(css, /\.case-study-motion-studies \.case-study-process-header\s*\{[^}]*text-align:\s*center/);
  assert.match(css, /\.case-study-motion-studies \.case-study-process-header h4[^}]*margin-inline:\s*auto/);
  assert.match(css, /\.case-study-motion-studies \.case-study-process-header p[^}]*margin-inline:\s*auto/);
});

test('presents technical application, digital iterations, and fabrication in sequence', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);
  const html = await response.text();

  const designLogicPosition = html.indexOf('Design Logic');
  const prototypesPosition = html.indexOf('>Prototypes<');
  const technicalPosition = html.indexOf('>Technical Application<');
  const digitalPosition = html.indexOf('>Digital Iterations<');
  const fabricationPosition = html.indexOf('>Fabrication<');
  const materialPosition = html.indexOf('>Material Testing<');
  assert.ok(designLogicPosition < prototypesPosition);
  assert.ok(prototypesPosition < technicalPosition);
  assert.ok(technicalPosition < digitalPosition);
  assert.ok(digitalPosition < fabricationPosition);
  assert.ok(fabricationPosition < materialPosition);

  const technicalAssets = [
    '/projects/you-me-case-study/prototype.jpg',
    '/projects/you-me-case-study/sensor-hardware.jpg',
    '/projects/you-me-case-study/arduino-diagram.png',
    '/projects/you-me-case-study/fabrication-demonstration.mp4',
  ];
  const technicalPositions = technicalAssets.map((asset) => html.indexOf(asset));
  technicalPositions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing technical asset: ${technicalAssets[index]}`);
    if (index > 0) assert.ok(technicalPositions[index - 1] < position);
  });
  assert.doesNotMatch(html, /coaster-prototype-[12]\.jpg/);

  const iterationVideos = [
    '/projects/you-me-case-study/digital-iterations/recording-2025-09-30.mp4',
    '/projects/you-me-case-study/digital-iterations/first-draft.mp4',
    '/projects/you-me-case-study/digital-iterations/second-draft.mp4',
    '/projects/you-me-case-study/digital-iterations/recording-2025-10-01.mp4',
  ];
  const iterationPositions = iterationVideos.map((asset) => html.indexOf(asset));
  iterationPositions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing digital iteration: ${iterationVideos[index]}`);
    if (index > 0) assert.ok(iterationPositions[index - 1] < position);
  });

  const fabricationAssets = [
    '/projects/you-me-case-study/fabrication/fabrication-hero.jpg',
    '/projects/you-me-case-study/fabrication/fabrication-front.jpg',
    '/projects/you-me-case-study/fabrication/fabrication-angle.jpg',
    '/projects/you-me-case-study/fabrication/fabrication-profile.jpg',
    '/projects/you-me-case-study/fabrication/fabrication-rear.jpg',
  ];
  const plywoodAssets = [
    '/projects/you-me-case-study/fabrication/plywood-foil-assembled.jpg',
    '/projects/you-me-case-study/fabrication/plywood-foil-open.jpg',
    '/projects/you-me-case-study/fabrication/plywood-foil-components.jpg',
  ];
  const acrylicAssets = [
    '/projects/you-me-case-study/fabrication/acrylic-installation.jpg',
    '/projects/you-me-case-study/fabrication/acrylic-sensor-test.jpg',
    '/projects/you-me-case-study/fabrication/acrylic-laser-test.jpg',
  ];
  const newAssets = [...fabricationAssets, ...plywoodAssets, ...acrylicAssets];
  const newAssetPositions = newAssets.map((asset) => html.indexOf(asset));
  newAssetPositions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing fabrication chapter asset: ${newAssets[index]}`);
    if (index > 0) assert.ok(newAssetPositions[index - 1] < position);
  });
  for (const asset of newAssets) {
    const assetResponse = await fetch(new URL(asset, siteUrl));
    assert.equal(assetResponse.status, 200, `fabrication asset is not served: ${asset}`);
  }

  const stylesheetPaths = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((match) => match[1]);
  const css = (await Promise.all(stylesheetPaths.map(async (path) => {
    const stylesheetResponse = await fetch(new URL(path, siteUrl));
    assert.equal(stylesheetResponse.status, 200);
    return stylesheetResponse.text();
  }))).join('\n');
  assert.match(css, /\.case-study-prototypes>h3[^}]*font-size:\s*var\(--case-xl\)/);
  assert.match(css, /\.case-study-fabrication-media[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /\.case-study-digital-media[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /\.case-study-fabrication-gallery\s*\{[^}]*grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.case-study-fabrication-hero\s*\{[^}]*grid-column:\s*1\/-1/);
  assert.match(css, /\.case-study-material-comparison\s*\{[^}]*grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/);
});

test('ends You / Me / We / It with gesture instructions and the interactive TRY ME link', async () => {
  const response = await fetch(siteUrl);
  assert.equal(response.status, 200);
  const html = await response.text();
  const caseStudyHtml = html.match(/<details class="project" id="you-me-we-it">([\s\S]*?)<details class="project" id="embodied-cognition">/)?.[1];
  assert.ok(caseStudyHtml, 'expected the You / Me / We / It case study to render');

  const finalImagePosition = caseStudyHtml.indexOf('/projects/you-me-case-study/final/cafe-installation.jpg');
  const instructionsPosition = caseStudyHtml.indexOf('/projects/you-me-case-study/interaction-instructions.png');
  const tryMePosition = caseStudyHtml.indexOf('>TRY ME<');
  const backPosition = caseStudyHtml.indexOf('>Back to interactive study<');

  assert.ok(finalImagePosition < instructionsPosition, 'instructions should follow the final installation gallery');
  assert.ok(instructionsPosition < tryMePosition, 'TRY ME should follow the instructions');
  assert.ok(tryMePosition < backPosition, 'TRY ME should remain above the project return link');
  assert.match(
    caseStudyHtml,
    /<a[^>]+href="https:\/\/editor\.p5js\.org\/vic2004322\/full\/dWHlrsP8J"[^>]+target="_blank"[^>]+rel="noopener noreferrer"[^>]*>TRY ME<\/a>/,
  );

  const assetResponse = await fetch(new URL('/projects/you-me-case-study/interaction-instructions.png', siteUrl));
  assert.equal(assetResponse.status, 200, 'gesture instruction image should be served locally');
});
