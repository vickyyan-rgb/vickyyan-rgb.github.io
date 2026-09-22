/* oxlint-disable next/no-img-element */
import Link from 'next/link';
import ProcessLoop from './ProcessLoop';
import ProjectVideo from './ProjectVideo';

type BlockSketchCaseStudyProps = {
  video: string;
};

const ASSET = '/projects/block-sketch-case-study';

const narrative = 'Block/sketch is a tactile exploration into the foundational processes of design. It proposes a bridge between the intuitive language of play and the expansive potential of digital imagination, using the human form as both a literal building block and a conceptual metaphor for community. Beginning with a collection of miniature, tiny “bodies” that can be joined, stacked, and merged by hand into a unique, composite shape. This act of physical assembly is a deliberate return to a primal, accessible form of creation. The resulting “sketch” is not drawn, but scanned into the 3d virtual space thought a self made 3D scanner, which provides the portal to endless possibilities sending through AI real time image generation, which is prompted to explore architectural possibilities inherent in the form. It is intentionally playful, designed to demystify the often-intimidating gateways of professional 3D modeling software. Here, design begins not with a blank screen and complex toolbars, but with the simple, satisfying click of connecting forms. The output is a series of speculative structures: buildings, pavilions, urban fragments that grow logically yet surprisingly from the initial, hand-held composition. The process creates a tangible loop: from body (the block) to collective body (the assembly) to digital body (the scan) to speculative body (the architecture).';

export default function BlockSketchCaseStudy({ video }: BlockSketchCaseStudyProps) {
  return (
    <div className="project-body sketch-room-case-study block-sketch-case-study">
      <section className="sketch-room-opening block-sketch-opening" aria-label="Block / Sketch opening">
        <figure>
          <img
            src={`${ASSET}/opening.jpg`}
            alt="Participant translating a hand-built form into a speculative digital structure"
          />
        </figure>
        <blockquote><p>{narrative}</p></blockquote>
      </section>

      <ProjectVideo src={video} title="Block / Sketch" autoPlay />

      <section className="block-sketch-section block-sketch-block" aria-labelledby="block-sketch-block-title">
        <h3 className="sketch-room-scroll-heading" id="block-sketch-block-title">Block</h3>
        <header>
          <p>The body becomes a unit of play, connection, and collective form-making.</p>
          <span>Small figures join through a simple vocabulary of pegs and openings, allowing each arrangement to emerge by hand.</span>
        </header>
        <div className="block-sketch-block-grid">
          <figure className="block-sketch-wide">
            <img src={`${ASSET}/blocks-overview.jpg`} alt="Collection of modular green body blocks and assembled forms" loading="lazy" />
            <figcaption>Individual bodies become a collective body</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/blocks-detail.jpg`} alt="Close view of one assembled modular block composition" loading="lazy" />
            <figcaption>A sketch assembled through touch</figcaption>
          </figure>
        </div>
      </section>

      <section className="block-sketch-section block-sketch-scanner" aria-labelledby="block-sketch-scanner-title">
        <h3 className="sketch-room-scroll-heading" id="block-sketch-scanner-title">Scanner</h3>
        <header className="block-sketch-scanner-intro">
          <figure className="block-sketch-motion-card">
            <ProcessLoop
              src={`${ASSET}/assembly.mp4`}
              poster={`${ASSET}/assembly-poster.jpg`}
              title="Block assembly animation"
            />
          </figure>
          <div className="block-sketch-scanner-intro-copy">
            <p>A self-made scanner carries the physical sketch into three-dimensional space.</p>
            <span>A rotating platform and traveling distance sensor collect the form layer by layer, rebuilding the hand-held object as a continuous point cloud.</span>
          </div>
        </header>
        <figure className="block-sketch-technical-drawing">
          <img src={`${ASSET}/scanner-exploded.png`} alt="Exploded technical drawing of the custom 3D scanner and its components" loading="lazy" />
          <figcaption>The modular system separates and reconnects</figcaption>
        </figure>
        <div className="block-sketch-build-grid">
          <figure className="block-sketch-build-card block-sketch-build-card--rotated">
            <div className="block-sketch-build-media">
              <img src={`${ASSET}/hardware-layout.jpg`} alt="Scanner hardware and fabricated parts laid out before assembly" loading="lazy" />
            </div>
            <figcaption>Fabricated parts and hardware</figcaption>
          </figure>
          <figure className="block-sketch-build-card">
            <div className="block-sketch-build-media">
              <img src={`${ASSET}/electronics.jpg`} alt="Custom control board with motor drivers" loading="lazy" />
            </div>
            <figcaption>Custom electronics and motion control</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/scanner-build.jpg`} alt="Hands assembling the custom scanner structure" loading="lazy" />
            <figcaption>Building and calibrating the scanner</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/scanner-closeup.jpg`} alt="Hands placing an assembled green form on the scanner turntable" loading="lazy" />
            <figcaption>The physical sketch enters the scan</figcaption>
          </figure>
        </div>
        <div className="block-sketch-video-grid">
          <figure>
            <ProcessLoop
              src={`${ASSET}/scanner-demo.mp4`}
              poster={`${ASSET}/scanner-demo-poster.jpg`}
              title="Scanner mechanism demonstration"
            />
            <figcaption>Incremental scanning in motion</figcaption>
          </figure>
          <figure>
            <ProcessLoop
              src={`${ASSET}/workbench-demo.mp4`}
              poster={`${ASSET}/workbench-demo-poster.jpg`}
              title="Workbench scanner test"
            />
            <figcaption>From rotating object to digital wireframe</figcaption>
          </figure>
        </div>
      </section>

      <section className="block-sketch-section block-sketch-logic" aria-labelledby="block-sketch-logic-title">
        <h3 className="sketch-room-scroll-heading" id="block-sketch-logic-title">Interaction Logic</h3>
        <header>
          <p>The project forms a continuous loop between hand, object, scan, gesture, and architectural image.</p>
          <span>Physical assembly establishes the form; scanning and gestural control make it spatial; AI opens it toward speculative architecture.</span>
        </header>
        <figure className="block-sketch-storyboard">
          <img src={`${ASSET}/storyboard.jpg`} alt="Hand-drawn interaction sequence for assembling, scanning, moving, and releasing a form" loading="lazy" />
          <figcaption>Operating sequence and gesture language</figcaption>
        </figure>
        <figure className="block-sketch-logic-diagram">
          <img src={`${ASSET}/logic-diagram.png`} alt="Logic diagram connecting building blocks, scanning, hand tracking, Krea AI, and pavilion simulation" loading="lazy" />
          <figcaption>Physical-to-digital design loop</figcaption>
        </figure>
      </section>

      <section className="block-sketch-section block-sketch-ai" aria-labelledby="block-sketch-ai-title">
        <h3 className="sketch-room-scroll-heading" id="block-sketch-ai-title">AI Translation</h3>
        <header>
          <p>The scanned body becomes a prompt for architectural imagination.</p>
          <span>The same composite form can be moved by gesture, read as a digital mass, and translated into buildings, pavilions, and urban fragments.</span>
        </header>
        <div className="block-sketch-ai-grid">
          <figure>
            <img src={`${ASSET}/physical-digital.jpg`} alt="A physical block composition held in front of its speculative architectural output" loading="lazy" />
            <figcaption>Physical form and architectural response</figcaption>
          </figure>
          <figure>
            <ProcessLoop
              src={`${ASSET}/ai-translation.mp4`}
              poster={`${ASSET}/ai-translation-poster.jpg`}
              title="AI architectural translation"
            />
            <figcaption>Real-time architectural possibilities through Krea AI</figcaption>
          </figure>
        </div>
      </section>

      <section className="block-sketch-section block-sketch-final" aria-labelledby="block-sketch-final-title">
        <h3 className="sketch-room-scroll-heading" id="block-sketch-final-title">Final Installation</h3>
        <header>
          <p>A tangible loop makes professional spatial tools feel immediate, social, and playful.</p>
          <span>Visitors move from building by hand to seeing their collective form inhabit an architectural world.</span>
        </header>
        <div className="block-sketch-final-grid">
          <figure className="block-sketch-final-hero">
            <img src={`${ASSET}/final-installation.jpg`} alt="Block / Sketch scanner and display installed in the exhibition" loading="lazy" />
            <figcaption>The complete installation</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/final-scanner.jpg`} alt="Completed scanner holding an assembled green block form" loading="lazy" />
            <figcaption>The custom scanner in use</figcaption>
          </figure>
          <figure>
            <img src={`${ASSET}/final-interaction.jpg`} alt="Participant gesturing toward an AI-generated architectural form" loading="lazy" />
            <figcaption>Gesture becomes spatial control</figcaption>
          </figure>
        </div>
      </section>

      <Link className="project-back" href="/base-photo?instant=1"><span>Back to interactive study</span></Link>
    </div>
  );
}
