import assert from 'node:assert/strict';
import test from 'node:test';

import { titlePositionForProject } from '../app/base-photo/hotspotGeometry.ts';

test('positions the You / Me / We / It title farther left within its hotspot', () => {
  const position = titlePositionForProject({ width: 2702, height: 1698 }, 'you-me-we-it');

  assert.deepEqual(position, { left: 570, top: 415 });
});
