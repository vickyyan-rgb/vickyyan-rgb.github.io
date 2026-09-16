'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const steps = [
  { id: 'case-study-aim', label: 'Aim' },
  { id: 'case-study-design-logic', label: 'Design Logic' },
  { id: 'case-study-prototype', label: 'Prototype' },
  { id: 'case-study-installation', label: 'Installation' },
  { id: 'case-study-outlook', label: 'Outlook' },
];

export default function CaseStudyRoadmap() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.you-me-case-study');
    const anchors = steps.map((step) => document.getElementById(step.id));
    if (!root || anchors.some((anchor) => !anchor)) return;

    const update = () => {
      const viewportMarker = window.scrollY + window.innerHeight * 0.5;
      const positions = anchors.map((anchor) => {
        const element = anchor as HTMLElement;
        return element.getBoundingClientRect().top + window.scrollY;
      });
      const rootBounds = root.getBoundingClientRect();
      const firstAnchorBounds = (anchors[0] as HTMLElement).getBoundingClientRect();
      const first = positions[0];
      const last = positions[positions.length - 1];
      const nextProgress = Math.max(0, Math.min(1, (viewportMarker - first) / Math.max(1, last - first)));
      let nextActive = 0;

      positions.forEach((position, index) => {
        if (viewportMarker >= position) nextActive = index;
      });

      setVisible(firstAnchorBounds.top < window.innerHeight * 0.78 && rootBounds.bottom > window.innerHeight * 0.18);
      setProgress(nextProgress);
      setActiveStep(nextActive);
    };

    const queueUpdate = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        update();
      });
    };

    update();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const roadmapStyle = {
    '--roadmap-progress': `${progress * 100}%`,
  } as CSSProperties;

  return (
    <>
      <div className={`case-study-route-start ${visible ? 'is-visible' : ''}`} aria-hidden="true">
        <span className="case-study-route-horizontal" />
      </div>
      {mounted && createPortal(
        <aside
          className={`case-study-scroll-map ${visible ? 'is-visible' : ''}`}
          style={roadmapStyle}
          aria-label="You Me We It case study progress"
        >
          <span className="case-study-map-track" aria-hidden="true">
            <span />
          </span>
          <ol>
            {steps.map((step, index) => (
              <li
                className={`${index <= activeStep ? 'is-revealed' : ''} ${index === activeStep ? 'is-active' : ''}`}
                key={step.id}
                aria-current={index === activeStep ? 'step' : undefined}
              >
                <span>{step.label}</span>
              </li>
            ))}
          </ol>
        </aside>,
        document.body,
      )}
    </>
  );
}
