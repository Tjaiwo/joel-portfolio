"use client";

import { useEffect, useRef } from "react";

const PROJECT_NAMES = [
  "Elin Group",
  "Elin Air",
  "Mediapool",
  "Clayton Prints",
  "Evan Micky Photography",
  "Atom",
  "Diamond Source Jewelers",
  "Designed Spaces by Yemi",
  "Cedar Rush",
];

export function ProjectMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...PROJECT_NAMES, ...PROJECT_NAMES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const duration = (width / 2) / 30;
        track.style.animationDuration = `${duration}s`;
      }
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 border-y border-dashed border-primary overflow-hidden">
      <div className="marquee">
        <div className="marquee-track" ref={trackRef}>
          {doubled.map((name, i) => (
            <span key={i} className="marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
