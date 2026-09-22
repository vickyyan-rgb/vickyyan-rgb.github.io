import assert from 'node:assert/strict';
import test from 'node:test';

import { titlePositionForProject } from '../app/base-photo/hotspotGeometry.ts';

test('positions the You / Me / We / It title farther left within its hotspot', () => {
  const position = titlePositionForProject({ width: 2702, height: 1698 }, 'you-me-we-it');

  assert.deepEqual(position, { left: 570, top: 415 });
});

test('moves only Block / Sketch lower within the bottom row', () => {
  const rect = { width: 1200, height: 900 };

  assert.deepEqual(titlePositionForProject(rect, 'sketch-a-home'), { left: 200, top: 675 });
  assert.deepEqual(titlePositionForProject(rect, 'block-sketch'), { left: 600, top: 738 });
  assert.deepEqual(titlePositionForProject(rect, 'block'), { left: 1000, top: 675 });
});
