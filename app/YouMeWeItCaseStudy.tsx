import CaseStudyRoadmap from './CaseStudyRoadmap';
import ProjectVideo from './ProjectVideo';
import ProcessLoop from './ProcessLoop';

type YouMeWeItCaseStudyProps = {
  video: string;
};

const CASE_ASSET = '/projects/you-me-case-study';
const PROCESS_ASSET = `${CASE_ASSET}/process`;
const FINAL_ASSET = `${CASE_ASSET}/final`;
const FABRICATION_ASSET = `${CASE_ASSET}/fabrication`;

const motionStudies = [
  {
    title: 'Hot and cold',
    slug: 'hot-and-cold',
    description: 'Contrasting readings hold two distinct contours inside the same field, keeping difference visible without breaking the shared composition.',
  },
  {
    title: 'Together',
    slug: 'together',
    description: 'Closely aligned inputs settle into a single surrounding envelope, translating similarity into visual proximity.',
  },
  {
    title: 'Both hot',
    slug: 'both-hot',
    description: 'Two warm readings generate nested, expanding bodies that move with related rhythms while remaining individually legible.',
  },
  {
    title: 'Different',
    slug: 'different',
    description: 'Mixed temperatures produce offset rings, allowing difference and coexistence to appear at the same time.',
  },
];

const digitalIterations = [
  { title: 'Digital iteration — September 30', src: `${CASE_ASSET}/digital-iterations/recording-2025-09-30.mp4` },
  { title: 'First draft', src: `${CASE_ASSET}/digital-iterations/first-draft.mp4` },
  { title: 'Second draft', src: `${CASE_ASSET}/digital-iterations/second-draft.mp4` },
  { title: 'Digital iteration — October 1', src: `${CASE_ASSET}/digital-iterations/recording-2025-10-01.mp4` },
];

export default function YouMeWeItCaseStudy({ video }: YouMeWeItCaseStudyProps) {
  return (
    <div className="project-body you-me-case-study">
      <section className="case-study-opening" aria-label="You / Me / We / It opening">
        <div className="case-study-opening-image" role="img" aria-label="Luminous thermal circles from the You / Me / We / It installation" />
        <blockquote>
          <p>Our You / Me / We / It is sited within Café 059, a once-vital hub now silent. The installation aims to reactivate the space through inheriting their original subject matter, beverages as the input devise to translate into visualizations that reflects “social warmth”. The installation invites participants to be curious and follow their circle, seeing its encounters and comparing to its Neighbours. The visuals sends messages: when two drinks share a temperature, their circles align and blend into a unified hue, forming a connective geometry. This dynamic visualization serves as a metaphor for the social “temperature” and distance of the Daniels social fabric, using the tangible residue of interaction to create a live, data-driven portrait of the space&apos;s lost vitality, literally projecting energy back into the empty room.</p>
        </blockquote>
      </section>

      <ProjectVideo src={video} title="You / Me / We / It" autoPlay />

      <section className="case-study-scope" id="case-study-aim">
        <h3 className="case-study-scroll-heading">Scope</h3>
        <div className="case-study-scope-panel">
          <header>
            <p>Technology pervades our lives, but when does it intercept us on a real social level?</p>
            <CaseStudyRoadmap />
          </header>
          <div className="case-study-scope-grid">
            <figure className="case-study-scope-sketch">
              <img src={`${CASE_ASSET}/scope-installation-sketch-v2.png`} alt="Hand-drawn proposal for the projected café installation" loading="lazy" />
            </figure>
            <dl className="case-study-scope-meta">
              <div className="case-study-scope-relevance">
                <dt>Relevance</dt>
                <dd>How can we expand on affordances in the social-architectural domain?</dd>
              </div>
              <div>
                <dt>System</dt>
                <dd>Four sensor coasters, Arduino, TouchDesigner, and live projection</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>Eunia (Zhihuan) Xu, Jack Simon, Satoshi Harimoto, and Vicky Yan</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="case-study-problem">
        <header>
          <h4>A Problem: Social hub shut down</h4>
          <p>In June 2025, Café 059 shut down. The café was an important part of the Daniels faculty&apos;s social fabric, sitting at the centre of the Daniels common area. Its presence once brought students, faculty, and staff into the same room, where university hierarchy met as equals. Its closure left a focal point without the engagement that made the space feel alive.</p>
        </header>
        <figure className="case-study-problem-photo">
          <img src={`${CASE_ASSET}/site.jpg`} alt="The closed Café 059 at 1 Spadina" loading="lazy" />
        </figure>
        <div className="case-study-problem-concept">
          <figure>
            <img src={`${CASE_ASSET}/scope-social-distance-v2.png`} alt="Diagram connecting tangible design, user experience, Café 059, and the Daniels social fabric" loading="lazy" />
          </figure>
          <p>The installation uses tangible design to manifest a conversation between space and interpersonal social distance.</p>
        </div>
      </section>

      <section className="case-study-manifesto">
        <h4>Reveal something that is felt but not seen.</h4>
        <div>
          <p>Drawing on the café&apos;s defining element, beverages became the main character in our design. Each drink has a temperature; a coaster reads that temperature and translates it into a spatial experience that connects, curates, and communicates the individual&apos;s relationship to the environment and to others.</p>
          <p>One drink creates an individual presence, while several drinks form a collective field.</p>
        </div>
      </section>

      <section className="case-study-design-logic" id="case-study-design-logic">
        <h4 className="case-study-scroll-heading">Design Logic</h4>
        <figure className="case-study-logic-diagram">
          <img src={`${PROCESS_ASSET}/design-logic-v2.png`} alt="Storyboard tracing drink temperature into a shared projected social experience" loading="lazy" />
        </figure>
        <h5>From placing to feeling</h5>
        <ol>
          <li className="case-study-reveal-card" tabIndex={0}>
            <figure><img src={`${CASE_ASSET}/placing.png`} alt="A hand placing a drink onto a coaster" loading="lazy" /></figure>
            <div><span>I</span><h6>Placing</h6><p>A participant sets a drink on one of four custom coasters.</p></div>
          </li>
          <li className="case-study-reveal-card" tabIndex={0}>
            <figure><img src={`${CASE_ASSET}/sensing.png`} alt="Four sensor coasters arranged around a café table" loading="lazy" /></figure>
            <div><span>II</span><h6>Sensing</h6><p>A DHT22 sensor reads the beverage temperature and sends it through Arduino.</p></div>
          </li>
          <li className="case-study-reveal-card" tabIndex={0}>
            <figure><img src={`${CASE_ASSET}/thermal-signature.jpg`} alt="A thermal reading translated into a luminous visual signature" loading="lazy" /></figure>
            <div><span>III</span><h6>Seeing</h6><p>TouchDesigner maps each stream to the scale, movement, and distortion of a circle.</p></div>
          </li>
          <li className="case-study-reveal-card" tabIndex={0}>
            <figure><img src={`${CASE_ASSET}/feeling.jpg`} alt="People connected through a shared projected visualization" loading="lazy" /></figure>
            <div><span>IV</span><h6>Feeling</h6><p>Circles meet, overlap, and separate, inviting people to notice one another.</p></div>
          </li>
        </ol>
      </section>

      <section className="case-study-motion-studies">
        <header className="case-study-process-header">
          <h4>You are a line, but which line?</h4>
          <p>Each circle breathes and distorts to the thermal rhythm of a participant&apos;s drink, directly translating temperature data into a fluid, visual form.</p>
        </header>
        <div className="case-study-motion-grid">
          {motionStudies.map((study, index) => (
            <figure key={study.slug}>
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

      <section className="case-study-prototypes" aria-labelledby="case-study-prototypes-title">
        <h3 className="case-study-scroll-heading" id="case-study-prototypes-title">Prototypes</h3>
      </section>

      <section className="case-study-build" id="case-study-prototype">
        <div className="case-study-copy">
          <h4>Technical Application</h4>
          <p>Early prototypes linked four temperature inputs to light before the full projection system was built. Repeated tests stabilized the sensor readings, while custom coaster housings turned exposed electronics into a shared tabletop interface.</p>
          <p className="case-study-tools">Arduino · DHT22 · TouchDesigner · Projection · Digital fabrication</p>
        </div>
        <div className="case-study-fabrication-media">
          <figure><img src={`${CASE_ASSET}/prototype.jpg`} alt="Early temperature and light prototype on a workbench" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/sensor-hardware.jpg`} alt="Arduino and four physical sensor coasters" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/arduino-diagram.png`} alt="Arduino wiring diagram for four temperature sensors" loading="lazy" /></figure>
          <ProjectVideo src={`${CASE_ASSET}/fabrication-demonstration.mp4`} title="Physical fabrication demonstration" autoPlay />
        </div>
      </section>

      <section className="case-study-digital-iterations" aria-labelledby="digital-iterations-title">
        <header>
          <h4 id="digital-iterations-title">Digital Iterations</h4>
        </header>
        <div className="case-study-digital-media">
          {digitalIterations.map((iteration) => (
            <ProjectVideo key={iteration.src} src={iteration.src} title={iteration.title} autoPlay />
          ))}
        </div>
      </section>

      <section className="case-study-fabrication-chapter" aria-labelledby="case-study-fabrication-title">
        <header className="case-study-fabrication-header">
          <h4 id="case-study-fabrication-title">Fabrication</h4>
          <p>The system moved from loose electronics into a physical tabletop assembly. Full-scale prototypes coordinated the sensor coasters, wiring, central controller, and tea display as one portable interaction.</p>
        </header>

        <div className="case-study-fabrication-gallery">
          <figure className="case-study-fabrication-hero">
            <img src={`${FABRICATION_ASSET}/fabrication-hero.jpg`} alt="Rear view of the assembled tea display, sensor coasters, Arduino, and breadboard" loading="lazy" />
          </figure>
          <figure><img src={`${FABRICATION_ASSET}/fabrication-front.jpg`} alt="Front view of the fabricated tea display and three sensor coasters" loading="lazy" /></figure>
          <figure><img src={`${FABRICATION_ASSET}/fabrication-angle.jpg`} alt="Angled view of the slotted tea display prototype" loading="lazy" /></figure>
          <figure><img src={`${FABRICATION_ASSET}/fabrication-profile.jpg`} alt="Profile view showing the folded structure and tea compartments" loading="lazy" /></figure>
          <figure><img src={`${FABRICATION_ASSET}/fabrication-rear.jpg`} alt="Rear three-quarter view of the layered cardboard assembly" loading="lazy" /></figure>
        </div>

        <section className="case-study-material-study" aria-labelledby="case-study-material-title">
          <header>
            <span>Material Testing</span>
            <h5 id="case-study-material-title">Plywood + aluminum foil versus acrylic</h5>
            <p>Two coaster constructions tested how the sensor could meet the drink while keeping the electronics protected, repeatable, and visually quiet.</p>
          </header>
          <div className="case-study-material-comparison">
            <article>
              <div className="case-study-material-copy">
                <span>01</span>
                <h6>Plywood + Aluminum Foil</h6>
                <p>Layered plywood formed a rigid circular frame, while aluminum foil created a broad contact surface above the sensor. The open construction made the material and assembly logic easy to inspect and revise.</p>
              </div>
              <div className="case-study-material-images">
                <figure><img src={`${FABRICATION_ASSET}/plywood-foil-assembled.jpg`} alt="Assembled plywood coaster with an aluminum foil sensing surface" loading="lazy" /></figure>
                <figure><img src={`${FABRICATION_ASSET}/plywood-foil-open.jpg`} alt="Plywood coaster opened to reveal its aluminum foil layer" loading="lazy" /></figure>
                <figure><img src={`${FABRICATION_ASSET}/plywood-foil-components.jpg`} alt="Separated plywood rings, base, and aluminum foil sensing component" loading="lazy" /></figure>
              </div>
            </article>
            <article>
              <div className="case-study-material-copy">
                <span>02</span>
                <h6>Acrylic</h6>
                <p>Laser-cut acrylic produced a thinner, repeatable housing around the sensor. The translucent layered body concealed the assembly more softly and gave the coaster a lighter presence beside the projection.</p>
              </div>
              <div className="case-study-material-images">
                <figure><img src={`${FABRICATION_ASSET}/acrylic-installation.jpg`} alt="Acrylic sensor coaster connected to the tea display" loading="lazy" /></figure>
                <figure><img src={`${FABRICATION_ASSET}/acrylic-sensor-test.jpg`} alt="Temperature sensor fitted into a circular acrylic coaster" loading="lazy" /></figure>
                <figure><img src={`${FABRICATION_ASSET}/acrylic-laser-test.jpg`} alt="Acrylic coaster components tested on a laser cutter bed" loading="lazy" /></figure>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section className="case-study-process-docs">
        <header className="case-study-process-header">
          <h4>The interaction was designed from the room inward.</h4>
          <p>Concept sketches moved from abstract ideas of collective light toward a site-specific café ritual. Technical drawings then coordinated the table, sensor reach, cable paths, electronics enclosure, and circular layers of each coaster.</p>
        </header>
        <div className="case-study-drawing-grid">
          <figure>
            <div className="case-study-drawing-crop case-study-drawing-crop--elevation">
              <img src={`${PROCESS_ASSET}/table-elevation.jpg`} alt="Elevation drawing of the café table, coasters, and electronics enclosure" loading="lazy" />
            </div>
            <figcaption><span>Table elevation</span><p>The hardware sits at the centre while four coasters keep the interaction distributed and social.</p></figcaption>
          </figure>
          <figure>
            <div className="case-study-drawing-crop case-study-drawing-crop--sensor">
              <img src={`${PROCESS_ASSET}/sensor-layout.jpg`} alt="Plan drawing showing four sensor stations connected to the central controller" loading="lazy" />
            </div>
            <figcaption><span>Sensor layout</span><p>Four sensing points feed a single controller, creating one shared visual field from multiple individual inputs.</p></figcaption>
          </figure>
          <figure>
            <div className="case-study-drawing-crop case-study-drawing-crop--assembly">
              <img src={`${PROCESS_ASSET}/table-assembly.jpg`} alt="Exploded drawing of the circular table and integrated electronics" loading="lazy" />
            </div>
            <figcaption><span>Integrated assembly</span><p>Layered circular components conceal the electronics while preserving access for testing and repair.</p></figcaption>
          </figure>
          <figure className="case-study-circuit">
            <div className="case-study-drawing-crop case-study-drawing-crop--circuit">
              <img src={`${PROCESS_ASSET}/arduino-tinkercad.png`} alt="Arduino Uno wired to four temperature sensors on a breadboard" loading="lazy" />
            </div>
            <figcaption><span>Four-channel circuit</span><p>Each temperature sensor uses its own signal path while sharing power and ground, allowing simultaneous readings to drive the projection.</p></figcaption>
          </figure>
        </div>
      </section>

      <section className="case-study-visual-system">
        <div className="case-study-copy">
          <h4>The visualization learned to breathe, gather, and respond.</h4>
          <p>Iterations moved from fixed paths to a fluid particle system. Each circle retained an individual rhythm while remaining responsive to the group, allowing similarity and distance to emerge through motion, scale, and colour.</p>
        </div>
      </section>

      <section className="case-study-outcome" id="case-study-installation">
        <header>
          <h4>A shared table became a stage for noticing each other.</h4>
          <p>The final installation invited people to place a drink, find their circle, and follow its encounters. An ordinary café ritual became a live, collective image—projecting energy back into an otherwise quiet room.</p>
        </header>
        <div className="case-study-installation-grid">
          <figure><img src={`${CASE_ASSET}/installation-screen.jpg`} alt="Installation screen, electronics enclosure, and four coasters" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/installation-table.jpg`} alt="Four coasters connected around the installation table" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/installation-overview.jpg`} alt="A drink placed beside the installation electronics" loading="lazy" /></figure>
        </div>
      </section>

      <blockquote className="case-study-reflection" id="case-study-outlook">
        <p>Technology became less of a screen to operate and more of a material for noticing one another.</p>
      </blockquote>

      <section className="case-study-final-gallery">
        <header className="case-study-process-header">
          <h4>Four drinks, one shared field.</h4>
          <p>The finished installation brings the sensing coasters, central electronics, and live projection together at Café 059. Individual temperatures remain visible while gathering into a collective image of the table.</p>
        </header>
        <figure className="case-study-final-hero">
          <img src={`${FINAL_ASSET}/projection-detail.jpg`} alt="Close view of the finished luminous temperature visualization" loading="lazy" />
          <figcaption>Live projection / thermal signatures meeting in one field</figcaption>
        </figure>
        <div className="case-study-final-grid">
          <figure className="case-study-final-overhead">
            <img src={`${FINAL_ASSET}/table-overhead.jpg`} alt="Overhead view of four sensor coasters connected to the central electronics enclosure" loading="lazy" />
            <figcaption>Complete tabletop system</figcaption>
          </figure>
          <figure className="case-study-final-detail">
            <img src={`${FINAL_ASSET}/coaster-detail.jpg`} alt="Black mug resting on a finished white sensor coaster in front of the projection" loading="lazy" />
            <figcaption>Temperature-sensing coaster</figcaption>
          </figure>
          <figure className="case-study-final-context">
            <img src={`${FINAL_ASSET}/cafe-installation.jpg`} alt="The final interactive table and projection installed in Café 059" loading="lazy" />
            <figcaption>Installed at Café 059</figcaption>
          </figure>
        </div>
      </section>

      <a className="project-back" href="/base-photo?instant=1"><span>Back to interactive study</span></a>
    </div>
  );
}
