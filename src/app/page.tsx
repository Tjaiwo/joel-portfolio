"use client";

import { motion } from "framer-motion";
import { EditorialHero } from "@/components/editorial-hero";
import { Testimonials } from "@/components/testimonials";
import { ArrowUpRight, ExternalLink, ArrowRight } from "lucide-react";

const PROJECTS = [
  { id: 11, slug: "alukayode", title: "Alu Kayode", description: "Minimalist portfolio for an experiential design director.", url: "https://alukayode.com/", image: "/screenshots/case-studies/alukayode/desktop-home.webp", tags: ["WordPress", "Web Design", "Portfolio"], results: "A high-contrast, distraction-free gallery for physical design projects", designer: false },
  { id: 1, slug: "elin-group", title: "Elin Group", description: "Corporate website for a diversified African industrial platform.", url: "https://elin-group.com/", image: "/screenshots/elingroup.webp", tags: ["WordPress", "Elementor", "Corporate", "SEO"], results: "7 subsidiary brands unified under one industrial platform", designer: true },
  { id: 2, slug: "elin-air", title: "Elin Air", description: "Aviation company website with booking system.", url: "https://flyelinair.com/", image: "/screenshots/flyelinair.webp", tags: ["WordPress", "Elementor", "Booking System", "SEO"], results: "Integrated booking system with fleet showcase", designer: true },
  { id: 5, slug: "evan-micky", title: "Evan Micky Photography", description: "Documentary-style wedding photography portfolio.", url: "https://evanmickyphotography.com/", image: "/screenshots/evanmickyphotography.webp", tags: ["WordPress", "Portfolio", "Gallery", "SEO"], results: "Clean photo gallery with a direct booking system", designer: false },
  { id: 10, slug: "livewithlatasha", title: "Live With Latasha", description: "Headless WordPress site powered by an Astro frontend.", url: "https://livewithlatasha.com/", image: "/screenshots/case-studies/livewithlatasha/desktop-home.webp", tags: ["Astro", "Headless WP", "TypeScript"], results: "A high-performance digital platform with full editorial control", designer: false },
  { id: 7, slug: "diamond-source", title: "Diamond Source Jewelers", description: "Custom jewelry e-commerce with deep taxonomy.", url: "https://www.diamondsourcejewelers.com", image: "/screenshots/case-studies/diamond-source/desktop-engagement.webp", tags: ["WooCommerce", "E-Commerce", "Data Migration"], results: "200+ products uploaded with 100% attribute coverage", designer: false },
  { id: 3, slug: "mediapool", title: "Mediapool", description: "Creative media buying and planning agency.", url: "https://mediapool.ng/", image: "/screenshots/mediapool.webp", tags: ["WordPress", "Elementor", "Media", "SEO"], results: "Media campaigns for 4+ major Nigerian brands", designer: true },
  { id: 4, slug: "clayton-prints", title: "Clayton Prints", description: "E-commerce store with WooCommerce.", url: "https://claytonprints.com/", image: "/screenshots/case-studies/clayton-prints/desktop-home.webp", tags: ["WordPress", "WooCommerce", "E-Commerce"], results: "Organized 8+ product categories with a fast checkout flow", designer: true },
  { id: 6, slug: "atomdsn", title: "Atom", description: "Creative experiential design agency.", url: "https://atomdsn.com/", image: "/screenshots/case-studies/atomdsn/desktop-home.webp", tags: ["Web Design", "WordPress", "Agency", "SEO"], results: "Portfolio showcasing 20+ experiential brand activations", designer: false },
  { id: 8, slug: "designed-spaces", title: "Designed Spaces by Yemi", description: "Architecture firm portfolio, 12+ projects.", url: "https://designedspacesbyyemi.com/", image: "/screenshots/case-studies/designed-spaces/desktop-home.webp", tags: ["Web Design", "WordPress", "Portfolio", "SEO"], results: "Portfolio showcasing 12+ landmark architectural projects", designer: false },
  { id: 9, slug: "cedar-rush", title: "Cedar Rush", description: "Creative production and media company.", url: "https://cedarrush.ng/", image: "/screenshots/case-studies/cedar-rush/desktop-home.webp", tags: ["WordPress", "Elementor", "Media", "SEO"], results: "20+ years of creative production experience showcased", designer: false },
];

const CASE_STUDY_SLUGS = ["alukayode", "elin-group", "elin-air", "evan-micky", "livewithlatasha", "diamond-source", "mediapool", "clayton-prints", "atomdsn", "designed-spaces", "cedar-rush"];
const DESIGNER = { name: "Mayowa Oduntan", url: "https://thisismayor.webflow.io/" };

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.04 * Math.min(index, 6) }}
      className="lp-card group"
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.title} loading="lazy" className="lp-card-image" />
      </a>
      <div className="lp-card-body">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <h3 className="lp-card-title">{project.title}</h3>
          </a>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Visit ${project.title}`}>
            <ExternalLink size={12} />
          </a>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2 text-[10px] text-muted-foreground">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={tag}>
              {tag}{i < Math.min(project.tags.length, 3) - 1 && <span className="ml-1.5 opacity-40">/</span>}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-primary mb-2 leading-relaxed">{project.results}</p>
        {CASE_STUDY_SLUGS.includes(project.slug) && (
          <a href={`/projects/${project.slug}`} className="lp-card-cta">View Case Study <ArrowUpRight size={11} /></a>
        )}
        {project.designer && (
          <p className="text-[9px] text-muted-foreground mt-2 pt-2 border-t border-dashed border-border">
            UI/UX - <a href={DESIGNER.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">{DESIGNER.name}</a>
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Page() {
  return (
    <>
      <EditorialHero />

      <section className="lp-section pt-[100px] lg:pt-[180px]">
        <p className="lp-section-label">Selected work: 100% shipped by Joel</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Post-testimonials CTA */}
      <section className="lp-section border-t border-dashed border-primary">
        <div className="text-center">
          <p className="lp-section-label">Your turn</p>
          <h2 className="lp-heading" style={{ marginBottom: "1.5rem" }}>
            Have a project<br />
            <em>in mind?</em>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
            Available for freelance WordPress and Next.js work. Tell me what you&apos;re building and I&apos;ll reply within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Start a conversation <ArrowRight size={14} />
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-dotted border-border text-sm font-medium hover:bg-secondary transition-colors"
            >
              Read my story <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
