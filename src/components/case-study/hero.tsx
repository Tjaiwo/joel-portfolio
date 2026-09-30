"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyHero({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "20%"]);

  return (
    <header ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <img src={cs.heroImage} alt={cs.heroImageAlt} className="h-[120%] w-full object-cover object-top" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/85 to-black/85" />
      </motion.div>
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 py-6 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <a href="/#projects-skills" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 backdrop-blur-sm transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to work
          </a>
        </motion.div>
        <div className="py-20">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B8956A]/30 bg-[#B8956A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#B8956A] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8956A] animate-pulse" />{cs.status}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-serif)" }}>{cs.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-6 max-w-3xl text-lg text-foreground/80 sm:text-2xl lg:text-3xl">{cs.tagline}</motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-10">
            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background backdrop-blur-sm transition-all hover:scale-[1.03]">
              Visit Live Site <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <motion.dl initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }} className="grid grid-cols-2 gap-6 border-t border-foreground/15 pt-6 backdrop-blur-sm sm:grid-cols-4">
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">Industry</dt><dd className="mt-1.5 text-sm font-medium">{cs.meta.industry}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">Date</dt><dd className="mt-1.5 text-sm font-medium">{cs.meta.date}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">Duration</dt><dd className="mt-1.5 text-sm font-medium">{cs.meta.duration}</dd></div>
          <div className="col-span-2 sm:col-span-1"><dt className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">Services</dt><dd className="mt-1.5 flex flex-wrap gap-1.5">{cs.meta.services.slice(0, 3).map((s) => (<span key={s} className="rounded-md border border-foreground/20 px-2 py-0.5 text-xs text-foreground/70">{s}</span>))}</dd></div>
        </motion.dl>
      </motion.div>
    </header>
  );
}
