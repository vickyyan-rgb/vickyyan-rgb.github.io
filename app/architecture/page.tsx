import Image from 'next/image';
import Link from 'next/link';

const architectureProjects = [
  {
    number: '01',
    slug: 'battery-park',
    title: 'Battery Park',
    subtitle: 'Reclaiming shorelines: from Dutch fort to sturgeon sanctuary',
    pages: ['03', '04', '05', '06', '07'],
  },
  {
    number: '02',
    slug: 'athletic-centre',
    title: 'Athletic Centre',
    subtitle: 'A inside job: weaving program and circulation in a Brutalist frame',
    pages: ['08', '09', '10', '11', '12'],
  },
  {
    number: '03',
    slug: 'schrodingers',
    title: "Schrödinger's",
    subtitle: 'Architecture held between two simultaneous spatial states',
    pages: ['13', '14', '15', '16'],
  },
  {
    number: '04',
    slug: 'dexamenoi-square',
    title: 'Dexamenoi Square',
    subtitle: 'Summer studio in Athens: inserting a water layer',
    pages: ['17', '18', '19'],
  },
];

export default function ArchitecturePage() {
  return (
    <main className="architecture-page">
      <nav className="architecture-nav" aria-label="Architecture navigation">
        <Link href="/" className="nav-name">Vicky Yan</Link>
        <div><Link href="/">Back to portfolio</Link></div>
      </nav>

      <header className="architecture-hero">
        <p>Selected work / 2024–2025</p>
        <h1>Architecture</h1>
        <span>Four studies in landscape, reuse, circulation, and public space.</span>
      </header>

      <nav className="architecture-index" aria-label="Architecture projects">
        {architectureProjects.map((project) => (
          <a href={`#${project.slug}`} key={project.slug}>
            <strong>{project.title}</strong>
          </a>
        ))}
      </nav>

      <div className="architecture-projects">
        {architectureProjects.map((project) => (
          <section className="architecture-project" id={project.slug} key={project.slug}>
            <header>
              <span>{project.number} / 04</span>
              <h2>{project.title}</h2>
              <p>{project.subtitle}</p>
            </header>
            <div className="architecture-spreads">
              {project.pages.map((page, index) => (
                <figure key={page}>
                  <Image
                    src={`/architecture/spread-${page}.jpg`}
                    alt={`${project.title} portfolio spread ${index + 1}`}
                    width={1600}
                    height={900}
                    unoptimized
                    loading={project.number === '01' && index === 0 ? 'eager' : 'lazy'}
                  />
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Link className="architecture-back" href="/">
        Back to portfolio
      </Link>
    </main>
  );
}
