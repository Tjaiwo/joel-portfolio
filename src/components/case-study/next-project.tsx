"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

export function NextProject({ next }: { next: CaseStudy | undefined }) {
  if (!next) return null;
  return (
    <section className="border-t border-border/40 bg-foreground text-background">
      <motion.a href={`/projects/${next.slug}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="group block">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xs font-semibold uppercase tracking-[0.08em] text-background/60">Next Case Study</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">{next.title}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-4 max-w-xl text-base text-background/70 sm:text-lg">{next.tagline}</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }} className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-background/30 transition-all group-hover:bg-background group-hover:text-foreground group-hover:border-background">
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </motion.div>
          </div>
        </div>
      </motion.a>
    </section>
  );
}
