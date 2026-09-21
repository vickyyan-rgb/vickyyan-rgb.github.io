'use client';

import { useEffect, useRef, useState } from 'react';

type ProcessLoopProps = {
  src: string;
  poster: string;
  title: string;
};

export default function ProcessLoop({ src, poster, title }: ProcessLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.35 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <button
      className="case-study-loop"
      type="button"
      onClick={togglePlayback}
      aria-label={`${playing ? 'Pause' : 'Play'} ${title} motion study`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span aria-hidden="true">{playing ? 'Pause' : 'Play'}</span>
    </button>
  );
}
