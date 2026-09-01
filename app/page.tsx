'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [intro, setIntro] = useState(true);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setIntro(false); return; }
    const timer = window.setTimeout(() => setIntro(false), 3400);
    return () => window.clearTimeout(timer);
  }, []);

  const reveal = (x: number, y: number) => {
    veilRef.current?.style.setProperty('--x', `${x}px`);
    veilRef.current?.style.setProperty('--y', `${y}px`);
  };

  return (
    <main
      className="experience"
      onPointerMove={(event) => reveal(event.clientX, event.clientY)}
      onPointerLeave={() => reveal(-500, -500)}
    >
      <div className="photo-layer" aria-hidden="true" />

      <div className={`white-veil ${intro ? 'is-waiting' : 'is-ready'}`} ref={veilRef}>
        <nav aria-label="Primary navigation">
          <a href="#top" className="nav-name">Vicky Yan</a>
          <div><a href="#work">Work</a><a href="#about">About</a><a href="mailto:hello@vickyyan.com">Contact</a></div>
        </nav>

        <section className="landing" id="top">
          <div className="landing-copy">
            <p>Vicky Yan</p>
            <h1>Human-centered<br />designer</h1>
            <span>Designing clear, considered experiences<br />for people and the world around them.</span>
          </div>
          <div className="index-mark">01</div>
        </section>

        <section className="work-preview" id="work">
          <p>Selected work</p>
          <h2>Quiet systems.<br />Meaningful details.</h2>
        </section>

        <section className="about-preview" id="about">
          <span>Approach</span>
          <p>I listen closely, reduce noise, and design from the human out.</p>
        </section>
      </div>

      {intro && (
        <button className="intro" onClick={() => setIntro(false)} aria-label="Skip introduction">
          <span className="intro-name">Vicky Yan</span>
          <span className="intro-line" />
          <small>Click anywhere to skip</small>
        </button>
      )}

      {!intro && <div className="cursor-hint" aria-hidden="true">Move to reveal</div>}
    </main>
  );
}
