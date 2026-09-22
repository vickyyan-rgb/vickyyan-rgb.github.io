'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import Image from 'next/image';
import ProjectVideo from '../ProjectVideo';

type PlaygroundProject = {
  id: string;
  number: string;
  title: string;
  thumbnail: string;
  thumbnailAlt: string;
  media: string;
  mediaType: 'video' | 'image';
  description: string;
  date: string;
  author: string;
  material: string;
};

const projects: PlaygroundProject[] = [
  {
    id: 'traces-of-home',
    number: '01',
    title: 'Traces of home',
    thumbnail: '/playground/traces-of-home-thumbnail.png',
    thumbnailAlt: 'Toronto street scene titled Traces of home',
    media: '/playground/traces-of-home-final-3.mp4',
    mediaType: 'video',
    description:
      'A moving-image study of Toronto’s Chinatown that traces how memory, migration, and belonging accumulate within the everyday city.',
    date: '2025',
    author: 'Vicky Yan',
    material: 'Digital video, urban footage, typography',
  },
  {
    id: 'future-time-giant-wheel',
    number: '02',
    title: 'Future Time-Giant Wheel',
    thumbnail: '/playground/future-time-giant-wheel-thumbnail.png',
    thumbnailAlt: 'Nokia phone floating inside a circular light field',
    media: '/playground/future-time-giant-wheel-vicky-yan.mp4',
    mediaType: 'video',
    description:
      'A speculative moving-image collage that loops obsolete technology and future-facing imagination through the rhythm of a giant wheel.',
    date: '2024',
    author: 'Vicky Yan',
    material: 'Digital video, found imagery, animation',
  },
  {
    id: 'troitsky-bridge',
    number: '03',
    title: 'Troitsky Bridge',
    thumbnail: '/playground/troitsky-bridge-thumbnail.jpg',
    thumbnailAlt: 'Troitsky Bridge structural prototype against black fabric',
    media: '/playground/troitsky-bridge-thumbnail.jpg',
    mediaType: 'image',
    description:
      'A material study of structural efficiency, using interlocking triangular frames and hand-bound joints to distribute force through a compact bridge form.',
    date: '2025',
    author: 'Vicky Yan',
    material: 'Wood, thread, and physical model-making',
  },
];

export default function PlaygroundGallery() {
  const [activeProject, setActiveProject] = useState<PlaygroundProject | null>(null);
  const previousTrigger = useRef<HTMLButtonElement | null>(null);

  const closeDetail = useCallback(() => {
    setActiveProject(null);
    window.requestAnimationFrame(() => previousTrigger.current?.focus());
  }, []);

  useEffect(() => {
    if (!activeProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, closeDetail]);

  const openDetail = (
    project: PlaygroundProject,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    previousTrigger.current = event.currentTarget;
    setActiveProject(project);
  };

  return (
    <>
      <section className="film-grid" aria-label="Playground projects">
        {projects.map((project, index) => (
          <article className="film-card" key={project.id}>
            <header>
              <span>{`${project.number} / 03`}</span>
              <h2>{project.title}</h2>
            </header>
            <button
              className="playground-thumbnail"
              type="button"
              aria-label={`Open ${project.title} project`}
              aria-haspopup="dialog"
              data-detail-media={project.media}
              onClick={(event) => openDetail(project, event)}
            >
              <Image
                src={project.thumbnail}
                alt={project.thumbnailAlt}
                width={1600}
                height={900}
                unoptimized
                sizes="(max-width: 700px) calc(100vw - 44px), 46vw"
                priority={index === 0}
              />
              <span>View project</span>
            </button>
          </article>
        ))}
      </section>

      {activeProject ? (
        <dialog
          open
          className="playground-detail"
          id={`playground-detail-${activeProject.id}`}
          aria-modal="true"
          aria-labelledby={`playground-detail-title-${activeProject.id}`}
        >
          <button
            className="playground-detail-close"
            type="button"
            onClick={closeDetail}
            autoFocus
          >
            Close <span aria-hidden="true">×</span>
          </button>

          <div className="playground-detail-media">
            {activeProject.mediaType === 'video' ? (
              <ProjectVideo src={activeProject.media} title={activeProject.title} />
            ) : (
              <Image
                src={activeProject.media}
                alt={`${activeProject.title} structural prototype`}
                width={4032}
                height={3024}
                unoptimized
                sizes="100vw"
              />
            )}
          </div>

          <div className="playground-detail-copy">
            <header>
              <span>{`${activeProject.number} / 03`}</span>
              <h2 id={`playground-detail-title-${activeProject.id}`}>
                {activeProject.title}
              </h2>
            </header>
            <p className="playground-detail-description">
              {activeProject.description}
            </p>
            <div className="playground-detail-space" aria-hidden="true" />
            <dl className="playground-detail-meta">
              <div>
                <dt>Date</dt>
                <dd>{activeProject.date}</dd>
              </div>
              <div>
                <dt>Author</dt>
                <dd>{activeProject.author}</dd>
              </div>
              <div>
                <dt>Material</dt>
                <dd>{activeProject.material}</dd>
              </div>
            </dl>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
