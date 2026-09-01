'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';

type ProjectVideoProps = {
  src: string;
  title: string;
};

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function ProjectVideo({ src, title }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="project-video">
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        aria-label={`${title} project video`}
        onClick={togglePlayback}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          setDuration(video.duration);
          const previewTime = Number.isFinite(video.duration)
            ? Math.min(1, Math.max(0, video.duration - 0.05))
            : 1;
          video.currentTime = previewTime;
          setCurrentTime(previewTime);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="video-controls" aria-label={`${title} video controls`}>
        <button type="button" className="video-control" onClick={togglePlayback} aria-label={playing ? 'Pause video' : 'Play video'}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <input
          className="video-progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={Math.min(currentTime, duration || 0)}
          aria-label="Video progress"
          onChange={(event) => {
            const nextTime = Number(event.target.value);
            if (videoRef.current) videoRef.current.currentTime = nextTime;
            setCurrentTime(nextTime);
          }}
        />
        <span className="video-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
        <button type="button" className="video-control" onClick={toggleMute} aria-label={muted ? 'Unmute video' : 'Mute video'}>
          {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
