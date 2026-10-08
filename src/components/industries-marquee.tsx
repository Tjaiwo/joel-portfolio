"use client";

import { useEffect, useRef } from "react";

const INDUSTRIES = [
  "Aviation",
  "Industrial",
  "Media",
  "E-Commerce",
  "Architecture",
  "Photography",
  "Real Estate",
  "Energy",
  "Mining",
  "Construction",
  "Luxury Goods",
  "Corporate",
];

export function IndustriesMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...INDUSTRIES, ...INDUSTRIES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // We translate -50%, which means the animation travels width / 2 pixels.
        // For a constant speed of 30px/s: duration = distance / 30.
        const width = entry.contentRect.width;
        const duration = (width / 2) / 30;
        track.style.animationDuration = `${duration}s`;
      }
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="marquee my-12">
      <div className="marquee-track" ref={trackRef}>
        {doubled.map((industry, i) => (
          <span key={i} className="marquee-item">
            {industry}
          </span>
        ))}
      </div>
    </section>
  );
}
