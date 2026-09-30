"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

export function NextProject({ next }: { next: CaseStudy | undefined }) {
  if (!next) return null;

  return (
    <section className="border-t border-dotted border-border bg-foreground text-background">
      <motion.a
        href={`/projects/${next.slug}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group block"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.1em] text-background/50 mb-3">
                Next
              </p>
              <h2
                className="text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {next.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-background/60 sm:text-base">
                {next.tagline}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-background/30 transition-all group-hover:bg-background group-hover:text-foreground group-hover:border-background"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </motion.a>
    </section>
  );
}
