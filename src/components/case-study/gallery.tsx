"use client";

import { motion } from "framer-motion";

type GalleryImage = { src: string; alt: string; caption?: string };

export function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  if (!images.length) return null;

  return (
    <section
      id="gallery"
      className="border-y border-border/40 bg-muted/10 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-11 sm:py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Gallery
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={
                "group overflow-hidden rounded-lg border border-border/40 bg-background transition-all hover:border-border/80 hover:shadow-md " +
                (i === 0 ? "sm:col-span-2 lg:col-span-2" : "")
              }
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <figcaption className="px-4 py-3 text-sm text-muted-foreground">
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
