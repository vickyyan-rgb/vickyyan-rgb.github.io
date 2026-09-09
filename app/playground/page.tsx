import Link from 'next/link';
import ProjectVideo from '../ProjectVideo';

const films = [
  {
    number: '01',
    title: 'Traces of home final 3.mov',
    src: '/playground/traces-of-home-final-3.mp4',
  },
  {
    number: '02',
    title: 'Future Time-Giant Wheel Vicky Yan.mov',
    src: '/playground/future-time-giant-wheel-vicky-yan.mp4',
  },
];

export default function PlaygroundPage() {
  return (
    <main className="playground-page">
      <nav aria-label="Playground navigation">
        <Link href="/" className="nav-name">Vicky Yan</Link>
        <div><Link href="/">Back to portfolio</Link></div>
      </nav>
      <header className="playground-header">
        <p>Moving image / 2023–2025</p>
        <h1>Playground</h1>
      </header>
      <section className="film-grid" aria-label="Short films">
        {films.map((film) => (
          <article className="film-card" key={film.number}>
            <header>
              <span>{film.number} / 02</span>
              <h2>{film.title}</h2>
            </header>
            <ProjectVideo src={film.src} title={film.title} />
          </article>
        ))}
      </section>
    </main>
  );
}
