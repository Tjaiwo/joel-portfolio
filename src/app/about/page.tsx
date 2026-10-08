"use client";

import { motion } from "framer-motion";
import { IndustriesMarquee } from "@/components/industries-marquee";

const EXPERIENCE = [
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Apr 2016 — Present",
    location: "Lagos, NG",
    description: "Designed, developed, and maintained custom WordPress websites for clients across e-commerce, education, real estate, and personal branding. Built themes and plugins, integrated WooCommerce, Elementor, ACF, Mailchimp, and payment gateways. Migrated sites, optimized databases, implemented security best practices.",
    achievements: [
      "Completed 50+ freelance projects with 95% client satisfaction rate",
      "Developed a LMS for a web3 brand that achieved 20k+ unique visitors within 2 weeks of launch",
      "Reduced website load time by up to 60% through performance optimization",
    ],
  },
  {
    company: "Digisplash",
    role: "Web Developer",
    period: "Jan 2024 — Mar 2025",
    location: "Lagos, NG",
    description: "Collaborated with the Product Designer to implement website designs. Developed new features for existing websites, customized themes to meet client requirements, implemented SEO and web layouts, prepared website proposals, and provided technical support to clients.",
    achievements: [
      "Shipped 9 featured projects including Elin Group, Elin Air, Mediapool, and Clayton Prints",
      "Collaborated with designer Mayowa Oduntan on multiple redesign projects",
    ],
  },
  {
    company: "Lustre Africa",
    role: "Website Administrator",
    period: "Sep 2019 — Dec 2023",
    location: "Lagos, NG",
    description: "Managed and maintained the Lustre Africa website, handling content updates, performance monitoring, security patches, and technical support. Ensured the site remained fast, secure, and up-to-date across a 4-year tenure.",
    achievements: [
      "Maintained website uptime and performance across a 4-year tenure",
      "Implemented security patches and updates to keep the site protected",
    ],
  },
];

const SKILLS = {
  "Core": ["WordPress", "Elementor", "WooCommerce", "ACF", "PHP", "MySQL", "Rank Math"],
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS/JS"],
  "Design": ["Figma", "Adobe XD", "Canva", "PSD"],
  "Practice": ["SEO", "Responsive Design", "Performance Optimization", "Website Maintenance", "Troubleshooting", "User Research", "Usability Testing"],
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      {/* Hero */}
      <section className="lp-content mb-20">
        <p className="lp-section-label">About</p>
        <h1 className="lp-heading" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          I build websites<br />
          <em>that work.</em>
        </h1>
      </section>

      {/* Photo with olive green hue */}
      <div className="lp-content" style={{ marginTop: "40px", marginBottom: "40px" }}>
        <div className="mx-auto max-w-md">
          <div className="relative overflow-hidden border border-dotted border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/joel-photo.jpg"
              alt="Joel Akinlosotu - Web Developer"
              className="w-full h-auto object-cover"
              style={{
                filter: "grayscale(100%) sepia(100%) hue-rotate(50deg) saturate(0.8) brightness(0.9)",
              }}
            />
            {/* Subtle olive green overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "rgba(107, 122, 61, 0.15)",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <section className="lp-content mb-20 max-w-2xl">
        <p className="lp-section-label mb-4">Bio</p>
        <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
          <p>
            I'm Joel Akinlosotu, a web developer based in Lagos, Nigeria. For the past 10 years I've been building custom WordPress and Next.js websites for clients across e-commerce, education, real estate, media, and personal branding.
          </p>
          <p>
            My work is about clarity over cleverness. The fastest path to a happy client isn't a fancier design, it's a clearer one. Every decision I make is measured against the business goal: reducing reliance on brokers, enabling direct customer acquisition, making the work visible.
          </p>
          <p>
            I've shipped 50+ freelance projects with a 95% client satisfaction rate. Nine of those are featured on this site as full case studies. Each one shipped, measured, and documented.
          </p>
          <p>
            When I'm not coding, I'm reading, walking, or scheming about the next project. Available for freelance work.
          </p>
        </div>
      </section>

      {/* Industries marquee */}
      <IndustriesMarquee />

      {/* Experience */}
      <section className="lp-section border-t border-dashed border-primary">
        <p className="lp-section-label">Experience</p>
        <h2 className="lp-heading">Where I've worked.</h2>

        <div className="mt-8">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="mb-12 pb-12 border-b border-dotted border-border last:border-0"
            >
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <h3 className="text-lg">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.role}</p>
                </div>
                <div className="text-sm text-muted-foreground">{exp.period}</div>
                <div className="text-sm text-muted-foreground">{exp.location}</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                {exp.description}
              </p>
              <div className="space-y-1">
                {exp.achievements.map((a) => (
                  <p key={a} className="text-sm text-primary flex gap-2">
                    <span className="opacity-50">✳</span>
                    {a}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="lp-section border-t border-dashed border-primary">
        <p className="lp-section-label">Education</p>
        <h2 className="lp-heading">Where I studied.</h2>
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <div className="md:col-span-2">
            <h3 className="text-lg">Federal University of Technology, Akure</h3>
            <p className="text-sm text-muted-foreground">B.Tech. Statistics</p>
          </div>
          <div className="text-sm text-muted-foreground">2012 — 2017</div>
        </div>
      </section>

      {/* Skills */}
      <section className="lp-section border-t border-dashed border-primary">
        <p className="lp-section-label">Skills</p>
        <h2 className="lp-heading">What I work with.</h2>

        <div className="space-y-8 mt-8">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p className="lp-section-label mb-3">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="lp-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section border-t border-dashed border-primary">
        <p className="lp-section-label">Let's talk</p>
        <h2 className="lp-heading">
          Available for<br />
          <em>freelance work.</em>
        </h2>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 mt-6 text-primary underline decoration-dotted underline-offset-4 text-lg"
        >
          Start a conversation →
        </a>
      </section>
    </main>
  );
}
