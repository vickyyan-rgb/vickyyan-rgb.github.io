'use client';

import { useEffect, useRef } from 'react';

type PointerSample = { x: number; y: number; time: number };

export function useDynamicReveal() {
  const veilRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef<PointerSample | null>(null);
  const radius = useRef(215);
  const stillTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (stillTimer.current !== null) window.clearTimeout(stillTimer.current);
  }, []);

  const limits = () => window.innerWidth <= 700
    ? { resting: 145, maximum: 300 }
    : { resting: 215, maximum: 450 };

  const setRadius = (value: number) => {
    radius.current = value;
    veilRef.current?.style.setProperty('--reveal-size', `${Math.round(value)}px`);
  };

  const reveal = (x: number, y: number) => {
    const veil = veilRef.current;
    if (!veil) return;

    const now = performance.now();
    const previous = lastPointer.current;
    const { resting, maximum } = limits();
    let target = resting;

    if (previous) {
      const distance = Math.hypot(x - previous.x, y - previous.y);
      const elapsed = Math.max(8, now - previous.time);
      const speed = distance / elapsed;
      const velocity = Math.min(speed / 2.2, 1);
      target = resting + (maximum - resting) * velocity;
    }

    const smoothed = radius.current * 0.52 + target * 0.48;
    setRadius(smoothed);
    veil.style.setProperty('--x', `${x}px`);
    veil.style.setProperty('--y', `${y}px`);
    lastPointer.current = { x, y, time: now };

    if (stillTimer.current !== null) window.clearTimeout(stillTimer.current);
    stillTimer.current = window.setTimeout(() => {
      setRadius(resting);
      lastPointer.current = null;
    }, 120);
  };

  const hideReveal = () => {
    if (stillTimer.current !== null) window.clearTimeout(stillTimer.current);
    lastPointer.current = null;
    const { resting } = limits();
    setRadius(resting);
    veilRef.current?.style.setProperty('--x', '-500px');
    veilRef.current?.style.setProperty('--y', '-500px');
  };

  return { veilRef, reveal, hideReveal };
}
