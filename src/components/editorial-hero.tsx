"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function EditorialHero() {
  return (
    <section id="home" className="editorial-hero">
      <h1>
        WEB DEVELOPMENT &amp;<br />
        DESIGN FOR BRANDS THAT SHIP*
      </h1>
      <p className="hero-subtitle">
        * Coded &amp; Designed by Hand, Backed by Coffee &amp; Instinct
      </p>
      <p className="hero-description">
        WordPress and Next.js developer with 10 years of shipping. 50+ projects across aviation, industrial, media, e-commerce, and architecture. Each one built, measured, and case-studied.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-wrap gap-4 mt-8"
      >
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Start a project <ArrowRight size={14} />
        </a>
        <a
          href="/about"
          className="inline-flex items-center gap-2 px-6 py-3 border border-dotted border-border text-sm font-medium hover:bg-secondary transition-colors"
        >
          More about me <ArrowRight size={14} />
        </a>
      </motion.div>
    </section>
  );
}
