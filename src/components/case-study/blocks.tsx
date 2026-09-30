"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { CaseStudyBlock } from "@/data/case-studies";

export function BlockRenderer({ block, index }: { block: CaseStudyBlock; index: number }) {
  switch (block.type) {
    case "text": return <TextBlock block={block} index={index} />;
    case "text-image": return <TextImageBlock block={block} index={index} />;
    case "image": return <ImageBlock block={block} index={index} />;
    case "gallery": return <GalleryBlock block={block} index={index} />;
    case "quote": return <QuoteBlock block={block} index={index} />;
    case "stats": return <StatsBlock block={block} index={index} />;
    default: return null;
  }
}

function TextBlock({ block, index }: { block: Extract<CaseStudyBlock, { type: "text" }>; index: number }) {
  return (
    <section id={block.id} className="mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-12 scroll-mt-20">
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.05 * Math.min(index, 4) }}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{block.heading}</h2>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {block.body.map((para, i) => (<p key={i}>{para}</p>))}
        </div>
      </motion.div>
    </section>
  );
}

function TextImageBlock({ block, index }: { block: Extract<CaseStudyBlock, { type: "text-image" }>; index: number }) {
  const isFull = block.imagePosition === "full" || !block.imagePosition;
  if (isFull) {
    return (
      <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-12 scroll-mt-20">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{block.heading}</h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {block.body.map((para, i) => (<p key={i}>{para}</p>))}
          </div>
        </motion.div>
        <motion.figure initial={{ opacity: 0, scale: 0.96, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mt-14 overflow-hidden rounded-xl border border-border/40 bg-muted/30">
          <img src={block.image.src} alt={block.image.alt} className="w-full h-auto object-cover" loading="lazy" />
          {block.image.caption && (<figcaption className="border-t border-border/40 px-6 py-4 text-sm text-muted-foreground">{block.image.caption}</figcaption>)}
        </motion.figure>
      </section>
    );
  }
  return (
    <section id={block.id} className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-12 scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, x: block.imagePosition === "left" ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className={block.imagePosition === "left" ? "lg:order-2" : ""}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{block.heading}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {block.body.map((para, i) => (<p key={i}>{para}</p>))}
          </div>
        </motion.div>
        <motion.figure initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={"overflow-hidden rounded-xl border border-border/40 " + (block.imagePosition === "left" ? "lg:order-1" : "")}>
          <img src={block.image.src} alt={block.image.alt} className="w-full h-auto object-cover" loading="lazy" />
        </motion.figure>
      </div>
    </section>
  );
}

function ImageBlock({ block, index }: { block: Extract<CaseStudyBlock, { type: "image" }>; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  return (
    <section id={block.id} ref={ref} className="relative my-12 h-[60vh] overflow-hidden sm:my-20 sm:h-[80vh]">
      <motion.div style={block.parallax ? { y, scale } : {}} className="absolute inset-0 -z-10">
        <motion.div initial={{ clipPath: "inset(15% 0 15% 0)", opacity: 0.6 }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="h-full w-full">
          <img src={block.src} alt={block.alt} className="h-[130%] w-full object-cover object-top" loading="lazy" />
        </motion.div>
      </motion.div>
      {block.caption && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
          <p className="max-w-xl rounded-lg bg-background/70 px-4 py-2.5 text-sm text-foreground backdrop-blur-md sm:text-base">{block.caption}</p>
        </motion.div>
      )}
    </section>
  );
}

function GalleryBlock({ block, index }: { block: Extract<CaseStudyBlock, { type: "gallery" }>; index: number }) {
  const cols = block.columns || 3;
  const colClass = cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section id={block.id} className="border-y border-border/40 bg-muted/10 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">In context</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Responsive across devices</h2>
        </motion.div>
        <div className={"mt-12 grid gap-5 " + colClass}>
          {block.images.map((img, i) => (
            <motion.figure key={img.src} initial={{ opacity: 0, y: 32, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }} className="group overflow-hidden rounded-lg border border-border/40 bg-background">
              <div className="overflow-hidden">
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
              </div>
              {img.caption && (<figcaption className="border-t border-border/40 px-4 py-3 text-xs text-muted-foreground">{img.caption}</figcaption>)}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteBlock({ block, index }: { block: Extract<CaseStudyBlock, { type: "quote" }>; index: number }) {
  return (
    <section className="border-y border-border/40 bg-muted/10 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-12">
        <motion.blockquote initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl lg:leading-snug">
          <span className="text-primary">"</span>{block.text}<span className="text-primary">"</span>
        </motion.blockquote>
        {block.attribution && (
          <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-6 text-sm text-muted-foreground">— {block.attribution}</motion.footer>
        )}
      </div>
    </section>
  );
}

function StatsBlock({ block, index }: { block: Extract<CaseStudyBlock, { type: "stats" }>; index: number }) {
  return (
    <section id={block.id} className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-12">
        {block.heading && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{block.heading}</h2>
          </motion.div>
        )}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {block.stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.1 * i }} className="rounded-xl border border-border/40 bg-background p-6 transition-all hover:border-border/80 hover:shadow-lg hover:shadow-foreground/5">
              <div className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm font-medium">{stat.label}</div>
              {stat.sublabel && (<div className="mt-1 text-xs text-muted-foreground">{stat.sublabel}</div>)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
