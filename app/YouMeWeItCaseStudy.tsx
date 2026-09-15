import CaseStudyRoadmap from './CaseStudyRoadmap';
import ProjectVideo from './ProjectVideo';
import ProcessLoop from './ProcessLoop';

type YouMeWeItCaseStudyProps = {
  video: string;
  cover: string;
  detail: string;
};

const CASE_ASSET = '/projects/you-me-case-study';
const PROCESS_ASSET = `${CASE_ASSET}/process`;
const FINAL_ASSET = `${CASE_ASSET}/final`;

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
    title: 'Second draft',
    slug: 'second-draft',
    description: 'A working TouchDesigner network routes four sensor channels into separate contours before recombining them as one responsive system.',
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

export default function YouMeWeItCaseStudy({ video, cover, detail }: YouMeWeItCaseStudyProps) {
  return (
    <div className="project-body you-me-case-study">
      <section className="case-study-opening" aria-label="You / Me / We / It opening">
        <div className="case-study-opening-image" role="img" aria-label="Luminous thermal circles from the You / Me / We / It installation" />
        <blockquote>
          <p>Our You / Me / We / It is sited within Café 059, a once-vital hub now silent. The installation aims to reactivate the space through inheriting their original subject matter, beverages as the input devise to translate into visualizations that reflects “social warmth”. Each circle breathes and distorts to the thermal rhythm of a participant&apos;s drink, directly translating temperature data into a fluid, visual form. Custom-made coasters with embedded sensors record the live temperature; as participants place their drinks, their individual thermal signature is added to the collective chorus. The installation invites participants to be curious and follow their circle, seeing its encounters and comparing to its Neighbours. The visuals sends messages: when two drinks share a temperature, their circles align and blend into a unified hue, forming a connective geometry. This dynamic visualization serves as a metaphor for the social “temperature” and distance of the Daniels social fabric, using the tangible residue of interaction to create a live, data-driven portrait of the space&apos;s lost vitality, literally projecting energy back into the empty room.</p>
        </blockquote>
      </section>

      <ProjectVideo src={video} title="You / Me / We / It" autoPlay />

      <header className="case-study-intro" id="case-study-aim">
        <h3>Technology pervades our lives, but when does it intercept us on a real social level?</h3>
        <CaseStudyRoadmap />
        <div className="case-study-intro-copy">
          <p>Café 059 at 1 Spadina once brought students, faculty, and staff into the same room. When it closed, the shared space remained—but its energy disappeared.</p>
          <dl>
            <div><dt>Question</dt><dd>How might technology reconnect people without demanding conversation?</dd></div>
            <div><dt>System</dt><dd>Four sensor coasters, Arduino, TouchDesigner, and live projection</dd></div>
            <div><dt>Team</dt><dd>Eunia (Zhihuan) Xu, Jack Simon, Satoshi Harimoto, and Vicky Yan</dd></div>
          </dl>
        </div>
      </header>

      <section className="case-study-chapter case-study-context">
        <div className="case-study-copy">
          <h4>A social hub shut down</h4>
          <p>Café 059 sits at the centre of the Daniels common area, where people across the university hierarchy once met as equals. Its closure left a focal point without the everyday rituals that made it feel alive.</p>
        </div>
        <figure><img src={`${CASE_ASSET}/site.jpg`} alt="The closed Café 059 at 1 Spadina" loading="lazy" /></figure>
      </section>

      <section className="case-study-chapter case-study-concept case-study-concept-text" id="case-study-design-logic">
        <div className="case-study-copy">
          <h4>Reveal something that is felt but not seen.</h4>
          <p>A custom coaster reads the temperature of a drink and translates it into a breathing projected circle. One drink creates an individual presence; several drinks create a collective field.</p>
          <p>When temperatures align, circles approach and blend. When they diverge, the visual forms hold their distance—making an invisible social condition visible.</p>
        </div>
      </section>

      <section className="case-study-journey">
        <header>
          <h4>From placing to feeling</h4>
        </header>
        <ol>
          <li>
            <figure><img src={`${CASE_ASSET}/placing.png`} alt="A hand placing a drink onto a coaster" loading="lazy" /></figure>
            <span>01</span><h5>Placing</h5>
            <p>A participant sets a drink on one of four custom coasters.</p>
          </li>
          <li>
            <figure><img src={`${CASE_ASSET}/sensing.png`} alt="Four sensor coasters arranged around a café table" loading="lazy" /></figure>
            <span>02</span><h5>Sensing</h5>
            <p>A DHT22 sensor reads the beverage temperature and sends it through Arduino.</p>
          </li>
          <li>
            <figure><img src={`${CASE_ASSET}/seeing-hot-cold.jpg`} alt="Two different thermal signatures shown together" loading="lazy" /></figure>
            <span>03</span><h5>Seeing</h5>
            <p>TouchDesigner maps each stream to the scale, movement, and distortion of a circle.</p>
          </li>
          <li>
            <figure><img src={`${CASE_ASSET}/feeling.jpg`} alt="People connected through a shared projected visualization" loading="lazy" /></figure>
            <span>04</span><h5>Feeling</h5>
            <p>Circles meet, overlap, and separate, inviting people to notice one another.</p>
          </li>
        </ol>
      </section>

      <section className="case-study-build" id="case-study-prototype">
        <div className="case-study-copy">
          <h4>Turning temperature into a reliable interaction.</h4>
          <p>Early prototypes linked four temperature inputs to light before the full projection system was built. Repeated tests stabilized the sensor readings, while custom coaster housings turned exposed electronics into a shared tabletop interface.</p>
          <p className="case-study-tools">Arduino · DHT22 · TouchDesigner · Projection · Digital fabrication</p>
        </div>
        <div className="case-study-build-grid">
          <figure className="case-study-build-wide"><img src={`${CASE_ASSET}/prototype.jpg`} alt="Early temperature and light prototype on a workbench" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/arduino-diagram.png`} alt="Arduino wiring diagram for four temperature sensors" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/sensor-hardware.jpg`} alt="Arduino and four physical sensor coasters" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/coaster-prototype-1.jpg`} alt="Disassembled circular coaster prototype" loading="lazy" /></figure>
          <figure><img src={`${CASE_ASSET}/coaster-prototype-2.jpg`} alt="Assembled circular coaster prototype" loading="lazy" /></figure>
        </div>
      </section>

      <section className="case-study-process-docs">
        <header className="case-study-process-header">
          <h4>The interaction was designed from the room inward.</h4>
          <p>Concept sketches moved from abstract ideas of collective light toward a site-specific café ritual. Technical drawings then coordinated the table, sensor reach, cable paths, electronics enclosure, and circular layers of each coaster.</p>
        </header>
        <div className="case-study-drawing-grid">
          <figure className="case-study-drawing-concept">
            <img src={`${PROCESS_ASSET}/concept-sketches.jpg`} alt="Early sketches connecting communal light, drink temperature, and Café 059" loading="lazy" />
            <figcaption><span>Concept direction</span><p>Participation shifted from a large communal gesture to the familiar act of setting down a drink.</p></figcaption>
          </figure>
          <figure>
            <img src={`${PROCESS_ASSET}/table-elevation.jpg`} alt="Elevation drawing of the café table, coasters, and electronics enclosure" loading="lazy" />
            <figcaption><span>Table elevation</span><p>The hardware sits at the centre while four coasters keep the interaction distributed and social.</p></figcaption>
          </figure>
          <figure>
            <img src={`${PROCESS_ASSET}/sensor-layout.jpg`} alt="Plan drawing showing four sensor stations connected to the central controller" loading="lazy" />
            <figcaption><span>Sensor layout</span><p>Four sensing points feed a single controller, creating one shared visual field from multiple individual inputs.</p></figcaption>
          </figure>
          <figure>
            <img src={`${PROCESS_ASSET}/table-assembly.jpg`} alt="Exploded drawing of the circular table and integrated electronics" loading="lazy" />
            <figcaption><span>Integrated assembly</span><p>Layered circular components conceal the electronics while preserving access for testing and repair.</p></figcaption>
          </figure>
          <figure className="case-study-circuit">
            <img src={`${PROCESS_ASSET}/arduino-tinkercad.png`} alt="Arduino Uno wired to four temperature sensors on a breadboard" loading="lazy" />
            <figcaption><span>Four-channel circuit</span><p>Each temperature sensor uses its own signal path while sharing power and ground, allowing simultaneous readings to drive the projection.</p></figcaption>
          </figure>
        </div>
      </section>

      <section className="case-study-motion-studies">
        <header className="case-study-process-header">
          <h4>Behaviour was tuned through small visual experiments.</h4>
          <p>Each study isolates a relationship between readings—contrast, similarity, overlap, or separation—before those rules are combined in the final projected system.</p>
        </header>
        <div className="case-study-motion-grid">
          {motionStudies.map((study, index) => (
            <figure className={index === 2 ? 'case-study-motion-wide' : ''} key={study.slug}>
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

      <section className="case-study-visual-system">
        <div className="case-study-copy">
          <h4>The visualization learned to breathe, gather, and respond.</h4>
          <p>Iterations moved from fixed paths to a fluid particle system. Each circle retained an individual rhythm while remaining responsive to the group, allowing similarity and distance to emerge through motion, scale, and colour.</p>
        </div>
        <figure className="case-study-visual-main"><img src={`${CASE_ASSET}/touchdesigner-final.jpg`} alt="Final TouchDesigner network and luminous thermal form" loading="lazy" /></figure>
        <div className="case-study-comparison">
          <figure><img src={`${CASE_ASSET}/seeing-hot-cold.jpg`} alt="A hot and a cold drink visualized together" loading="lazy" /><figcaption>Different temperatures / distinct paths</figcaption></figure>
          <figure><img src={`${CASE_ASSET}/seeing-both-hot.jpg`} alt="Two hot drinks visualized together" loading="lazy" /><figcaption>Similar temperatures / shared form</figcaption></figure>
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

      <section className="case-study-archive">
        <figure><img src={cover} alt="You / Me / We / It project overview" loading="lazy" /></figure>
        <figure><img src={detail} alt="You / Me / We / It complete process and interaction system" loading="lazy" /></figure>
      </section>

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
