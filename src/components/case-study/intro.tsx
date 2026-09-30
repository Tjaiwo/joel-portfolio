"use client";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyIntro({ cs }: { cs: CaseStudy }) {
  return (
    <section className="border-b border-border/40">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-12">
        <div className="space-y-8">
          {cs.intro.map((para, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 * i }} className="text-xl leading-relaxed text-foreground/90 sm:text-2xl lg:text-3xl lg:leading-relaxed">{para}</motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
