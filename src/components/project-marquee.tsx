"use client";

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
  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...PROJECT_NAMES, ...PROJECT_NAMES];

  return (
    <section className="py-12 border-y border-border/40 overflow-hidden">
      <div className="marquee">
        <div className="marquee-track">
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
