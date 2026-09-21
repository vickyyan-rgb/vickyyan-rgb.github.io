export type ProjectSlug = 'you-me-we-it' | 'embodied-cognition' | 'sketch-a-home' | 'block-sketch' | 'block';

type HotspotRect = {
  width: number;
  height: number;
};

export function titlePositionForProject(rect: HotspotRect, project: ProjectSlug) {
  if (project === 'embodied-cognition') return { left: rect.width * 0.75, top: rect.height * 0.25 };
  if (project === 'sketch-a-home') return { left: rect.width / 6, top: rect.height * 0.75 };
  if (project === 'block-sketch') return { left: rect.width * 0.5, top: rect.height * 0.75 };
  if (project === 'block') return { left: rect.width * (5 / 6), top: rect.height * 0.75 };

  const sourceWidth = 2702;
  const sourceHeight = 1698;
  const scale = Math.max(rect.width / sourceWidth, rect.height / sourceHeight);
  const offsetX = (rect.width - sourceWidth * scale) / 2;
  const offsetY = (rect.height - sourceHeight * scale) / 2;
  return {
    left: offsetX + 570 * scale,
    top: offsetY + 415 * scale,
  };
}
