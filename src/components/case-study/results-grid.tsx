"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CaseStudyResult } from "@/data/case-studies";

function extractNumeric(value: string): { num: number; prefix: string; suffix: string } | null {
  const m = value.match(/^([+\-~]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3] };
}

function useAnimatedNumber(target: number, inView: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      const s = start ?? (start = ts);
      const p = Math.min((ts - s) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return n;
}

function ResultCell({ result, index }: { result: CaseStudyResult; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const numeric = extractNumeric(result.value);
  const animated = useAnimatedNumber(numeric?.num ?? 0, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="rounded-lg border border-border/40 bg-background p-6 transition-all hover:border-border/80 hover:shadow-sm"
    >
      <div className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
        {numeric ? (
          <>
            {numeric.prefix}
            {numeric.num % 1 === 0
              ? Math.round(animated).toString()
              : animated.toFixed(1)}
            {numeric.suffix}
          </>
        ) : (
          result.value
        )}
      </div>
      <div className="mt-2 text-sm font-medium">{result.label}</div>
      {result.sublabel && (
        <div className="mt-1 text-xs text-muted-foreground">{result.sublabel}</div>
      )}
    </motion.div>
  );
}

export function ResultsGrid({ results }: { results: CaseStudyResult[] }) {
  return (
    <section id="results" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-11 sm:py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Results &amp; Impact
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Measurable outcomes
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {results.map((r, i) => (
            <ResultCell key={r.label} result={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
