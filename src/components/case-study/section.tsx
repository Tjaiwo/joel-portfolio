"use client";

import { motion } from "framer-motion";
import type { CaseStudySection } from "@/data/case-studies";

export function CaseStudySection({ section, index }: { section: CaseStudySection; index: number }) {
  return (
    <section
      id={section.id}
      className="mx-auto max-w-6xl px-6 py-11 sm:py-20 lg:px-12 scroll-mt-20"
      aria-labelledby={`${section.id}-heading`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 * Math.min(index, 4) }}
      >
        {/* Kicker as small pill instead of bare text */}
        {section.kicker && (
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {section.kicker}
          </span>
        )}

        <h2
          id={`${section.id}-heading`}
          className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {section.heading}
        </h2>

        <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {section.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {section.image && (
          <figure className="mt-10 overflow-hidden rounded-lg border border-border/40 bg-muted/30">
            {/* eslint-disable-next-line @next/next/no/no-img-element */}
            <img
              src={section.image.src}
              alt={section.image.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {section.image.caption && (
              <figcaption className="border-t border-border/40 px-5 py-3 text-sm text-muted-foreground">
                {section.image.caption}
              </figcaption>
            )}
          </figure>
        )}
      </motion.div>
    </section>
  );
}
