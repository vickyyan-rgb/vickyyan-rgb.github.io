'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import ProjectVideo from './ProjectVideo';
import YouMeWeItCaseStudy from './YouMeWeItCaseStudy';
import EmbodiedCognitionCaseStudy from './EmbodiedCognitionCaseStudy';
import { useDynamicReveal } from './useDynamicReveal';

type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;
  field: string;
  cover: string;
  detail?: string;
  gallery?: string[];
  video?: string;
  summary: string;
};

const MEDIA_BASE = 'https://github.com/vickyyan-rgb/vickyyan-rgb.github.io/releases/download/media-v1';

const projects: Project[] = [
  {
    number: '01', slug: 'you-me-we-it', title: 'You / Me / We / It', year: '2025', field: 'Tangible HCI installation',
    cover: '/projects/you-me-we-it.jpg', detail: '/projects/you-me-we-it-detail.jpg',
    video: `${MEDIA_BASE}/you-me-we-it-prototype.mp4`,
    summary: 'A café installation that translates the live temperature of shared drinks into breathing, collective visualizations of social warmth.',
  },
  {
    number: '02', slug: 'embodied-cognition', title: 'Embodied Cognition', year: '2025', field: 'Interactive installation',
    cover: '/projects/embodied-cognition.png',
    video: `${MEDIA_BASE}/embodied-cognition.mp4`,
    summary: 'A communal installation where participants contribute responsive digital “blobs,” making individual presence, collective engagement, and even moments of non-participation visible within a shared environment.',
  },
  {
    number: '03', slug: 'sketch-a-home', title: 'Sketch-a-home', year: '2025', field: 'Human-AI spatial interface',
    cover: '/projects/sketch-ai-zoom.png',
    gallery: ['/projects/sketch-central-hand.jpg', '/projects/sketch-process.jpg', '/projects/sketch-hand-click.jpg'],
    video: `${MEDIA_BASE}/sketch-a-home.mp4`,
    summary: 'An embodied home-design interface where hand gestures arrange furniture-like forms in a shared projected space, then AI translates those spatial sketches into vivid domestic environments.',
  },
  {
    number: '04', slug: 'block-sketch', title: 'Block / Sketch', year: '2025', field: 'Human-AI design tool',
    cover: '/projects/block-sketch.jpg', detail: '/projects/block-sketch-detail.jpg',
    video: `${MEDIA_BASE}/block-sketch.mp4`,
    summary: 'A playful loop from hand-assembled body blocks to a custom 3D scanner, point clouds, and real-time AI-generated architectural possibilities.',
  },
  {
    number: '05', slug: 'block', title: 'Block', year: '2025', field: 'Modular object system',
    cover: '/projects/block-process.png',
    summary: 'A family of person-like modular blocks uses square joints, circular bindings, and asymmetrical legs to support both Cartesian stacking and freer angled connections—turning each individual unit into a growing physical community.',
  },
];

const architectureProjects = [
  { number: '06', slug: 'battery-park', title: 'Battery Park', field: 'Landscape + ecological design', year: '2024–25' },
  { number: '07', slug: 'athletic-centre', title: 'Athletic Centre', field: 'Adaptive reuse + circulation', year: '2024–25' },
  { number: '08', slug: 'schrodingers', title: "Schrödinger's", field: 'Spatial systems study', year: '2024–25' },
  { number: '09', slug: 'dexamenoi-square', title: 'Dexamenoi Square', field: 'Public space + landscape', year: '2024–25' },
];

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [leavingForStudy, setLeavingForStudy] = useState(false);
  const experienceRef = useRef<HTMLElement>(null);
  const { veilRef, reveal, hideReveal } = useDynamicReveal();

  useEffect(() => {
    const requestedProject = window.location.hash.slice(1);
    if (projects.some((project) => project.slug === requestedProject)) {
      setIntro(false);
      window.requestAnimationFrame(() => {
        const project = document.getElementById(requestedProject) as HTMLDetailsElement | null;
        if (project) {
          project.open = true;
          project.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      });
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setIntro(false); return; }
    const timer = window.setTimeout(() => setIntro(false), 5600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    let animationFrame = 0;
    const updateParallax = () => {
      const scrollDistance = Math.min(window.scrollY, window.innerHeight * 1.5);
      experienceRef.current?.style.setProperty('--parallax-y', `${scrollDistance}px`);
      animationFrame = 0;
    };
    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const enterStudy = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (leavingForStudy) return;
    setLeavingForStudy(true);
    window.setTimeout(() => {
      window.location.href = '/base-photo';
    }, 500);
  };

  return (
    <main
      ref={experienceRef}
      className="experience"
      onPointerMove={(event) => reveal(event.clientX, event.clientY)}
      onPointerLeave={hideReveal}
    >
      <div className={`photo-layer ${intro ? 'photo-paused' : ''}`} aria-hidden="true" />

      <div className="white-veil is-ready" ref={veilRef}>
        <nav aria-label="Primary navigation">
          <a href="#top" className="nav-name">Vicky Yan</a>
          <div><a href="/resume/vicky-yan-resume-2026.pdf" target="_blank" rel="noreferrer">Resume</a><a href="https://www.linkedin.com/in/vickytongyan/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:yanvicky@berkeley.edu">yanvicky@berkeley.edu</a><a href="tel:+14375668895">437-566-8895</a></div>
        </nav>

        <section className="landing" id="top">
          <div className="landing-copy">
            <p>Vicky Yan</p>
            <h1>Product Designer /<br />Human-AI Interaction</h1>
            <span>I&apos;m a multidisciplinary designer exploring how AI and emerging technologies can reshape the way people interact with products and environments.</span>
            <div className="discipline-nav" aria-label="Explore Vicky Yan's work by discipline">
              <Link href="/architecture">Architecture</Link>
              <Link href="/base-photo" onClick={enterStudy}>Design</Link>
              <Link href="/playground">Playground</Link>
            </div>
          </div>
          <div className="index-mark">01</div>
        </section>

        <section className="project-index" id="work">
          <header className="projects-heading">
            <p>Selected work / 2022–2025</p>
            <span>Open a project to explore</span>
          </header>

          <div className="projects-list">
            {projects.map((project) => (
              <details className="project" key={project.number} id={project.slug}>
                <summary>
                  <span className="project-number">{project.number}</span>
                  <span className="project-title">{project.title}</span>
                  <span className="project-field">{project.field}</span>
                  <span className="project-year">{project.year}</span>
                  <span className="project-toggle" aria-hidden="true">＋</span>
                </summary>
                {project.slug === 'you-me-we-it' && project.video && project.detail ? (
                  <YouMeWeItCaseStudy video={project.video} />
                ) : project.slug === 'embodied-cognition' && project.video ? (
                  <EmbodiedCognitionCaseStudy video={project.video} />
                ) : (
                <div className="project-body">
                  <div className="project-opening" aria-hidden="true">
                    <span />
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-statement">
                    <p>{project.summary}</p>
                    <span>Research · Prototyping · Spatial thinking</span>
                  </div>
                  <figure className={`project-cover ${project.detail ? '' : 'project-cover-wide'}`}>
                    <img src={project.cover} alt={`${project.title} portfolio overview`} />
                  </figure>
                  {project.detail && (
                    <figure className="project-detail">
                      <img src={project.detail} alt={`${project.title} process and design details`} />
                    </figure>
                  )}
                  {project.gallery && (
                    <div className="project-gallery">
                      {project.gallery.map((image, index) => (
                        <figure key={image}>
                          <img src={image} alt={`${project.title} interaction view ${index + 1}`} />
                        </figure>
                      ))}
                    </div>
                  )}
                  {project.video && (
                    <ProjectVideo src={project.video} title={project.title} />
                  )}
                  <a className="project-back" href="/base-photo?instant=1">
                    <span>Back to interactive study</span>
                  </a>
                </div>
                )}
              </details>
            ))}
            {architectureProjects.map((project) => (
              <a
                className="architecture-project-link"
                href={`/architecture#${project.slug}`}
                key={project.slug}
                aria-label={`Open architecture project: ${project.title}`}
              >
                <span className="project-number">{project.number}</span>
                <span className="project-title">{project.title}</span>
                <span className="project-field">{project.field}</span>
                <span className="project-year">{project.year}</span>
              </a>
            ))}
          </div>

          <article className="bridge-note">
            <div><span>Bonus study / 2025</span><h3>Troitsky Bridge</h3><p>Material efficiency through interlocking triangular force distribution.</p></div>
            <img src="/projects/troitsky-bridge.jpg" alt="Troitsky Bridge prototype process" />
          </article>
        </section>

        <section className="about-preview" id="about">
          <p>I listen closely, reduce noise, and design from the human out.</p>
        </section>

        <section className="education" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div className="education-entry">
            <h3>University of California, Berkeley</h3>
            <p>Master of Design, 2026–present</p>
          </div>
          <div className="education-entry">
            <h3>University of Toronto</h3>
            <p>BA in Architectural Studies<br />Minor in Mathematics<br />Class of 2026</p>
          </div>
        </section>
      </div>

      <div className={`page-transition ${leavingForStudy ? 'is-active' : ''}`} aria-hidden="true" />

      {intro && (
        <button className="intro" onClick={() => setIntro(false)} aria-label="Skip introduction">
          <span className="intro-name">Vicky Yan</span>
          <span className="intro-line" />
          <span className="intro-thought">All design starts with a line.</span>
          <small>Click anywhere to skip</small>
        </button>
      )}

    </main>
  );
}
