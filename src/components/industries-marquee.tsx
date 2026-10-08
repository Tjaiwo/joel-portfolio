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
        const width = entry.contentRect.width;
        const duration = (width / 2) / 30; // 30px per second
        track.style.animationDuration = `${duration}s`;
      }
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative flex w-full items-stretch bg-primary text-primary-foreground my-20 overflow-hidden" style={{ fontFamily: "var(--font-mono)" }}>
      {/* Fixed label container on the left */}
      <div className="relative z-10 flex items-center bg-primary px-6 py-4 md:px-8 lg:px-12 shrink-0">
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.1em] whitespace-nowrap">
          Industries worked in
        </span>
      </div>
      
      {/* Decorative vertical separator */}
      <div className="w-px bg-primary-foreground/30 my-3 shrink-0 z-10 relative hidden md:block" />

      {/* Scrolling track container */}
      <div className="flex-1 overflow-hidden flex items-center relative [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="marquee-track flex items-center" ref={trackRef} style={{ paddingLeft: "1rem" }}>
          {doubled.map((industry, i) => (
            <span key={i} className="flex items-center text-xs md:text-sm font-medium uppercase tracking-wider whitespace-nowrap pr-8">
              {industry}
              {/* Star/dot separator between items */}
              <span className="ml-8 text-primary-foreground/30 opacity-70">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
