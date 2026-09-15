import ProcessLoop from './ProcessLoop';
import ProjectVideo from './ProjectVideo';

type EmbodiedCognitionCaseStudyProps = {
  video: string;
};

const ASSET = '/projects/embodied-case-study';

const processStudies = [
  {
    slug: 'gesture-tracking',
    title: 'Teaching the system to see a gesture',
    description: 'An early hand-tracking test translated landmarks into a simple graphic response, establishing the link between a bodily action and a visible contribution.',
    portrait: true,
  },
  {
    slug: 'responsive-body',
    title: 'Giving each body a form',
    description: 'Live camera input became a field of coloured polygons. The study tested how a person could be recognized without turning the experience into a literal mirror.',
  },
  {
    slug: 'movement-mapping',
    title: 'Making motion accumulate',
    description: 'Walking, stopping, and changing direction moved the digital forms across the frame, shaping the behaviour that would later fill the shared projection.',
  },
];

export default function EmbodiedCognitionCaseStudy({ video }: EmbodiedCognitionCaseStudyProps) {
  return (
    <div className="project-body embodied-case-study">
      <ProjectVideo src={video} title="Embodied Cognition" autoPlay />

      <header className="embodied-intro">
        <p>Interactive installation / 2025</p>
        <h3>Presence becomes a material the room can remember.</h3>
        <div>
          <p>Embodied Cognition turns bodily movement into a communal field of responsive digital forms. Each visitor leaves a visible contribution; over time, isolated gestures gather into a portrait of collective participation.</p>
          <dl>
            <div><dt>Role</dt><dd>Interaction design, prototyping, creative coding</dd></div>
            <div><dt>System</dt><dd>Live camera tracking, projected graphics, spatial interaction</dd></div>
          </dl>
        </div>
      </header>

      <section className="embodied-process" aria-labelledby="embodied-process-title">
        <header>
          <span>Process / 01</span>
          <div>
            <h4 id="embodied-process-title">From a tracked body to a shared visual language.</h4>
            <p>The interaction was built through small, direct tests: first recognizing a gesture, then abstracting a body, and finally tuning how forms collect and respond to movement.</p>
          </div>
        </header>
        <div className="embodied-process-grid">
          {processStudies.map((study, index) => (
            <figure className={study.portrait ? 'embodied-process-portrait' : ''} key={study.slug}>
              <ProcessLoop
                src={`${ASSET}/process/${study.slug}.mp4`}
                poster={`${ASSET}/process/${study.slug}-poster.jpg`}
                title={study.title}
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h5>{study.title}</h5><p>{study.description}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="embodied-final" aria-labelledby="embodied-final-title">
        <header>
          <span>Final / 02</span>
          <div>
            <h4 id="embodied-final-title">The installation grew with every encounter.</h4>
            <p>In the finished space, luminous forms followed participants across a full-scale projection. Individual actions remained legible while becoming part of a larger, evolving community.</p>
          </div>
        </header>
        <figure className="embodied-final-hero">
          <img src={`${ASSET}/final/installation-hero.jpg`} alt="Embodied Cognition projected at full scale in a dark auditorium" loading="lazy" />
          <figcaption>Full-scale projection / Daniels Building atrium</figcaption>
        </figure>
        <div className="embodied-final-grid">
          <figure>
            <img src={`${ASSET}/final/live-interaction.jpg`} alt="Participant moving coloured forms across the projected installation" loading="lazy" />
            <figcaption>Movement becomes contribution</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/final/audience-encounter.jpg`} alt="A visitor encountering the responsive projection in the atrium" loading="lazy" />
            <figcaption>An invitation at the edge of the room</figcaption>
          </figure>
        </div>
        <figure className="embodied-final-detail">
          <img src={`${ASSET}/final/projected-community.jpg`} alt="Close view of luminous polygonal forms accumulating on the projection" loading="lazy" />
          <figcaption>Individual forms accumulating into a communal field</figcaption>
        </figure>
      </section>

      <a className="project-back" href="/base-photo?instant=1"><span>Back to interactive study</span></a>
    </div>
  );
}
