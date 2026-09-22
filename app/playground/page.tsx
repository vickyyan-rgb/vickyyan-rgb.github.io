import Link from 'next/link';
import PlaygroundGallery from './PlaygroundGallery';

export default function PlaygroundPage() {
  return (
    <main className="playground-page">
      <nav aria-label="Playground navigation">
        <Link href="/" className="nav-name">Vicky Yan</Link>
        <div><Link href="/">Back to portfolio</Link></div>
      </nav>
      <header className="playground-header">
        <p>Moving image + material studies / 2023–2025</p>
        <h1>Playground</h1>
      </header>
      <PlaygroundGallery />
    </main>
  );
}
