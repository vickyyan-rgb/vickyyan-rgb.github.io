import ProcessLoop from './ProcessLoop';
import ProjectVideo from './ProjectVideo';

type EmbodiedCognitionCaseStudyProps = {
  video: string;
};

const ASSET = '/projects/embodied-case-study';
const PROCESS_ASSET = `${ASSET}/process`;
const FINAL_ASSET = `${ASSET}/final`;

const processStudies = [
  {
    slug: 'blob-pulse',
    title: 'Giving the blob a pulse',
    description: 'The earliest digital study established a luminous body that could feel alive before it ever entered the communal field.',
  },
  {
    slug: 'hand-prototype',
    title: 'Teaching the system to read a hand',
    description: 'A first hand-tracking prototype tested whether a bodily gesture could become a direct way to shape and colour a digital form.',
    portrait: true,
  },
  {
    slug: 'tracking-test',
    title: 'Placing bodies inside the field',
    description: 'Camera input became the bridge between physical movement and the projected community, allowing forms to respond to a person in real time.',
  },
  {
    slug: 'tracking-contribution',
    title: 'Releasing an individual contribution',
    description: 'Holding a gesture long enough released a customized blob into the shared field, turning a brief action into a persistent trace.',
  },
  {
    slug: 'body-tracking-collision',
    title: 'Making non-participation consequential',
    description: 'The collision study gave passing bodies weight: moving through the space disturbs nearby blobs even when a visitor does not intentionally contribute.',
  },
  {
    slug: 'body-tracking-boundary',
    title: 'Keeping the community in motion',
    description: 'Boundary and repulsion rules keep every contribution inside the projected world while allowing the collective arrangement to continually reorganize.',
  },
];

const interactionSteps = [
  {
    title: 'Arrive',
    image: `${PROCESS_ASSET}/body-tracking-boundary-poster.jpg`,
    description: 'A camera recognizes a participant entering the shared space.',
  },
  {
    title: 'Mold',
    image: `${PROCESS_ASSET}/hand-prototype-poster.jpg`,
    description: 'Hand movement shapes the blob while opening and closing gestures change its colour.',
  },
  {
    title: 'Contribute',
    image: `${PROCESS_ASSET}/tracking-contribution-poster.jpg`,
    description: 'Holding the shape for five seconds releases it into the existing collection.',
  },
  {
    title: 'Encounter',
    image: `${PROCESS_ASSET}/tracking-test-poster.jpg`,
    description: 'A passing body collides with the field, disturbing nearby blobs whether or not the person stops.',
  },
  {
    title: 'Accumulate',
    image: `${PROCESS_ASSET}/blob-pulse-poster.jpg`,
    description: 'Every contribution remains, making the richness of the field a record of communal engagement.',
  },
];

export default function EmbodiedCognitionCaseStudy({ video }: EmbodiedCognitionCaseStudyProps) {
  return (
    <div className="project-body embodied-case-study">
      <section className="embodied-opening" aria-label="Embodied Cognition opening">
        <figure>
          <img src={`${FINAL_ASSET}/opening-installation.jpg`} alt="Participant shaping luminous communal blobs across a full-scale projection" />
        </figure>
        <blockquote>
          <p>The installation aims to visually represent the levels of community engagement through its existence as an communal design. People passing the selected space are invited to contribute their own “blob” to the bigger communal pool of “blobs”. This blob is an interactive moldable clay that could be fully customisable in shape and color depending on the participant’s interest. The act of Individuals stopping by to add upon the pre-existing collection reflects a greater social context of: an individual’s specific contributions to its community. Through time, the quantity of blobs accumulates like a coin jar, where the more blobs the richer community engagement is. When a low interest individual walks by, their ignorance intent will cause a disruption to the blobs, making them become ecstatic. This illustrates that even a lack of engagement has a powerful consequence, reminding us that our presence, whether careful or careless, always affects the whole.</p>
        </blockquote>
      </section>

      <ProjectVideo src={video} title="Embodied Cognition" autoPlay />

      <section className="embodied-scope">
        <h3 className="embodied-scroll-heading">Scope</h3>
        <div className="embodied-scope-panel">
          <header>
            <p>How can a shared space register not only deliberate contribution, but the consequences of simply passing through?</p>
          </header>
          <div className="embodied-scope-grid">
            <figure>
              <img src={`${ASSET}/interaction-storyboard.png`} alt="Original storyboard showing how a participant makes a blob and how the projected community responds" loading="lazy" />
            </figure>
            <dl>
              <div><dt>Relevance</dt><dd>Making individual agency and collective engagement visible within one communal environment.</dd></div>
              <div><dt>System</dt><dd>Camera tracking, hand gestures, body collision, p5.js, and full-scale projection.</dd></div>
              <div><dt>Interaction</dt><dd>Shape, release, encounter, disturb, and accumulate.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="embodied-manifesto">
        <h4>Presence becomes a material the room can remember.</h4>
        <p>Each participant can leave an intentional form behind. Each passerby can unsettle what is already there. Together, those careful and careless encounters create a living measure of communal participation.</p>
      </section>

      <section className="embodied-design-logic">
        <h4 className="embodied-scroll-heading">Design Logic</h4>
        <figure className="embodied-logic-diagram">
          <img src={`${ASSET}/logic-diagram.jpg`} alt="Logic diagram connecting hand tracking, body tracking, blob physics, and frame boundaries" loading="lazy" />
        </figure>
        <h5>From presence to a shared field</h5>
        <ol>
          {interactionSteps.map((step, index) => (
            <li className="embodied-reveal-card" tabIndex={0} key={step.title}>
              <figure><img src={step.image} alt="" loading="lazy" /></figure>
              <div><span>{String(index + 1).padStart(2, '0')}</span><h6>{step.title}</h6><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="embodied-process" aria-labelledby="embodied-process-title">
        <h3 className="embodied-scroll-heading">Process</h3>
        <header>
          <div>
            <h4 id="embodied-process-title">The system learned to see, remember, and react.</h4>
            <p>Small studies isolated the visual body, hand controls, camera relationship, collision behaviour, and frame boundaries before the parts were joined inside the installation.</p>
          </div>
        </header>
        <div className="embodied-process-grid">
          {processStudies.map((study, index) => (
            <figure className={study.portrait ? 'embodied-process-portrait' : ''} key={study.slug}>
              <ProcessLoop
                src={`${PROCESS_ASSET}/${study.slug}.mp4`}
                poster={`${PROCESS_ASSET}/${study.slug}-poster.jpg`}
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
        <h3 className="embodied-scroll-heading">Final</h3>
        <header>
          <div>
            <h4 id="embodied-final-title">The installation grew with every encounter.</h4>
            <p>Luminous forms accumulated across a full-scale projection. Intentional gestures remained visible as individual contributions, while bodies moving through the room kept the community in motion.</p>
          </div>
        </header>
        <figure className="embodied-final-hero">
          <img src={`${FINAL_ASSET}/final-field.jpg`} alt="Embodied Cognition projected across a dark auditorium" loading="lazy" />
          <figcaption>Collective field / full-scale projection</figcaption>
        </figure>
        <div className="embodied-final-grid">
          <figure>
            <img src={`${FINAL_ASSET}/audience-interaction.jpg`} alt="Participant encountering the responsive projection from the edge of the room" loading="lazy" />
            <figcaption>Presence changes the field</figcaption>
          </figure>
          <figure>
            <img src={`${FINAL_ASSET}/blob-community.jpg`} alt="Colourful digital blobs accumulating and moving across the projection" loading="lazy" />
            <figcaption>Individual forms become a community</figcaption>
          </figure>
        </div>
      </section>

      <a className="project-back" href="/base-photo?instant=1"><span>Back to interactive study</span></a>
    </div>
  );
}
