'use client';

import { useLayoutEffect, useState, type MouseEvent } from 'react';
import { useDynamicReveal } from '../useDynamicReveal';

type ProjectSlug = 'you-me-we-it' | 'embodied-cognition' | 'sketch-a-home' | 'block-sketch' | 'block';

const PROJECT_TITLES: Record<ProjectSlug, string> = {
  'you-me-we-it': 'You / Me / We / It',
  'embodied-cognition': 'Embodied Cognition',
  'sketch-a-home': 'Sketch-a-home',
  'block-sketch': 'Block / Sketch',
  block: 'Block',
};

type HotspotTitle = {
  project: ProjectSlug;
  left: number;
  top: number;
};

export default function BasePhotoPage() {
  const { veilRef, reveal, hideReveal } = useDynamicReveal(0.5);
  const [instantReturn, setInstantReturn] = useState(false);
  const [hotspotTitle, setHotspotTitle] = useState<HotspotTitle | null>(null);

  useLayoutEffect(() => {
    setInstantReturn(new URLSearchParams(window.location.search).has('instant'));
  }, []);

  const projectAtPoint = (element: HTMLElement, clientX: number, clientY: number): ProjectSlug | null => {
    const sourceWidth = 2702;
    const sourceHeight = 1698;
    const rect = element.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    if (relativeX >= rect.width / 2 && relativeY <= rect.height / 2) {
      return 'embodied-cognition';
    }

    if (relativeY > rect.height / 2) {
      return relativeX < rect.width / 3
        ? 'sketch-a-home'
        : relativeX < (rect.width * 2) / 3
          ? 'block-sketch'
          : 'block';
    }

    const scale = Math.max(rect.width / sourceWidth, rect.height / sourceHeight);
    const displayedWidth = sourceWidth * scale;
    const displayedHeight = sourceHeight * scale;
    const offsetX = (rect.width - displayedWidth) / 2;
    const offsetY = (rect.height - displayedHeight) / 2;
    const imageX = (clientX - rect.left - offsetX) / scale;
    const imageY = (clientY - rect.top - offsetY) / scale;

    const hotspots: Array<{ x1: number; x2: number; y1: number; y2: number; project: ProjectSlug }> = [
      { x1: 370, x2: 900, y1: 250, y2: 580, project: 'you-me-we-it' },
    ];
    return hotspots.find(({ x1, x2, y1, y2 }) =>
      imageX >= x1 && imageX <= x2 && imageY >= y1 && imageY <= y2
    )?.project ?? null;
  };

  const titlePositionForProject = (element: HTMLElement, project: ProjectSlug) => {
    const rect = element.getBoundingClientRect();

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
      left: offsetX + 635 * scale,
      top: offsetY + 415 * scale,
    };
  };

  const openProjectHotspot = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) return;

    const project = projectAtPoint(event.currentTarget, event.clientX, event.clientY);
    if (project) window.location.href = `/#${project}`;
  };

  return (
    <main
      className={`base-experience ${instantReturn ? 'is-instant' : ''} ${hotspotTitle ? 'is-hotspot-active' : ''}`}
      onClick={openProjectHotspot}
      onPointerMove={(event) => {
        const project = projectAtPoint(event.currentTarget, event.clientX, event.clientY);
        reveal(event.clientX, event.clientY, project ? 1.75 : 1);
        setHotspotTitle((current) => {
          if (!project) return current ? null : current;
          if (current?.project === project) return current;
          return { project, ...titlePositionForProject(event.currentTarget, project) };
        });
      }}
      onPointerLeave={() => {
        hideReveal();
        setHotspotTitle(null);
      }}
    >
      <div className="base-photo-layer" aria-hidden="true" />
      <div className="base-white-veil" ref={veilRef}>
        <nav aria-label="Base photo navigation">
          <a href="/" className="nav-name">Vicky Yan</a>
          <div><a href="/">Back to portfolio</a></div>
        </nav>

        <section className="base-copy">
          <p><span>Interactive study / 2026</span></p>
        </section>
      </div>
      {hotspotTitle && (
        <p
          key={hotspotTitle.project}
          className="base-hotspot-title"
          style={{ left: hotspotTitle.left, top: hotspotTitle.top }}
          aria-live="polite"
        >
          {PROJECT_TITLES[hotspotTitle.project]}
        </p>
      )}
    </main>
  );
}
