'use client';

import { useLayoutEffect, useState, type MouseEvent } from 'react';
import { useDynamicReveal } from '../useDynamicReveal';

export default function BasePhotoPage() {
  const { veilRef, reveal, hideReveal } = useDynamicReveal();
  const [instantReturn, setInstantReturn] = useState(false);

  useLayoutEffect(() => {
    setInstantReturn(new URLSearchParams(window.location.search).has('instant'));
  }, []);

  const openProjectHotspot = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) return;

    const sourceWidth = 2702;
    const sourceHeight = 1698;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    if (relativeX >= rect.width / 2 && relativeY <= rect.height / 2) {
      window.location.href = '/#embodied-cognition';
      return;
    }

    if (relativeY > rect.height / 2) {
      const project = relativeX < rect.width / 3
        ? 'sketch-a-home'
        : relativeX < (rect.width * 2) / 3
          ? 'block-sketch'
          : 'block';
      window.location.href = `/#${project}`;
      return;
    }

    const scale = Math.max(rect.width / sourceWidth, rect.height / sourceHeight);
    const displayedWidth = sourceWidth * scale;
    const displayedHeight = sourceHeight * scale;
    const offsetX = (rect.width - displayedWidth) / 2;
    const offsetY = (rect.height - displayedHeight) / 2;
    const imageX = (event.clientX - rect.left - offsetX) / scale;
    const imageY = (event.clientY - rect.top - offsetY) / scale;

    const hotspots = [
      { x1: 370, x2: 900, y1: 250, y2: 580, project: 'you-me-we-it' },
    ];
    const hotspot = hotspots.find(({ x1, x2, y1, y2 }) =>
      imageX >= x1 && imageX <= x2 && imageY >= y1 && imageY <= y2
    );

    if (hotspot) window.location.href = `/#${hotspot.project}`;
  };

  return (
    <main
      className={`base-experience ${instantReturn ? 'is-instant' : ''}`}
      onClick={openProjectHotspot}
      onPointerMove={(event) => reveal(event.clientX, event.clientY)}
      onPointerLeave={hideReveal}
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
