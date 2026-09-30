"use client";

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
  const doubled = [...INDUSTRIES, ...INDUSTRIES];

  return (
    <section className="marquee my-12">
      <div className="marquee-track">
        {doubled.map((industry, i) => (
          <span key={i} className="marquee-item">
            {industry}
          </span>
        ))}
      </div>
    </section>
  );
}
