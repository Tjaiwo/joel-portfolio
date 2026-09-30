"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { CaseStudyBlock } from "@/data/case-studies";

export function BlockRenderer({ block }: { block: CaseStudyBlock; index: number }) {
  switch (block.type) {
    case "text": return <TextBlock block={block} />;
    case "text-image": return <TextImageBlock block={block} />;
    case "image": return <ImageBlock block={block} />;
    case "gallery": return <GalleryBlock block={block} />;
    case "quote": return <QuoteBlock block={block} />;
    case "stats": return <StatsBlock block={block} />;
    default: return null;
  }
}

function TextBlock({ block }: { block: Extract<CaseStudyBlock, { type: "text" }> }) {
  return (
    <section id={block.id} className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-8" style={{ fontFamily: "var(--font-serif)" }}>
          {block.heading}
        </h2>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {block.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function TextImageBlock({ block }: { block: Extract<CaseStudyBlock, { type: "text-image" }> }) {
  return (
    <section id={block.id} className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-8" style={{ fontFamily: "var(--font-serif)" }}>
            {block.heading}
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {block.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.figure
        initial={{ opacity: 0, scale: 0.96, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full overflow-hidden lg:mx-auto lg:max-w-5xl lg:px-12"
      >
        <div className="border-t border-b border-dotted border-border lg:border lg:rounded-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.image.src}
            alt={block.image.alt}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        {block.image.caption && (
          <figcaption className="px-6 py-4 text-sm text-muted-foreground lg:px-0">
            {block.image.caption}
          </figcaption>
        )}
      </motion.figure>
    </section>
  );
}

function ImageBlock({ block }: { block: Extract<CaseStudyBlock, { type: "image" }> }) {
  return (
    <section className="my-12 sm:my-16 lg:my-20">
      <ParallaxImage src={block.src} alt={block.alt} caption={block.caption} />
    </section>
  );
}

function ParallaxImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Desktop gets parallax transforms; mobile gets static (0,0,1,1)
  const y = useTransform(scrollYProgress, [0, 1], isDesktop ? ["-12%", "12%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isDesktop ? [1.15, 1, 1.05] : [1, 1, 1]);

  return (
    <div className="w-full lg:mx-auto lg:max-w-6xl lg:px-12">
      <figure
        ref={ref}
        className={
          isDesktop
            ? "relative h-[60vh] overflow-hidden border border-dotted border-border"
            : "w-full overflow-hidden border-t border-b border-dotted border-border"
        }
      >
        {isDesktop ? (
          <motion.div style={{ y, scale }} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-[130%] w-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        )}
        {caption && (
          isDesktop ? (
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6">
              <p className="inline-block bg-background/80 px-3 py-1.5 text-xs text-foreground backdrop-blur-sm sm:text-sm">
                {caption}
              </p>
            </div>
          ) : (
            <figcaption className="px-6 py-4 text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )
        )}
      </figure>
    </div>
  );
}

function GalleryBlock({ block }: { block: Extract<CaseStudyBlock, { type: "gallery" }> }) {
  const cols = block.columns || 3;
  const colClass = cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id={block.id} className="border-t border-dotted border-border scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:px-12">
        <div className={"grid gap-5 " + colClass}>
          {block.images.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="border border-dotted border-border overflow-hidden"
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-dotted border-border">
                  {img.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteBlock({ block }: { block: Extract<CaseStudyBlock, { type: "quote" }> }) {
  return (
    <section className="border-t border-dotted border-border scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-12">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-medium leading-snug sm:text-3xl italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {block.text}
        </motion.blockquote>
        {block.attribution && (
          <p className="mt-6 text-sm text-muted-foreground">
            {block.attribution}
          </p>
        )}
      </div>
    </section>
  );
}

function StatsBlock({ block }: { block: Extract<CaseStudyBlock, { type: "stats" }> }) {
  return (
    <section id={block.id} className="border-t border-dotted border-border scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:px-12">
        {block.heading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl mb-10" style={{ fontFamily: "var(--font-serif)" }}>
              {block.heading}
            </h2>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {block.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="border border-dotted border-border p-5 sm:p-6"
            >
              <div className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium">{stat.label}</div>
              {stat.sublabel && (
                <div className="mt-1 text-xs text-muted-foreground">{stat.sublabel}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
