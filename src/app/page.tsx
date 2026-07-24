"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

/* ─── Counter hook: animates from 0 → target when in view ─── */
function useCountUp(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
    let start = null;
    let raf;
    const step = (ts) => {
      const s = start ?? ts;
      start = s;
      const progress = Math.min((ts - s) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}
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
  { value: "50+", label: "Projects Completed", target: 50, suffix: "+" },
  { value: "95%", label: "Client Satisfaction", target: 95, suffix: "%" },
  { value: "10+", label: "Years Experience", target: 10, suffix: "+" },
  { value: "20k+", label: "Unique Visitors (LMS Launch)", target: 20, suffix: "k+" },
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
      "A full-service aviation company website offering private jet charter, helicopter services, air cargo logistics, FBO operations, and MRO services, with an integrated booking system and a fleet showcase built on WordPress.",
    url: "https://flyelinair.com/",
    image: "/screenshots/flyelinair.png",
    tags: ["WordPress", "Elementor", "Booking System", "Fleet Management", "SEO"],
    designer: true,
  },
  {
    id: 2,
    slug: "clayton-prints",
    title: "Clayton Prints",
    description:
      "An e-commerce store selling printing equipment and supplies — cutting machines, heat presses, sublimation printers, DTF printers, vinyls, inks, and accessories — with a large product catalog and WooCommerce integration.",
    url: "https://claytonprints.com/",
    image: "/screenshots/claytonprints.png",
    tags: ["WordPress", "WooCommerce", "Elementor", "E-Commerce"],
    designer: true,
  },
  {
    id: 3,
    title: "Cedar Rush",
    description:
      "A corporate website for Nigeria's leading creative production and media company, showcasing 20+ years of event production, TV & documentary production, commercials, and strategic media execution for top brands.",
    url: "https://cedarrush.ng/",
    image: "/screenshots/cedarrush.png",
    tags: ["WordPress", "Elementor", "Media", "Portfolio", "SEO"],
  },
  {
    id: 4,
    slug: "kakaride",
    title: "Kakaride",
    description:
      "A Nigerian ride-hailing web platform offering solo rides, carpooling, car rentals, and corporate booking, with fare estimation, ride tracking, and driver management features built on WordPress.",
    url: "https://kakaride.ng/",
    image: "/screenshots/kakaride.png",
    tags: ["WordPress", "Custom Plugins", "API Integration", "Mobile-First", "Elementor", "SEO"],
    designer: true,
  },
  {
    id: 5,
    title: "Diamond Source Jewelers",
    description:
      "A fine jewelry e-commerce store for a 45-year-old Denver-based jeweler, featuring custom engagement ring design, fine jewelry collections, jewelry buying services, and certified appraisals — backed by a 4.9/5 Google rating.",
    url: "https://www.diamondsourcejewelers.com",
    image: "/screenshots/diamondsourcejewelers.png",
    tags: ["WordPress", "WooCommerce", "E-Commerce", "Luxury Brand", "Elementor", "SEO"],
  },
  {
    id: 6,
    slug: "designed-spaces-by-yemi",
    title: "Designed Spaces by Yemi",
    description:
      "A professional interior design studio website showcasing residential and commercial projects with a portfolio gallery, categorized showcases, and a consultation booking system built on WordPress.",
    url: "https://designedspacesbyyemi.com/",
    image: "/screenshots/designedspacesbyyemi.png",
    tags: ["WordPress", "Elementor", "Portfolio", "Booking System", "SEO"],
  },
  {
    id: 6,
    title: "Evan Micky Photography",
    description:
      "A documentary-style wedding and portrait photography portfolio showcasing engagement sessions, family portraits, and newborn/maternity shoots, with an immersive gallery and seamless inquiry flows.",
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
          "Built a comprehensive aviation website for a full-service charter company offering private jet charter, helicopter transfers, air cargo logistics, FBO operations, and aircraft MRO services.",
          "Developed a detailed fleet showcase featuring specs for a Challenger 604/605, A109E Helicopter, Embraer 145 (50 seats), and Boeing 737 — with individual service pages for charter, cargo, and maintenance.",
          "Designed a responsive, mobile-first layout with Elementor that communicates luxury and professionalism, aligning with the brand's premium positioning in private aviation across Nigeria and Africa.",
          "Implemented SEO-optimized service pages, a quote request system, and a membership/pay-as-you-fly billing section to streamline client inquiries and bookings.",
        ],
      },
      {
        title: "Clayton Prints",
        projectId: "clayton-prints",
        descriptions: [
          "Built a WooCommerce e-commerce store for a printing equipment supplier, featuring a large catalog of cutting machines (Cricut, Silhouette), heat presses, sublimation printers, DTF printers, and related consumables.",
          "Structured the product hierarchy across 8+ equipment categories — including cutting machines, heat presses, printers, laminators, and engravers — with brand-based navigation and bundled starter kits.",
          "Integrated a seamless checkout flow with the local Nigerian payment gateway and configured shipping options for both domestic and international orders.",
          "Optimized the site for SEO and performance, handling a large product catalog while maintaining fast load times and smooth browsing on all devices.",
        ],
      },
      {
        title: "Kakaride",
        projectId: "kakaride",
        descriptions: [
          "Built a ride-hailing web platform on WordPress with custom plugins supporting four service tiers — solo rides, carpooling, car rentals with drivers, and corporate ride accounts.",
          "Implemented fare estimation, ride tracking, and an OTP-secured trip system to deliver a safe and transparent e-hailing experience for Nigerian commuters.",
          "Designed a mobile-first responsive interface with a streamlined booking flow — from pickup/drop-off entry to driver details and trip history — optimized for user retention.",
          "Optimized the site for performance and SEO with dedicated landing pages for each service category, ensuring strong search visibility for ride-hailing queries in Nigeria.",
        ],
      },
      {
        title: "Diamond Source Jewelers",
        projectId: "diamond-source-jewelers",
        descriptions: [
          "Built a WooCommerce e-commerce store for a 45-year-old fine jewelry business in Denver, Colorado, featuring custom engagement ring design, fine jewelry collections, and a jewelry buying service.",
          "Developed a 'Design Your Own Engagement Ring' configurator, along with categorized product pages for rings, earrings, necklaces, and bracelets — filtering by style, shape, and stone type.",
          "Implemented service booking flows for jewelry repairs, appraisals, and cleaning/inspections, alongside a consultation scheduling system backed by a 4.9/5 Google rating across 100+ reviews.",
          "Optimized the site for local SEO targeting Denver and Greenwood Village, ensuring strong search visibility for diamond, engagement ring, and jewelry-buying queries in the Colorado market.",
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

/* ────────────── CURRENCY DETECTION (country-level) ────────────── */

/* Base USD thresholds used to generate local-currency budget ranges */
const USD_THRESHOLDS = [1000, 3000, 5000, 10000, 25000];

/* Nigeria-specific thresholds in NGN */
const NGN_THRESHOLDS = [500000, 1500000, 3000000, 5000000, 10000000];

function fmtNum(n) { return n.toLocaleString("en-US"); }

function makeRanges(symbol, rate, thresholds?) {
  thresholds = thresholds || USD_THRESHOLDS;
  var loc = thresholds.map(function(t) { return Math.round(t * rate); });
  return [
    { label: "Under " + symbol + fmtNum(loc[0]), isCustom: true },
    { label: symbol + fmtNum(loc[0]) + " \u2013 " + symbol + fmtNum(loc[1]) },
    { label: symbol + fmtNum(loc[1]) + " \u2013 " + symbol + fmtNum(loc[2]) },
    { label: symbol + fmtNum(loc[2]) + " \u2013 " + symbol + fmtNum(loc[3]) },
    { label: symbol + fmtNum(loc[3]) + " \u2013 " + symbol + fmtNum(loc[4]) },
    { label: symbol + fmtNum(loc[4]) + "+" },
  ];
}

/* Timezone → { symbol, code, rate (vs USD), useNGN (bool) } */
const TZ_MAP = {
  /* ── Africa ── */
  "Africa/Lagos":                          { s: "\u20A6", c: "NGN", r: 1, useNGN: true },
  "Africa/Douala":                         { s: "CFA", c: "XAF", r: 600 },
  "Africa/Bangui":                         { s: "CFA", c: "XAF", r: 600 },
  "Africa/Brazzaville":                    { s: "CFA", c: "XAF", r: 600 },
  "Africa/Libreville":                     { s: "CFA", c: "XAF", r: 600 },
  "Africa/Malabo":                         { s: "CFA", c: "XAF", r: 600 },
  "Africa/Ndjamena":                       { s: "CFA", c: "XAF", r: 600 },
  "Africa/Kinshasa":                       { s: "CFA", c: "XAF", r: 600 },
  "Africa/Accra":                          { s: "\u20B5", c: "GHS", r: 15 },
  "Africa/Nairobi":                        { s: "KSh", c: "KES", r: 150 },
  "Africa/Johannesburg":                   { s: "R", c: "ZAR", r: 18 },
  "Africa/Cairo":                          { s: "E\u00A3", c: "EGP", r: 48 },
  "Africa/Casablanca":                     { s: "MAD", c: "MAD", r: 10 },
  "Africa/Tunis":                          { s: "TND", c: "TND", r: 3.1 },
  "Africa/Algiers":                        { s: "DZD", c: "DZD", r: 134 },
  "Africa/Abidjan":                        { s: "CFA", c: "XOF", r: 600 },
  "Africa/Dakar":                          { s: "CFA", c: "XOF", r: 600 },
  "Africa/Bamako":                         { s: "CFA", c: "XOF", r: 600 },
  "Africa/Ouagadougou":                    { s: "CFA", c: "XOF", r: 600 },
  "Africa/Niamey":                         { s: "CFA", c: "XOF", r: 600 },
  "Africa/Porto-Novo":                     { s: "CFA", c: "XOF", r: 600 },
  "Africa/Lome":                           { s: "CFA", c: "XOF", r: 600 },
  "Africa/Conakry":                        { s: "CFA", c: "XOF", r: 600 },
  "Africa/Bissau":                         { s: "CFA", c: "XOF", r: 600 },
  "Africa/Freetown":                       { s: "CFA", c: "XOF", r: 600 },
  "Africa/Monrovia":                       { s: "CFA", c: "XOF", r: 600 },
  "Africa/Dar_es_Salaam":                  { s: "TZS", c: "TZS", r: 2650 },
  "Africa/Kampala":                        { s: "UGX", c: "UGX", r: 3700 },
  "Africa/Addis_Ababa":                    { s: "Br", c: "ETB", r: 57 },
  "Africa/Maputo":                         { s: "MZN", c: "MZN", r: 64 },
  "Africa/Harare":                         { s: "ZWL", c: "ZWL", r: 3600 },
  "Africa/Lusaka":                         { s: "ZMW", c: "ZMW", r: 27 },
  "Africa/Kigali":                         { s: "FRw", c: "RWF", r: 1300 },
  "Africa/Antananarivo":                   { s: "Ar", c: "MGA", r: 4500 },
  "Africa/Mogadishu":                      { s: "Sh", c: "SOS", r: 570 },
  "Africa/Tripoli":                        { s: "LD", c: "LYD", r: 4.9 },
  "Africa/Khartoum":                       { s: "SDG", c: "SDG", r: 600 },
  "Africa/Windhoek":                       { s: "N$", c: "NAD", r: 18 },
  "Africa/Blantyre":                       { s: "MK", c: "MWK", r: 1720 },
  "Africa/Gaborone":                       { s: "P", c: "BWP", r: 13.7 },

  /* ── Europe ── */
  "Europe/London":                         { s: "\u00A3", c: "GBP", r: 0.79 },
  "Europe/Dublin":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Paris":                          { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Berlin":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Madrid":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Rome":                           { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Amsterdam":                      { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Brussels":                       { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Vienna":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Helsinki":                       { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Lisbon":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Athens":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Tallinn":                        { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Vilnius":                        { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Riga":                           { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Ljubljana":                      { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Bratislava":                     { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Zagreb":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Luxembourg":                     { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Valletta":                       { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Nicosia":                        { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Zurich":                         { s: "CHF", c: "CHF", r: 0.88 },
  "Europe/Stockholm":                      { s: "kr", c: "SEK", r: 10.5 },
  "Europe/Oslo":                           { s: "kr", c: "NOK", r: 10.8 },
  "Europe/Copenhagen":                     { s: "kr", c: "DKK", r: 6.9 },
  "Europe/Warsaw":                         { s: "z\u0142", c: "PLN", r: 4 },
  "Europe/Prague":                         { s: "K\u010D", c: "CZK", r: 23 },
  "Europe/Budapest":                       { s: "Ft", c: "HUF", r: 365 },
  "Europe/Bucharest":                      { s: "lei", c: "RON", r: 4.6 },
  "Europe/Sofia":                          { s: "\u043B\u0432", c: "BGN", r: 1.8 },
  "Europe/Belgrade":                       { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Podgorica":                      { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Sarajevo":                       { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Skopje":                         { s: "\u20AC", c: "EUR", r: 0.92 },
  "Europe/Istanbul":                       { s: "\u20BA", c: "TRY", r: 32 },
  "Europe/Moscow":                         { s: "\u20BD", c: "RUB", r: 90 },
  "Europe/Samara":                         { s: "\u20BD", c: "RUB", r: 90 },
  "Europe/Kiev":                           { s: "\u20B4", c: "UAH", r: 40 },
  "Europe/Uzhgorod":                       { s: "\u20B4", c: "UAH", r: 40 },
  "Europe/Minsk":                          { s: "Br", c: "BYN", r: 3.2 },
  "Europe/Reykjavik":                      { s: "kr", c: "ISK", r: 138 },
  "Europe/Tirane":                         { s: "L", c: "ALL", r: 95 },

  /* ── Americas ── */
  "America/New_York":                      { s: "$", c: "USD", r: 1 },
  "America/Chicago":                       { s: "$", c: "USD", r: 1 },
  "America/Denver":                        { s: "$", c: "USD", r: 1 },
  "America/Los_Angeles":                   { s: "$", c: "USD", r: 1 },
  "America/Anchorage":                     { s: "$", c: "USD", r: 1 },
  "America/Phoenix":                       { s: "$", c: "USD", r: 1 },
  "America/Detroit":                       { s: "$", c: "USD", r: 1 },
  "America/Indiana/Indianapolis":          { s: "$", c: "USD", r: 1 },
  "America/Kentucky/Louisville":           { s: "$", c: "USD", r: 1 },
  "America/Boise":                         { s: "$", c: "USD", r: 1 },
  "America/Toronto":                       { s: "C$", c: "CAD", r: 1.37 },
  "America/Vancouver":                     { s: "C$", c: "CAD", r: 1.37 },
  "America/Montreal":                      { s: "C$", c: "CAD", r: 1.37 },
  "America/Edmonton":                      { s: "C$", c: "CAD", r: 1.37 },
  "America/Winnipeg":                      { s: "C$", c: "CAD", r: 1.37 },
  "America/Halifax":                       { s: "C$", c: "CAD", r: 1.37 },
  "America/Regina":                        { s: "C$", c: "CAD", r: 1.37 },
  "America/Mexico_City":                   { s: "MX$", c: "MXN", r: 17 },
  "America/Cancun":                        { s: "MX$", c: "MXN", r: 17 },
  "America/Monterrey":                     { s: "MX$", c: "MXN", r: 17 },
  "America/Sao_Paulo":                     { s: "R$", c: "BRL", r: 5 },
  "America/Rio_Branco":                    { s: "R$", c: "BRL", r: 5 },
  "America/Manaus":                        { s: "R$", c: "BRL", r: 5 },
  "America/Argentina/Buenos_Aires":        { s: "AR$", c: "ARS", r: 900 },
  "America/Bogota":                        { s: "COL$", c: "COP", r: 4150 },
  "America/Lima":                          { s: "S/", c: "PEN", r: 3.7 },
  "America/Santiago":                      { s: "CLP$", c: "CLP", r: 950 },
  "America/Caracas":                       { s: "Bs.", c: "VES", r: 36 },
  "America/Guayaquil":                     { s: "$", c: "USD", r: 1 },
  "America/Quito":                         { s: "$", c: "USD", r: 1 },
  "America/La_Paz":                        { s: "Bs", c: "BOB", r: 6.9 },
  "America/Asuncion":                      { s: "Gs", c: "PYG", r: 7300 },
  "America/Montevideo":                    { s: "U$", c: "UYU", r: 40 },
  "America/Tegucigalpa":                   { s: "L", c: "HNL", r: 25 },
  "America/Managua":                       { s: "C$", c: "NIO", r: 37 },
  "America/San_Jose":                      { s: "\u20A1", c: "CRC", r: 530 },
  "America/Panama":                        { s: "B/.", c: "USD", r: 1 },
  "America/Havana":                        { s: "$", c: "CUP", r: 24 },
  "America/Santo_Domingo":                 { s: "RD$", c: "DOP", r: 60 },
  "America/Port-au-Prince":                { s: "G", c: "HTG", r: 133 },
  "America/Jamaica":                       { s: "J$", c: "JMD", r: 158 },

  /* ── Asia ── */
  "Asia/Tokyo":                            { s: "\u00A5", c: "JPY", r: 155 },
  "Asia/Shanghai":                         { s: "\u00A5", c: "CNY", r: 7.2 },
  "Asia/Chongqing":                        { s: "\u00A5", c: "CNY", r: 7.2 },
  "Asia/Harbin":                           { s: "\u00A5", c: "CNY", r: 7.2 },
  "Asia/Urumqi":                           { s: "\u00A5", c: "CNY", r: 7.2 },
  "Asia/Hong_Kong":                        { s: "HK$", c: "HKD", r: 7.8 },
  "Asia/Taipei":                           { s: "NT$", c: "TWD", r: 32 },
  "Asia/Seoul":                            { s: "\u20A9", c: "KRW", r: 1370 },
  "Asia/Singapore":                        { s: "S$", c: "SGD", r: 1.34 },
  "Asia/Kolkata":                          { s: "\u20B9", c: "INR", r: 83 },
  "Asia/Calcutta":                         { s: "\u20B9", c: "INR", r: 83 },
  "Asia/Mumbai":                           { s: "\u20B9", c: "INR", r: 83 },
  "Asia/Chennai":                          { s: "\u20B9", c: "INR", r: 83 },
  "Asia/Bangalore":                        { s: "\u20B9", c: "INR", r: 83 },
  "Asia/Hyderabad":                        { s: "\u20B9", c: "INR", r: 83 },
  "Asia/New_Delhi":                        { s: "\u20B9", c: "INR", r: 83 },
  "Asia/Bangkok":                          { s: "\u0E3F", c: "THB", r: 35 },
  "Asia/Dubai":                            { s: "AED", c: "AED", r: 3.67 },
  "Asia/Muscat":                           { s: "AED", c: "AED", r: 3.67 },
  "Asia/Riyadh":                           { s: "SAR", c: "SAR", r: 3.75 },
  "Asia/Qatar":                            { s: "SAR", c: "SAR", r: 3.75 },
  "Asia/Karachi":                          { s: "Rs", c: "PKR", r: 278 },
  "Asia/Lahore":                           { s: "Rs", c: "PKR", r: 278 },
  "Asia/Dhaka":                            { s: "\u09F3", c: "BDT", r: 121 },
  "Asia/Jakarta":                          { s: "Rp", c: "IDR", r: 15800 },
  "Asia/Kuala_Lumpur":                     { s: "RM", c: "MYR", r: 4.7 },
  "Asia/Manila":                           { s: "\u20B1", c: "PHP", r: 58 },
  "Asia/Ho_Chi_Minh":                      { s: "\u20AB", c: "VND", r: 25000 },
  "Asia/Phnom_Penh":                       { s: "\u17DB", c: "KHR", r: 4100 },
  "Asia/Yangon":                           { s: "K", c: "MMK", r: 2100 },
  "Asia/Colombo":                          { s: "Rs", c: "LKR", r: 305 },
  "Asia/Kathmandu":                        { s: "Rs", c: "NPR", r: 133 },
  "Asia/Dili":                             { s: "$", c: "USD", r: 1 },
  "Asia/Bishkek":                          { s: "som", c: "KGS", r: 89 },
  "Asia/Tashkent":                         { s: "so\u02BCm", c: "UZS", r: 12800 },
  "Asia/Almaty":                           { s: "\u20B8", c: "KZT", r: 456 },
  "Asia/Ashgabat":                         { s: "m", c: "TMT", r: 3.5 },
  "Asia/Kabul":                            { s: "\u060B", c: "AFN", r: 71 },
  "Asia/Tehran":                           { s: "\uFDFC", c: "IRR", r: 42000 },
  "Asia/Baku":                             { s: "\u20BC", c: "AZN", r: 1.7 },
  "Asia/Tbilisi":                          { s: "\u20BE", c: "GEL", r: 2.7 },
  "Asia/Yerevan":                          { s: "\u058F", c: "AMD", r: 388 },
  "Asia/Jerusalem":                        { s: "\u20AA", c: "ILS", r: 3.7 },

  /* ── Oceania ── */
  "Australia/Sydney":                      { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Melbourne":                   { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Perth":                       { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Brisbane":                    { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Adelaide":                    { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Darwin":                      { s: "A$", c: "AUD", r: 1.55 },
  "Pacific/Auckland":                      { s: "NZ$", c: "NZD", r: 1.72 },
  "Pacific/Fiji":                          { s: "FJ$", c: "FJD", r: 2.25 },
};

function lookupTZ(tz) { return TZ_MAP[tz] || null; }

const LANG_TZ = {
  "GB": "Europe/London", "NG": "Africa/Lagos", "CM": "Africa/Douala",
  "GH": "Africa/Accra", "KE": "Africa/Nairobi", "ZA": "Africa/Johannesburg",
  "US": "America/New_York", "CA": "America/Toronto", "JP": "Asia/Tokyo",
  "CN": "Asia/Shanghai", "IN": "Asia/Kolkata", "DE": "Europe/Berlin",
  "FR": "Europe/Paris", "BR": "America/Sao_Paulo", "AU": "Australia/Sydney",
  "AE": "Asia/Dubai", "SA": "Asia/Riyadh", "PK": "Asia/Karachi",
  "BD": "Asia/Dhaka", "PH": "Asia/Manila", "MY": "Asia/Kuala_Lumpur",
  "ID": "Asia/Jakarta", "TH": "Asia/Bangkok", "VN": "Asia/Ho_Chi_Minh",
  "EG": "Africa/Cairo", "MA": "Africa/Casablanca", "TN": "Africa/Tunis",
  "TZ": "Africa/Dar_es_Salaam", "UG": "Africa/Kampala", "ET": "Africa/Addis_Ababa",
  "SE": "Europe/Stockholm", "NO": "Europe/Oslo", "DK": "Europe/Copenhagen",
  "PL": "Europe/Warsaw", "CH": "Europe/Zurich", "TR": "Europe/Istanbul",
  "RU": "Europe/Moscow", "UA": "Europe/Kiev", "MX": "America/Mexico_City",
  "CO": "America/Bogota", "PE": "America/Lima", "CL": "America/Santiago",
  "AR": "America/Argentina/Buenos_Aires", "KR": "Asia/Seoul", "SG": "Asia/Singapore",
  "NZ": "Pacific/Auckland", "IE": "Europe/Dublin", "IT": "Europe/Rome",
  "ES": "Europe/Madrid", "NL": "Europe/Amsterdam", "BE": "Europe/Brussels",
  "PT": "Europe/Lisbon", "AT": "Europe/Vienna", "FI": "Europe/Helsinki",
  "GR": "Europe/Athens", "CZ": "Europe/Prague", "HU": "Europe/Budapest",
  "RO": "Europe/Bucharest", "IL": "Asia/Jerusalem",
  "SN": "Africa/Dakar", "CI": "Africa/Abidjan", "ML": "Africa/Bamako",
  "BF": "Africa/Ouagadougou", "NE": "Africa/Niamey", "BJ": "Africa/Porto-Novo",
  "TG": "Africa/Lome", "GN": "Africa/Conakry", "SL": "Africa/Freetown",
  "LR": "Africa/Monrovia", "TD": "Africa/Ndjamena", "CG": "Africa/Brazzaville",
  "GA": "Africa/Libreville", "GQ": "Africa/Malabo", "CF": "Africa/Bangui",
  "CD": "Africa/Kinshasa", "ZM": "Africa/Lusaka", "RW": "Africa/Kigali",
  "MG": "Africa/Antananarivo", "SO": "Africa/Mogadishu", "LY": "Africa/Tripoli",
  "SD": "Africa/Khartoum", "NA": "Africa/Windhoek", "MW": "Africa/Blantyre",
  "MZ": "Africa/Maputo", "BW": "Africa/Gaborone",
};

function regionFallback(tz) {
  var region = tz.split("/")[0];
  if (region === "Europe") return { s: "\u20AC", c: "EUR", r: 0.92 };
  if (region === "Africa") return { s: "\u20AC", c: "EUR", r: 0.92 };
  if (region === "Asia") return { s: "$", c: "USD", r: 1 };
  return { s: "$", c: "USD", r: 1 };
}

function getCurrencyFromTimezone() {
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    var cfg = lookupTZ(tz);
    if (cfg) {
      if (cfg.useNGN) return { symbol: cfg.s, code: cfg.c, r: cfg.r, ranges: makeRanges(cfg.s, cfg.r, NGN_THRESHOLDS) };
      return { symbol: cfg.s, code: cfg.c, r: cfg.r, ranges: makeRanges(cfg.s, cfg.r) };
    }
  } catch (e) {}
  try {
    var lang = (navigator.language || "").split("-")[1] || "";
    if (lang && LANG_TZ[lang]) {
      var cfg2 = lookupTZ(LANG_TZ[lang]);
      if (cfg2) {
        if (cfg2.useNGN) return { symbol: cfg2.s, code: cfg2.c, r: cfg2.r, ranges: makeRanges(cfg2.s, cfg2.r, NGN_THRESHOLDS) };
        return { symbol: cfg2.s, code: cfg2.c, r: cfg2.r, ranges: makeRanges(cfg2.s, cfg2.r) };
      }
    }
  } catch (e) {}
  try {
    var tz2 = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    var cfg3 = regionFallback(tz2);
    return { symbol: cfg3.s, code: cfg3.c, r: cfg3.r, ranges: makeRanges(cfg3.s, cfg3.r) };
  } catch (e) {}
  return { symbol: "$", code: "USD", r: 1, ranges: makeRanges("$", 1) };
}

const DEFAULT_CURRENCY = { symbol: "$", code: "USD", r: 1, ranges: makeRanges("$", 1) };


function handleCustomBudget(ranges, currencyCode, onBudgetSelect) {
  return function(selectedRange) {
    if (selectedRange && selectedRange.isCustom) {
      var budget = prompt("Enter your budget in " + currencyCode + ":");
      if (budget && !isNaN(Number(budget)) && Number(budget) > 0) {
        onBudgetSelect(currencyCode + " " + fmtNum(Number(budget)));
      } else if (budget !== null) {
        alert("Please enter a valid number greater than 0");
      }
    } else if (selectedRange) {
      onBudgetSelect(selectedRange.label);
    }
  };
}

/* ────────────────────── ANIMATION VARIANTS ────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
      className="text-[12px] uppercase tracking-[0.3em] text-muted-foreground mb-8 font-mono"
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
        <span className="ml-3 text-[12px] text-muted-foreground/60 font-mono truncate select-none">
          {project.url.replace(/^https?:\/\//, "")}
        </span>
      </div>

      {/* Iframe viewport */}
      <div className="browser-frame">
        {/* Loading spinner overlay */}
        <div className={`iframe-spinner ${loaded ? "hidden" : ""}`}>
          <div className="iframe-spinner-ring" />
          <p className="text-[12px] text-muted-foreground/50 mt-3 font-mono uppercase tracking-widest">
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
            className="text-[14px] md:text-[16px] font-semibold truncate group-hover:text-primary transition-colors hover:underline underline-offset-2"
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
              className="px-2 py-0.5 text-[12px] rounded-full border border-border text-muted-foreground/70 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Designer credit line */}
        {project.designer && (
          <div className="pt-2 border-t border-border text-[12px] text-muted-foreground/60">
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

/* ─── Animated counter stat ─── */
function CountingStat({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(stat.target, inView);
  return (
    <motion.div ref={ref} variants={fadeInUp} custom={5 + index}>
      <h3 className="text-xl md:text-[40px] font-bold text-primary tabular-nums">
        {inView ? count + stat.suffix : '0' + stat.suffix}
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
    </motion.div>
  );
}

/* ──────────────────────── MAIN COMPONENT ──────────────────────── */

export default function Portfolio() {
  const activeSection = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "" });
  const [budgetError, setBudgetError] = useState("");


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
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate budget before sending
      if (formData.budget) {
        const val = Number(formData.budget);
        let minBudget;
        if (currency.code === 'NGN') {
          minBudget = 250000;
        } else if (currency.code === 'GBP') {
          minBudget = 500;
        } else if (currency.code === 'EUR') {
          minBudget = 500;
        } else {
          const rate = currency.r || 1;
          minBudget = Math.round(500 * rate);
        }
        if (val < minBudget) {
          setBudgetError('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
          return;
        }
      }
      
      setFormState("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setFormState("sent");
          setFormData({ name: "", email: "", message: "", budget: "" });
          setBudgetError("");
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
    [formData, currency.code, currency.r]
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
            <p className="text-[14px] text-muted-foreground mt-1 tracking-wider uppercase">
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
                className={`nav-link w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm md:text-[18px] rounded-md transition-all ${
                  activeSection === item.id
                    ? "active text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-xs md:text-sm opacity-60 w-4 text-center">{item.icon}</span>
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
              className="flex items-center gap-2 text-[14px] text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={13} />
              joelakinlosotu@gmail.com
            </a>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <MapPin size={13} />
              Lagos, Nigeria
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <a
              href="https://www.linkedin.com/in/joel-akinlosotu-44b70a149/"
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
          <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight">
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
                    className={`w-full text-left px-3 py-2.5 text-[16px] md:text-[18px] rounded-md transition-all ${
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
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[12px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary stat-pulse" />
                  Available
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                custom={1}
                className="text-[40px] md:text-6xl lg:text-7xl font-bold tracking-tight leading-[44px] md:leading-[0.95] mb-6 glow-text"
              >
                WEB
                <br />
                <span className="text-muted-foreground">DEVELOPER</span>
                <span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                custom={2}
                className="text-[18px] text-muted-foreground max-w-xl leading-relaxed mb-8"
              >
                Hi! I&apos;m <span className="text-foreground font-medium">Joel Akinlosotu</span>. A
                results-driven Web Developer &amp; Systems Architect with 10+ years of experience
                building high-performance, scalable, and SEO-optimized web solutions.
              </motion.p>

              <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap gap-4 mb-16">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm md:text-[18px] rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] uppercase"
                >
                  LET&apos;S TALK <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("projects-skills")}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium text-sm md:text-[18px] rounded-md hover:border-foreground/20 transition-all uppercase"
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
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
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
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-8"
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
                    <p className="font-medium text-sm md:text-[18px]">Federal University of Technology, Akure</p>
                    <p className="text-xs md:text-sm text-muted-foreground">B.Tech. Statistics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-primary/10">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-[18px]">Lagos, Nigeria</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Open to remote &amp; on-site</p>
                  </div>
                </div>

              </div>

              {/* Mini tools grid */}
              <div className="grid grid-cols-3 gap-3">
                {["WordPress", "React", "Figma", "TypeScript", "JavaScript", "SEO"].map((tool) => (
                  <motion.div
                    key={tool}
                    variants={fadeInUp}
                    className="p-3 rounded-lg border border-border bg-card/30 text-center text-[14px] text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
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
          <motion.h2 variants={fadeInUp} className="text-[28px] md:text-[40px] font-bold mb-12">
            FEATURED WORKS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((project, idx) => (
              <div key={project.id} id={project.slug ? `project-${project.slug}` : undefined}>
                <BrowserMockupCard project={project} index={idx} />
              </div>
            ))}
          </div>

          <motion.h2 variants={fadeInUp} className="text-[28px] md:text-[40px] font-bold mb-12">
            MY STACK
          </motion.h2>

          <div className="space-y-12">
            <div>
              <motion.p variants={fadeInUp} className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                Core Stack
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {SKILLS_CORE.map((skill, i) => (
                  <motion.span
                    key={skill}
                    variants={fadeInUp}
                    custom={i}
                    className="skill-tag px-4 py-2.5 rounded-lg text-sm md:text-[18px] text-foreground bg-card/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <motion.p variants={fadeInUp} className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                Key Skills &amp; Expertise
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {SKILLS_KEY.map((skill, i) => (
                  <motion.span
                    key={skill}
                    variants={fadeInUp}
                    custom={i}
                    className="skill-tag px-4 py-2.5 rounded-lg text-sm md:text-[18px] text-foreground bg-card/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* No-Code / Low-Code row */}
            <div>
              <motion.p variants={fadeInUp} className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
                No-Code &amp; Low-Code
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {["Elementor", "Webflow", "Framer", "Wix", "Bubble", "Make (Integromat)", "Zapier", "Airtable"].map(
                  (tool, i) => (
                    <motion.span
                      key={tool}
                      variants={fadeInUp}
                      custom={i}
                      className="skill-tag px-4 py-2.5 rounded-lg text-sm md:text-[18px] text-foreground bg-card/50"
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
                      className="skill-tag px-4 py-2.5 rounded-lg text-[16px] md:text-[18px] text-muted-foreground bg-card/30"
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
          <motion.h2 variants={fadeInUp} className="text-[28px] md:text-[40px] font-bold mb-12">
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
                      <h3 className="text-sm md:text-[18px] font-semibold">{exp.role} / {exp.company}</h3>
                      <div className="flex items-center gap-2 text-xs md:text-[18px] text-primary font-mono mt-1">
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
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-5">
                          <ul className="space-y-3">
                            {exp.descriptions.map((desc, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm md:text-[18px] text-muted-foreground leading-relaxed"
                              >
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                                {desc}
                              </li>
                            ))}
                          </ul>

                          {/* Freelance sub-projects */}
                          {hasProjects && (
                            <div className="space-y-5 pt-3 border-t border-border">
                              <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                                Notable Projects
                              </p>
                              {(exp as typeof EXPERIENCE[number] & { projects: Array<{ title: string; projectId: string; descriptions: string[] }> }).projects.map((proj, pi) => (
                                <div key={pi} className="pl-4 border-l-2 border-primary/20">
                                  <a
                                    href={`#project-${proj.projectId}`}
                                    onClick={(e) => { e.preventDefault(); scrollTo(`project-${proj.projectId}`); }}
                                    className="text-sm md:text-[18px] font-semibold hover:text-primary transition-colors underline underline-offset-2 decoration-border hover:decoration-primary/40"
                                  >
                                    {proj.title}
                                  </a>
                                  <ul className="mt-2 space-y-2">
                                    {proj.descriptions.map((d, di) => (
                                      <li
                                        key={di}
                                        className="flex items-start gap-3 text-xs md:text-[18px] text-muted-foreground/80 leading-relaxed"
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
                className="text-[28px] md:text-[40px] font-bold leading-tight mb-6"
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
                  className="flex items-center gap-3 text-sm md:text-[18px] text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2.5 rounded-md border border-border group-hover:border-primary/20 transition-colors">
                    <Mail size={16} />
                  </div>
                  joelakinlosotu@gmail.com
                </a>
                <a
                  href="tel:+2349068971351"
                  className="flex items-center gap-3 text-sm md:text-[18px] text-muted-foreground hover:text-primary transition-colors group"
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
                  <h3 className="text-[24px] md:text-[28px] font-semibold mb-2">Message Sent!</h3>
                  <p className="text-[16px] md:text-[18px] text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs md:text-sm text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Budget
                    </label>
                    <div className="flex items-center rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                      <span className="px-4 py-3 text-xs md:text-[16px] text-primary font-medium bg-muted/50 border-r border-input">
                        {currency.code}
                      </span>
                      <input
                        type="number"
                        placeholder="Enter your budget"
                        value={formData.budget}
                        onChange={(e) => {
                          setFormData({ ...formData, budget: e.target.value });
                          setBudgetError("");
                        }}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          let minBudget;
                          if (currency.code === 'NGN') {
                            minBudget = 250000;
                          } else if (currency.code === 'GBP') {
                            minBudget = 500;
                          } else if (currency.code === 'EUR') {
                            minBudget = 500;
                          } else {
                            const rate = currency.r || 1;
                            minBudget = Math.round(500 * rate);
                          }
                          if (e.target.value && val < minBudget) {
                            setBudgetError('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                          } else {
                            setBudgetError("");
                          }
                        }}
                        className={`flex-1 px-4 py-3 text-sm md:text-[18px] text-foreground bg-transparent outline-none border-0 ${budgetError ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {budgetError && (
                      <p className="text-red-500 text-xs mt-1">{budgetError}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground placeholder:text-muted-foreground/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium text-sm md:text-[18px] rounded-md hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(80,200,120,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
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
          <ContentWidth className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-muted-foreground">
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
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
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
                  <p className="text-[12px] text-primary font-mono mb-2">
                    PROJECT _{String(selectedProject.id).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg md:text-[28px] font-bold">{selectedProject.title}</h3>
                </div>

                <p className="text-sm md:text-[18px] text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[12px] rounded-full border border-primary/20 bg-primary/5 text-primary font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Designer credit in modal */}
                {selectedProject.designer && (
                  <p className="text-[14px] text-muted-foreground">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm md:text-[18px] rounded-md hover:bg-primary/90 transition-all"
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