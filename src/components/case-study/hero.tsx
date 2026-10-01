"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

function calculateReadingTime(cs: CaseStudy): number {
  let wordCount = 0;
  cs.intro.forEach(p => { wordCount += p.split(/\s+/).length; });
  cs.blocks.forEach(block => {
    if (block.type === "text" || block.type === "text-image") {
      block.body.forEach(p => { wordCount += p.split(/\s+/).length; });
    }
  });
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function CaseStudyHero({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "20%"]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const readingTime = calculateReadingTime(cs);

  return (
    <header ref={ref} onMouseMove={handleMouseMove} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cs.heroImage} alt={cs.heroImageAlt} className="h-[120%] w-full object-cover object-top" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/85 to-black/85" />
      </motion.div>

      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(107, 122, 61, 0.12) 0%, transparent 50%)`,
          }}
        />
      )}

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pt-20 pb-6 sm:px-8 lg:px-12"
      >
        <div className="py-20">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {cs.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-3xl text-lg text-white/80 sm:text-2xl lg:text-3xl"
          >
            {cs.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10"
          >
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black backdrop-blur-sm transition-all hover:scale-[1.03]"
            >
              Visit Live Site <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="grid grid-cols-2 gap-6 border-t border-white/20 pt-6 backdrop-blur-sm sm:grid-cols-5 p-6"
        >
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Industry</dt><dd className="mt-1.5 text-sm font-medium text-white">{cs.meta.industry}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Date</dt><dd className="mt-1.5 text-sm font-medium text-white">{cs.meta.date}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Duration</dt><dd className="mt-1.5 text-sm font-medium text-white">{cs.meta.duration}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Read time</dt><dd className="mt-1.5 text-sm font-medium text-white">~{readingTime} min</dd></div>
          <div className="col-span-2 sm:col-span-1"><dt className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Services</dt><dd className="mt-1.5 flex flex-wrap gap-1.5">{cs.meta.services.slice(0, 3).map((s) => (<span key={s} className="rounded-md border border-white/20 px-2 py-0.5 text-xs text-white/70">{s}</span>))}</dd></div>
        </motion.dl>
      </motion.div>
    </header>
  );
}
