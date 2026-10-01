"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getTimeGreeting(): string {
  const hourStr = new Date().toLocaleTimeString("en-US", {
    timeZone: "Africa/Lagos",
    hour: "numeric",
    hour12: false,
  });
  const hour = parseInt(hourStr);
  if (hour >= 5 && hour < 12) return "Morning. Coffee's already brewing.";
  if (hour >= 12 && hour < 17) return "Afternoon. Building something.";
  if (hour >= 17 && hour < 22) return "Evening. Wrapping up the day.";
  return "Late night. Debugging never sleeps.";
}

export function EditorialHero() {
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setGreeting(getTimeGreeting());
    const interval = setInterval(() => setGreeting(getTimeGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="editorial-hero">
      <h1>
        WEB DEVELOPMENT &amp;<br />
        DESIGN FOR BRANDS THAT SHIP*
      </h1>
      <p className="hero-subtitle">
        * Coded &amp; Designed by Hand, Backed by Coffee &amp; Instinct
      </p>

      {/* Time-based greeting */}
      {mounted && greeting && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm italic text-primary mt-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {greeting}
        </motion.p>
      )}

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
