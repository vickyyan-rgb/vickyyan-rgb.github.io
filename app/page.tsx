import { ArrowDownRight, ArrowUpRight, Asterisk } from 'lucide-react';

const projects = [
  { n: '01', title: 'Field Notes', kind: 'Editorial platform', tone: 'project-coral' },
  { n: '02', title: 'Common Ground', kind: 'Community identity', tone: 'project-blue' },
  { n: '03', title: 'After Hours', kind: 'Culture & commerce', tone: 'project-lime' },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Avery Rowan, home">AR<span>®</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div>
        <a className="availability" href="mailto:hello@averyrowan.com"><i />Available for work</a>
      </nav>

      <section id="top" className="hero shell">
        <div className="eyebrow"><Asterisk size={18} /> Independent designer + developer</div>
        <h1>I MAKE DIGITAL<br />THINGS <em>FEEL</em><br />HUMAN.</h1>
        <div className="hero-foot">
          <p>Building expressive brands and thoughtful digital experiences from strategy to shipped product.</p>
          <a className="round-link" href="#work" aria-label="See selected work"><ArrowDownRight /></a>
        </div>
      </section>

      <section id="work" className="work shell">
        <header className="section-head"><span>Selected work</span><span>2023—2026</span></header>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project ${project.tone}`} key={project.n}>
              <div className="project-top"><span>{project.n}</span><ArrowUpRight /></div>
              <div className="project-mark" aria-hidden="true"><span>{project.title.slice(0, 1)}</span></div>
              <div className="project-copy"><h2>{project.title}</h2><p>{project.kind}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about shell">
        <p className="about-label">A little context</p>
        <p className="about-copy">I’m Avery, a multidisciplinary creative who believes the best work sits somewhere between <em>rigor</em> and <em>delight.</em></p>
        <div className="services"><span>Strategy</span><span>Identity</span><span>Digital</span><span>Creative code</span></div>
      </section>

      <footer id="contact" className="footer shell">
        <p>Have something good in mind?</p>
        <a href="mailto:hello@averyrowan.com">LET’S MAKE IT.</a>
        <div className="footer-bottom"><span>© 2026 Avery Rowan</span><span>Los Angeles ↔ Anywhere</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
