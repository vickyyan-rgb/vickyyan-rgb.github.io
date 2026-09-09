'use client';

import { useLayoutEffect, useState, type MouseEvent } from 'react';
import { useDynamicReveal } from '../useDynamicReveal';

export default function BasePhotoPage() {
  const { veilRef, reveal, hideReveal } = useDynamicReveal(0.5);
  const [instantReturn, setInstantReturn] = useState(false);
  const [hotspotProject, setHotspotProject] = useState<string | null>(null);

  useLayoutEffect(() => {
    setInstantReturn(new URLSearchParams(window.location.search).has('instant'));
  }, []);

  const projectAtPoint = (element: HTMLElement, clientX: number, clientY: number) => {
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

    const hotspots = [
      { x1: 370, x2: 900, y1: 250, y2: 580, project: 'you-me-we-it' },
    ];
    return hotspots.find(({ x1, x2, y1, y2 }) =>
      imageX >= x1 && imageX <= x2 && imageY >= y1 && imageY <= y2
    )?.project ?? null;
  };

  const openProjectHotspot = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) return;

    const project = projectAtPoint(event.currentTarget, event.clientX, event.clientY);
    if (project) window.location.href = `/#${project}`;
  };

  return (
    <main
      className={`base-experience ${instantReturn ? 'is-instant' : ''} ${hotspotProject ? 'is-hotspot-active' : ''}`}
      onClick={openProjectHotspot}
      onPointerMove={(event) => {
        reveal(event.clientX, event.clientY);
        setHotspotProject(projectAtPoint(event.currentTarget, event.clientX, event.clientY));
      }}
      onPointerLeave={() => {
        hideReveal();
        setHotspotProject(null);
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
    </main>
  );
}
