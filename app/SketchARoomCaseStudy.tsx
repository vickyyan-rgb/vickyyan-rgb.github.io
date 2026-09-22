/* oxlint-disable next/no-img-element */
import Link from 'next/link';
import ProcessLoop from './ProcessLoop';
import ProjectVideo from './ProjectVideo';

type SketchARoomCaseStudyProps = {
  video: string;
};

const ASSET = '/projects/sketch-a-room';
const PROTOTYPE_ASSET = `${ASSET}/prototypes`;

const prototypes = [
  {
    slug: 'proto-1',
    title: 'Finding a block with the hand',
    description: 'An early study tested how a participant could call a shape into view without needing a controller or setup step.',
  },
  {
    slug: 'proto-2',
    title: 'Rotating the chosen form',
    description: 'Hand rotation became a direct way to inspect and orient a block before committing it to the room.',
  },
  {
    slug: 'proto-3',
    title: 'Holding to confirm',
    description: 'A short hold separates deliberate placement from incidental movement and makes the gesture legible to both person and system.',
  },
  {
    slug: 'proto-4',
    title: 'Dropping into the shared scene',
    description: 'The confirmed block enters the projected room with position and velocity shaped by the participant’s final gesture.',
  },
  {
    slug: 'proto-5',
    title: 'Moving furniture after placement',
    description: 'Touch interaction extends the gesture sequence, letting participants select and rearrange objects already inside the scene.',
  },
  {
    slug: 'interaction-201305',
    title: 'Connecting gesture and scene',
    description: 'The first extended interaction pass brought hand tracking, confirmation, placement, and projected feedback into one sequence.',
  },
  {
    slug: 'interaction-201641',
    title: 'Refining real-time control',
    description: 'Longer testing exposed where the interface needed clearer timing, steadier tracking, and more immediate visual response.',
  },
  {
    slug: 'interaction-202853',
    title: 'Building a room collectively',
    description: 'Multiple additions began to operate as a shared spatial sketch rather than isolated digital objects.',
  },
  {
    slug: 'interaction-231551',
    title: 'Translating the sketch through AI',
    description: 'The accumulated scene became structured input for an AI-generated interior, connecting tangible play to an imagined environment.',
  },
];

export default function SketchARoomCaseStudy({ video }: SketchARoomCaseStudyProps) {
  return (
    <div className="project-body sketch-room-case-study">
      <section className="sketch-room-opening" aria-label="Sketch-a-room opening">
        <figure>
          <img
            src={`${ASSET}/opening.jpg`}
            alt="Participant using hand gestures to arrange blocks in the Sketch-a-room installation"
          />
        </figure>
        <blockquote>
          <p>Sketch-a-room aims to visually represent the levels of community engagement through a dynamic, communal design. The project exists as a potential 3D world, where participants interact with a real-time, setup-less interior design visualization. People passing by the selected space are invited to contribute their own “block” to this collective digital space, where each blob is a customizable 3D block. Using a tangible user interface, users are invited to add, remove, or and move around these shapes depending on their preference, and create an reimagination of that interior space through AI image. This project allows for real-time prototyping and visualizations of interior design processes through a community collaborative format. This act of stopping to add a pre-designed block to the ever-growing collection reflects a greater social context: an individual’s specific contributions to their community. As more blocks are added, they begin to form the foundations of an actual, imagined space. This process empowers the community to collaboratively shape their environment. The installation becomes a living blueprint, fueled by collective imagination, immediate tangible interaction, and AI-driven design visualization.</p>
        </blockquote>
      </section>

      <ProjectVideo src={video} title="Sketch-a-room" autoPlay />

      <section className="sketch-room-context" aria-labelledby="sketch-room-context-title">
        <h3 className="sketch-room-scroll-heading" id="sketch-room-context-title">Site Context</h3>
        <header>
          <p>A room-sized interface invited people to sketch space together.</p>
          <span>Daniels Lecture Hall DA170</span>
        </header>
        <figure>
          <img
            src={`${ASSET}/site-context.jpg`}
            alt="Installation context in Daniels Lecture Hall DA170"
            loading="lazy"
          />
        </figure>
        <dl>
          <div><dt>Input</dt><dd>Hand movement and tangible block gestures</dd></div>
          <div><dt>Shared view</dt><dd>A live projected 3D interior</dd></div>
          <div><dt>Translation</dt><dd>AI turns the collective block arrangement into an imagined room</dd></div>
        </dl>
      </section>

      <section className="sketch-room-logic" aria-labelledby="sketch-room-logic-title">
        <h3 className="sketch-room-scroll-heading" id="sketch-room-logic-title">Design Logic</h3>
        <header>
          <p>Gesture, projection, touch, and AI form one continuous feedback loop.</p>
          <span>A participant can begin without instructions or equipment.</span>
        </header>
        <figure>
          <img
            src={`${ASSET}/logic-diagram-white.png`}
            alt="Logic diagram connecting hand tracking, block placement, touch interaction, and AI interior generation"
            loading="lazy"
          />
        </figure>
      </section>

      <section className="sketch-room-storyboard" aria-labelledby="sketch-room-storyboard-title">
        <h3 className="sketch-room-scroll-heading" id="sketch-room-storyboard-title">Interaction Storyboard</h3>
        <header>
          <p>One gesture becomes a block. Many blocks become a room.</p>
        </header>
        <figure>
          <img
            src={`${ASSET}/storyboard.jpg`}
            alt="Six-panel storyboard showing a participant selecting, placing, and revisiting blocks in an AI-generated room"
            loading="lazy"
          />
        </figure>
        <ol>
          <li><span>01</span><p>Approach the projection and enter the camera’s field.</p></li>
          <li><span>02</span><p>Rotate a hand to explore the available block shapes.</p></li>
          <li><span>03</span><p>Hold to confirm, then drop the chosen form into the scene.</p></li>
          <li><span>04</span><p>Watch the collective interior respond in real time.</p></li>
          <li><span>05</span><p>Translate the composition into an AI-imagined room.</p></li>
          <li><span>06</span><p>Return to move linked furniture and continue the shared sketch.</p></li>
        </ol>
      </section>

      <section className="sketch-room-prototypes" aria-labelledby="sketch-room-prototypes-title">
        <h3 className="sketch-room-scroll-heading" id="sketch-room-prototypes-title">Prototypes</h3>
        <header>
          <p>The interaction was tuned through small studies before becoming a continuous spatial conversation.</p>
        </header>
        <div className="sketch-room-prototype-grid">
          {prototypes.map((prototype, index) => (
            <figure key={prototype.slug}>
              <ProcessLoop
                src={`${PROTOTYPE_ASSET}/${prototype.slug}.mp4`}
                poster={`${PROTOTYPE_ASSET}/posters/${prototype.slug}.jpg`}
                title={prototype.title}
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{prototype.title}</h4>
                  <p>{prototype.description}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="sketch-room-final" aria-labelledby="sketch-room-final-title">
        <h3 className="sketch-room-scroll-heading" id="sketch-room-final-title">Final</h3>
        <header>
          <p>A shared sketch became an imagined room.</p>
          <span>The physical interface and generated interior hold two views of the same collective act.</span>
        </header>
        <figure className="sketch-room-instructions">
          <img
            src={`${ASSET}/interaction-instructions.jpg`}
            alt="Three hand gestures for changing a shape, moving it to a drop point, and releasing it"
            loading="lazy"
          />
          <figcaption>Gesture instructions for the installation</figcaption>
        </figure>
        <div className="sketch-room-final-grid">
          <figure>
            <img src={`${ASSET}/final-physical-1.jpg`} alt="Final Sketch-a-room tangible interface in use" loading="lazy" />
            <figcaption>Immediate tangible interaction</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/final-physical-2.jpg`} alt="Final Sketch-a-room installation and participant" loading="lazy" />
            <figcaption>A collective digital composition</figcaption>
          </figure>
          <figure className="sketch-room-final-ai">
            <img src={`${ASSET}/final-ai-room.png`} alt="Pastel AI-generated interior created from the shared block arrangement" loading="lazy" />
            <figcaption>AI-driven design visualization</figcaption>
          </figure>
        </div>
      </section>

      <Link className="project-back" href="/base-photo?instant=1"><span>Back to interactive study</span></Link>
    </div>
  );
}
