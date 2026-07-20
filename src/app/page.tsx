"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Mail,
  Phone,
  ExternalLink,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Send,
  CheckCircle2,
  Calendar,
  GraduationCap,
  Linkedin,
} from "lucide-react";

/* ────────────────────────────── DATA ────────────────────────────── */

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "\u2302" },
  { id: "about", label: "About Me", icon: "\u25C9" },
  { id: "projects-skills", label: "Projects & Skills", icon: "\u25C8" },
  { id: "experience", label: "Experience", icon: "\u25CE" },
  { id: "contact", label: "Contact", icon: "\u2726" },
];

const STATS = [
  { value: "50+", label: "Projects Completed" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "10+", label: "Years Experience" },
  { value: "20k+", label: "Unique Visitors (LMS Launch)" },
];

const DESIGNER = {
  name: "Mayowa Oduntan",
  url: "https://thisismayor.webflow.io/",
};

const PROJECTS = [
  {
    id: 1,
    slug: "elin-air",
    title: "Elin Air",
    description:
      "A premium airline booking and travel platform featuring seamless flight search, real-time availability, and a modern booking experience built on WordPress with custom integrations.",
    url: "https://flyelinair.com/",
    image: "/screenshots/flyelinair.png",
    tags: ["WordPress", "Elementor", "Booking System", "Responsive Design"],
    designer: true,
  },
  {
    id: 2,
    slug: "clayton-prints",
    title: "Clayton Prints",
    description:
      "An e-commerce printing solutions website with product catalogs, custom order workflows, and seamless payment integration for a commercial printing business.",
    url: "https://claytonprints.com/",
    image: "/screenshots/claytonprints.png",
    tags: ["WordPress", "WooCommerce", "Elementor", "E-Commerce"],
    designer: true,
  },
  {
    id: 3,
    title: "Cedar Rush",
    description:
      "A dynamic events production and media company website showcasing portfolio, services, and media content with engaging visual storytelling and smooth user interactions.",
    url: "https://cedarrush.ng/",
    image: "/screenshots/cedarrush.png",
    tags: ["WordPress", "Elementor", "Media", "Portfolio", "SEO"],
  },
  {
    id: 4,
    slug: "kakaride",
    title: "Kakaride",
    description:
      "A ride-hailing and logistics platform built on WordPress, featuring real-time booking, driver management, location-based services, and seamless user experience across all devices.",
    url: "https://kakaride.ng/",
    image: "/screenshots/kakaride.png",
    tags: ["WordPress", "Custom Plugins", "API Integration", "Mobile-First", "Elementor", "SEO"],
    designer: true,
  },
  {
    id: 5,
    title: "Diamond Source Jewelers",
    description:
      "An elegant e-commerce jewelry website featuring a curated product catalog, secure checkout flows, and a luxurious visual experience tailored for a high-end jewelry brand.",
    url: "https://www.diamondsourcejewelers.com",
    image: "/screenshots/diamondsourcejewelers.png",
    tags: ["WordPress", "WooCommerce", "E-Commerce", "Luxury Brand", "Elementor", "SEO"],
  },
  {
    id: 6,
    title: "Evan Micky Photography",
    description:
      "A visually-driven photography portfolio website with stunning image galleries, smooth transitions, and an immersive browsing experience designed to showcase creative work.",
    url: "https://evanmickyphotography.com/",
    image: "/screenshots/evanmickyphotography.png",
    tags: ["WordPress", "Portfolio", "Gallery", "Responsive Design", "Elementor", "SEO"],
  },
];

const SKILLS_CORE = [
  "WordPress",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "PHP",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Node.js",
  "Elementor",
  "Figma",
];

const SKILLS_NOCODE = [
  "Elementor",
  "Webflow",
  "Framer",
  "Wix",
  "Bubble",
  "Make (Integromat)",
  "Zapier",
  "Airtable",
];

const SKILLS_KEY = [
  "User Research",
  "Usability Testing",
  "Product Thinking",
  "Interactive Design",
  "Heuristic Evaluation",
  "SEO",
  "Responsive Design",
  "Website Maintenance",
  "Performance Optimization",
  "Troubleshooting",
];

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "Freelance",
    period: "Apr 2016 – Present",
    location: "Lagos, NG",
    descriptions: [
      "Designed, developed, and maintained custom WordPress websites for clients across e-commerce, education, real estate, and personal branding.",
      "Built and customized themes and plugins to meet unique client specifications, ensuring responsive and SEO-optimized performance.",
      "Integrated third-party tools such as WooCommerce, Elementor, ACF, Mailchimp, and payment gateways to extend site functionality.",
      "Migrated websites, optimized databases, and implemented security best practices for enhanced site performance and reliability.",
    ],
    projects: [
      {
        title: "Elin Air",
        projectId: "elin-air",
        descriptions: [
          "Built a premium aviation website featuring private jet charter booking, MRO service showcases, and real-time flight inquiry forms integrated with a custom WordPress setup.",
          "Designed a responsive, mobile-first layout with Elementor that communicates luxury and professionalism, aligning with the brand’s high-end aviation services.",
          "Implemented SEO-optimized service pages and structured data markup to improve search visibility for private jet charter and maintenance-related queries.",
          "Integrated social media feeds and contact forms with email notifications to streamline client inquiries and booking requests.",
        ],
      },
      {
        title: "Clayton Prints",
        projectId: "clayton-prints",
        descriptions: [
          "Developed a fully functional e-commerce printing website using WooCommerce with custom product catalogs for business cards, banners, apparel, and promotional materials.",
          "Built a custom order workflow allowing customers to upload artwork, select specifications, and receive instant quote estimates before checkout.",
          "Integrated multiple payment gateways and configured shipping options to support both local and international printing orders.",
          "Optimized product pages for SEO and implemented a responsive design that ensures seamless browsing and ordering across all device types.",
        ],
      },
      {
        title: "Kakaride",
        projectId: "kakaride",
        descriptions: [
          "Built a ride-hailing and logistics platform on WordPress with custom plugins enabling real-time booking, driver management, and location-based ride services.",
          "Implemented API integrations for geolocation, fare calculation, and ride tracking to deliver a seamless user experience across web and mobile interfaces.",
          "Designed a mobile-first responsive interface with intuitive booking flows, driver ratings, and trip history to maximize user retention.",
          "Optimized the site for performance and SEO, ensuring fast load times and high search rankings for ride-hailing and logistics-related queries in Nigeria.",
        ],
      },
    ],
  },
  {
    role: "Web Developer",
    company: "Digisplash",
    period: "Jan 2024 – Mar 2025",
    location: "Lagos, NG",
    descriptions: [
      "Collaborated with the Product Designer to implement website designs.",
      "Developed new features for existing websites.",
      "Customized themes to meet clients’ requirements.",
      "Implemented SEO and web layouts.",
      "Prepared website proposals to present to clients.",
      "Provided technical support to clients.",
    ],
  },
  {
    role: "Website Administrator",
    company: "Lustre Africa",
    period: "Sep 2019 – Dec 2023",
    location: "Lagos, NG",
    descriptions: [
      "Managed and maintained the company’s web infrastructure, ensuring optimal performance and uptime across all digital platforms.",
      "Implemented security best practices and performed regular audits to protect against vulnerabilities.",
      "Coordinated with cross-functional teams to update content, deploy new features, and troubleshoot issues.",
      "Optimized website performance, reducing page load times through caching strategies and code optimization.",
      "Monitored site analytics and provided actionable insights to improve user engagement and conversion rates.",
      "Managed domain registrations, hosting configurations, and SSL certificate renewals.",
    ],
  },
];

/* Budget ranges for the form */
const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 \u2013 $3,000",
  "$3,000 \u2013 $5,000",
  "$5,000 \u2013 $10,000",
  "$10,000 \u2013 $25,000",
  "$25,000+",
];

/* Currency detection by timezone region — client-only to avoid hydration mismatch */
function getCurrencyFromTimezone(): { symbol: string; code: string; ranges: string[] } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const region = tz.split("/")[0];

    if (region === "Africa") {
      return {
        symbol: "\u20A6",
        code: "NGN",
        ranges: [
          "Under \u20A6500,000",
          "\u20A6500,000 \u2013 \u20A61,500,000",
          "\u20A61,500,000 \u2013 \u20A63,000,000",
          "\u20A63,000,000 \u2013 \u20A65,000,000",
          "\u20A65,000,000 \u2013 \u20A615,000,000",
          "\u20A615,000,000+",
        ],
      };
    }
    if (region === "Europe") {
      return {
        symbol: "\u20AC",
        code: "EUR",
        ranges: [
          "Under \u20AC1,000",
          "\u20AC1,000 \u2013 \u20AC3,000",
          "\u20AC3,000 \u2013 \u20AC5,000",
          "\u20AC5,000 \u2013 \u20AC10,000",
          "\u20AC10,000 \u2013 \u20AC25,000",
          "\u20AC25,000+",
        ],
      };
    }
    if (region === "Asia") {
      return {
        symbol: "\u00A5",
        code: "CNY",
        ranges: [
          "Under \u00A57,000",
          "\u00A57,000 \u2013 \u00A522,000",
          "\u00A522,000 \u2013 \u00A536,000",
          "\u00A536,000 \u2013 \u00A572,000",
          "\u00A572,000 \u2013 \u00A5180,000",
          "\u00A5180,000+",
        ],
      };
    }
  } catch {
    /* fallback */
  }
  return {
    symbol: "$",
    code: "USD",
    ranges: BUDGET_RANGES,
  };
}

const DEFAULT_CURRENCY = { symbol: "$", code: "USD", ranges: BUDGET_RANGES };

/* ────────────────────── ANIMATION VARIANTS ────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ──────────────────────── REUSABLE HOOK ──────────────────────── */

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

/* Content wrapper that limits width to 1240px but allows section bg to be full-width */
function ContentWidth({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[1240px] mx-auto w-full ${className}`}>{children}</div>;
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`scroll-mt-20 lg:scroll-mt-0 pt-[90px] lg:pt-[120px] px-4 md:px-4 lg:px-5 ${className}`}
    >
      <ContentWidth>{children}</ContentWidth>
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeInUp}
      className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8 font-mono"
    >
      {children}
    </motion.p>
  );
}

/* ──────────────────── BROWSER MOCKUP CARD ──────────────────── */

function BrowserMockupCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    /* Small delay so the painted frame is ready before hiding spinner */
    setTimeout(() => setLoaded(true), 400);
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="browser-card group"
    >
      {/* Browser chrome */}
      <div className="browser-chrome">
        <span className="browser-dot browser-dot-red" />
        <span className="browser-dot browser-dot-yellow" />
        <span className="browser-dot browser-dot-green" />
        <span className="ml-3 text-[11px] text-muted-foreground/60 font-mono truncate select-none">
          {project.url.replace(/^https?:\/\//, "")}
        </span>
      </div>

      {/* Iframe viewport */}
      <div className="browser-frame">
        {/* Loading spinner overlay */}
        <div className={`iframe-spinner ${loaded ? "hidden" : ""}`}>
          <div className="iframe-spinner-ring" />
          <p className="text-[10px] text-muted-foreground/50 mt-3 font-mono uppercase tracking-widest">
            Loading
          </p>
        </div>

        <iframe
          ref={iframeRef}
          src={project.url}
          title={project.title}
          onLoad={handleLoad}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Card info footer */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-semibold truncate group-hover:text-primary transition-colors hover:underline underline-offset-2"
          >
            {project.title}
          </a>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1.5 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            aria-label={`Visit ${project.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
          </a>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full border border-border text-muted-foreground/70 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Designer credit line */}
        {project.designer && (
          <div className="pt-2 border-t border-border text-[10px] text-muted-foreground/60">
            UI/UX Designer -{" "}
            <a
              href={DESIGNER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground/40"
            >
              {DESIGNER.name}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ──────────────────────── BACK TO TOP ──────────────────────── */

function BackToTop() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    setVisible(v > 0.06);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = useTransform(smoothProgress, (v) => circumference - v * circumference);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, rotate: 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[90] group cursor-pointer"
          aria-label="Back to top"
        >
          {/* Outer glow on hover */}
          <div
            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
            style={{ background: "radial-gradient(circle, rgba(80,200,120,0.2) 0%, transparent 70%)" }}
          />

          {/* Main circle */}
          <div className="relative w-[52px] h-[52px] rounded-full border border-border bg-background/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:border-[#50C878]/50 group-hover:bg-background/95 group-hover:shadow-[0_0_20px_rgba(80,200,120,0.15)]">
            {/* SVG progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <motion.circle
                cx="26" cy="26" r={radius}
                fill="none"
                stroke="#50C878"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>

            {/* Percentage text */}
            <motion.span
              animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.6 : 1 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono font-bold text-[#50C878] tabular-nums select-none"
            >
              {Math.round(smoothProgress.get() * 100)}
            </motion.span>

            {/* Arrow icon (appears on hover) */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6, scale: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute text-[#50C878]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────── MAIN COMPONENT ──────────────────────── */

export default function Portfolio() {
  const activeSection = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "" });

  /* Currency detection — client-only to prevent hydration mismatch */
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [openExpIdx, setOpenExpIdx] = useState(-1);
  const expRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /* Scroll accordion header into view AFTER the expand/collapse animation finishes (300ms).
     Uses "instant" to avoid fighting with the Framer Motion height animation.
     Only adjusts scroll if the header has been pushed above the viewport. */
  useEffect(() => {
    if (openExpIdx >= 0) {
      const timer = setTimeout(() => {
        const el = expRefs.current[openExpIdx];
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < 0) {
            window.scrollBy({ top, behavior: "instant" });
          }
        }
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [openExpIdx]);
  useEffect(() => {
    setCurrency(getCurrencyFromTimezone());
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState("sending");
      try {
        const res = await fetch("/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setFormState("sent");
          setFormData({ name: "", email: "", message: "", budget: "" });
          setTimeout(() => setFormState("idle"), 4000);
        } else {
          setFormState("idle");
          alert("Something went wrong. Please try again.");
        }
      } catch {
        setFormState("idle");
        alert("Network error. Please check your connection and try again.");
      }
    },
    [formData]
  );

  return (
    <div className="min-h-screen flex bg-background grid-pattern">
      {/* ══════════ SIDEBAR ══════════ */}
      <aside className="hidden lg:flex flex-col justify-between fixed left-0 top-0 bottom-0 w-[280px] p-8 border-r border-border z-40 bg-background/80 backdrop-blur-sm">
        <div>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold tracking-tight">
              Joel<span className="text-primary">.</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">
              Web Developer
            </p>
          </motion.div>

          {/* Navigation */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                onClick={() => scrollTo(item.id)}
                className={`nav-link w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all ${
                  activeSection === item.id
                    ? "active text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-xs opacity-60 w-4 text-center">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Social links + contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <a
              href="mailto:joelakinlosotu@gmail.com"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={13} />
              joelakinlosotu@gmail.com
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin size={13} />
              Lagos, Nigeria
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <a
              href="https://linkedin.com/in/joelakinlosotu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a
              href="https://x.com/joelakinlosotu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <ThemeToggle className="mt-2" />
        </motion.div>
      </aside>

      {/* ══════════ MOBILE HEADER ══════════ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-bold tracking-tight">
            Joel<span className="text-primary">.</span>
          </h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border overflow-hidden bg-background"
            >
              <div className="px-5 py-4 space-y-1 mobile-menu-enter">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-md transition-all ${
                      activeSection === item.id
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main className="flex-1 lg:ml-[280px]">
        {/* ─── HERO ─── */}
        <section
          id="home"
          className="flex flex-col justify-start lg:justify-center lg:min-h-screen relative overflow-hidden pt-[120px] lg:pt-0 px-4 md:px-4 lg:px-5"
        >
          {/* Background accent */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <ContentWidth>
            <motion.div
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.div variants={fadeInUp} custom={0} className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary stat-pulse" />
                  Available for freelance work
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                custom={1}
                className="text-[28px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6 glow-text"
              >
                WEB
                <br />
                <span className="text-muted-foreground">DEVELOPER</span>
                <span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                custom={2}
                className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed mb-8"
              >
                Hi! I&apos;m <span className="text-foreground font-medium">Joel Akinlosotu</span>. A
                results-driven Web Developer &amp; Systems Architect with 10+ years of experience
                building high-performance, scalable, and SEO-optimized web solutions.
              </motion.p>

              <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap gap-4 mb-16">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] uppercase"
                >
                  LET&apos;S TALK <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("projects-skills")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium text-sm rounded-md hover:border-foreground/20 transition-all uppercase"
                >
                  VIEW PROJECTS
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                custom={4}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border pt-8"
              >
                {STATS.map((stat, i) => (
                  <motion.div key={stat.label} variants={fadeInUp} custom={5 + i}>
                    <h3 className="text-lg md:text-xl font-bold text-primary">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </ContentWidth>
        </section>

        {/* ─── ABOUT ─── */}
        <Section id="about" className="!pt-[120px]">
          <SectionLabel>// About Me</SectionLabel>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h2
                variants={fadeInUp}
                className="text-xl md:text-3xl font-bold leading-tight mb-8"
              >
                I believe in building digital experiences that drive real results for businesses
                and delight users at every touchpoint.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed mb-6">
                Notable achievements include developing a high-traffic LMS for a Web3 brand that
                secured 20k+ unique visitors within two weeks of launch, and consistently reducing
                website load times by up to 60% through advanced performance optimization.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="p-6 rounded-lg border border-border bg-card/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-primary/10">
                    <GraduationCap size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Federal University of Technology, Akure</p>
                    <p className="text-xs text-muted-foreground">B.Tech. Statistics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-primary/10">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Lagos, Nigeria</p>
                    <p className="text-xs text-muted-foreground">Open to remote &amp; on-site</p>
                  </div>
                </div>

              </div>

              {/* Mini tools grid */}
              <div className="grid grid-cols-3 gap-3">
                {["WordPress", "React", "Figma", "TypeScript", "JavaScript", "SEO"].map((tool) => (
                  <motion.div
                    key={tool}
                    variants={fadeInUp}
                    className="p-3 rounded-lg border border-border bg-card/30 text-center text-xs text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ─── PROJECTS & SKILLS ─── */}
        <Section id="projects-skills">
          <SectionLabel>// Projects &amp; Skills</SectionLabel>
          <motion.h2 variants={fadeInUp} className="text-xl md:text-3xl font-bold mb-12">
            FEATURED WORKS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((project, idx) => (
              <div key={project.id} id={project.slug ? `project-${project.slug}` : undefined}>
                <BrowserMockupCard project={project} index={idx} />
              </div>
            ))}
          </div>

          <motion.h2 variants={fadeInUp} className="text-xl md:text-3xl font-bold mb-12">
            MY STACK
          </motion.h2>

          <div className="space-y-12">
            <div>
              <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                Core Stack
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {SKILLS_CORE.map((skill, i) => (
                  <motion.span
                    key={skill}
                    variants={fadeInUp}
                    custom={i}
                    className="skill-tag px-4 py-2.5 rounded-lg text-sm text-foreground bg-card/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                Key Skills &amp; Expertise
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {SKILLS_KEY.map((skill, i) => (
                  <motion.span
                    key={skill}
                    variants={fadeInUp}
                    custom={i}
                    className="skill-tag px-4 py-2.5 rounded-lg text-sm text-foreground bg-card/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* No-Code / Low-Code row */}
            <div>
              <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                No-Code &amp; Low-Code
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {["Elementor", "Webflow", "Framer", "Wix", "Bubble", "Make (Integromat)", "Zapier", "Airtable"].map(
                  (tool, i) => (
                    <motion.span
                      key={tool}
                      variants={fadeInUp}
                      custom={i}
                      className="skill-tag px-4 py-2.5 rounded-lg text-sm text-foreground bg-card/50"
                    >
                      {tool}
                    </motion.span>
                  )
                )}
              </div>
            </div>

            {/* Tools row */}
            <div>
              <motion.p variants={fadeInUp} className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                Also Work With
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {["WooCommerce", "ACF", "Mailchimp", "Git", "cPanel", "Cloudflare", "Google Analytics", "Yoast SEO", "Rank Math", "WP Rocket", "Canva"].map(
                  (tool, i) => (
                    <motion.span
                      key={tool}
                      variants={fadeInUp}
                      custom={i}
                      className="skill-tag px-4 py-2.5 rounded-lg text-sm text-muted-foreground bg-card/30"
                    >
                      {tool}
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* ─── EXPERIENCE ─── */}
        <Section id="experience">
          <SectionLabel>// Experience</SectionLabel>
          <motion.h2 variants={fadeInUp} className="text-xl md:text-3xl font-bold mb-12">
            MY EXPERIENCE
          </motion.h2>

          <div className="space-y-3">
            {EXPERIENCE.map((exp, idx) => {
              const isOpen = openExpIdx === idx;
              const hasProjects = "projects" in exp && exp.projects;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="border border-border rounded-lg overflow-hidden accordion-item"
                >
                  {/* Accordion header */}
                  <button
                    ref={(el) => { expRefs.current[idx] = el; }}
                    onClick={() => {
                      setOpenExpIdx(isOpen ? -1 : idx);
                    }}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-card/60 transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="text-sm md:text-base font-semibold">{exp.role} / {exp.company}</h3>
                      <div className="flex items-center gap-2 text-xs text-primary font-mono mt-1">
                        <Calendar size={12} />
                        {exp.period.toUpperCase()} ({exp.location})
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0 ml-4 [animation:pulse-chevron_2s_ease-in-out_infinite]"
                    >
                      <svg className="w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </motion.span>
                  </button>

                  {/* Accordion body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-5">
                          <ul className="space-y-3">
                            {exp.descriptions.map((desc, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                                {desc}
                              </li>
                            ))}
                          </ul>

                          {/* Freelance sub-projects */}
                          {hasProjects && (
                            <div className="space-y-5 pt-3 border-t border-border">
                              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                                Notable Projects
                              </p>
                              {(exp as typeof EXPERIENCE[number] & { projects: Array<{ title: string; projectId: string; descriptions: string[] }> }).projects.map((proj, pi) => (
                                <div key={pi} className="pl-4 border-l-2 border-primary/20">
                                  <a
                                    href={`#project-${proj.projectId}`}
                                    onClick={(e) => { e.preventDefault(); scrollTo(`project-${proj.projectId}`); }}
                                    className="text-sm font-semibold hover:text-primary transition-colors underline underline-offset-2 decoration-border hover:decoration-primary/40"
                                  >
                                    {proj.title}
                                  </a>
                                  <ul className="mt-2 space-y-2">
                                    {proj.descriptions.map((d, di) => (
                                      <li
                                        key={di}
                                        className="flex items-start gap-3 text-xs text-muted-foreground/80 leading-relaxed"
                                      >
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/30 shrink-0" />
                                        {d}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ─── CONTACT ─── */}
        <Section id="contact">
          <SectionLabel>// Get in Touch</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <motion.h2
                variants={fadeInUp}
                className="text-xl md:text-3xl font-bold leading-tight mb-6"
              >
                Have a project in mind? Let&apos;s build something great together.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed mb-10">
                Whether you need a custom website, performance optimization, or ongoing
                web administration, I&apos;m here to help bring your vision to life. Feel free to
                reach out. I typically respond within 24 hours.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                <a
                  href="mailto:joelakinlosotu@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2.5 rounded-md border border-border group-hover:border-primary/20 transition-colors">
                    <Mail size={16} />
                  </div>
                  joelakinlosotu@gmail.com
                </a>
                <a
                  href="tel:+2349068971351"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2.5 rounded-md border border-border group-hover:border-primary/20 transition-colors">
                    <Phone size={16} />
                  </div>
                  +234 906 897 1351
                </a>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-5 p-6 md:p-8 rounded-lg border border-border bg-card/30"
            >
              {formState === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl md:text-lg font-semibold mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="form-input w-full px-4 py-3 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="form-input w-full px-4 py-3 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Budget ({currency.code})
                    </label>
                    <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="form-input w-full px-4 py-3 rounded-md text-sm text-foreground appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Select your budget range
                        </option>
                        {currency.ranges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="form-input w-full px-4 py-3 rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium text-sm rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </Section>

        {/* ─── FOOTER ─── */}
        <footer className="py-8 border-t border-border px-4 lg:px-5 mt-[90px] lg:mt-[120px]">
          <ContentWidth className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Joel Akinlosotu. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/joelakinlosotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="https://x.com/joelakinlosotu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </ContentWidth>
        </footer>
      </main>

      {/* ══════════ PROJECT MODAL ══════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background/95 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 border border-border hover:border-foreground/20 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Screenshot */}
              <div className="screenshot-mockup">
                <div
                  className="w-full aspect-video bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <p className="text-xs text-primary font-mono mb-2">
                    PROJECT _{String(selectedProject.id).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg md:text-2xl font-bold">{selectedProject.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs rounded-full border border-primary/20 bg-primary/5 text-primary font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Designer credit in modal */}
                {selectedProject.designer && (
                  <p className="text-xs text-muted-foreground">
                    UI/UX Designer:{" "}
                    <a
                      href={DESIGNER.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground/40"
                    >
                      {DESIGNER.name}
                    </a>
                  </p>
                )}

                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-md hover:bg-primary/90 transition-all"
                >
                  Visit Live Site <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <BackToTop />
    </div>
  );
}