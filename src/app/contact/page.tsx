"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

const CONTACT_INFO = [
  { label: "Email", value: "joelakinlosotu@gmail.com", href: "mailto:joelakinlosotu@gmail.com", icon: Mail },
  { label: "Phone", value: "+234 906 897 1351", href: "tel:+2349068971351", icon: Phone },
  { label: "Based in", value: "Lagos, Nigeria", icon: MapPin },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/joelakinlosotu" },
  { label: "Instagram", href: "https://instagram.com/@joelakinlosotu" },
  { label: "GitHub", href: "https://github.com/Tjaiwo" },
];

const PROJECT_TYPES = [
  "Website Design",
  "WordPress Development",
  "WooCommerce / E-Commerce",
  "Next.js Development",
  "Site Maintenance",
  "Performance Optimization",
  "Something Else",
];

// Currency mapping by region
// Minimum budget = $500 USD baseline, converted to local currency
const CURRENCY_BY_REGION: Record<string, { code: string; symbol: string; min: number; name: string }> = {
  NG: { code: "NGN", symbol: "\u20A6", min: 250000, name: "Nigerian Naira" },
  US: { code: "USD", symbol: "$", min: 500, name: "US Dollar" },
  GB: { code: "GBP", symbol: "\u00A3", min: 400, name: "British Pound" },
  DE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  FR: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  ES: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  IT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  NL: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  BE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  AT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  IE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  PT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  FI: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  GR: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  CA: { code: "CAD", symbol: "C$", min: 680, name: "Canadian Dollar" },
  AU: { code: "AUD", symbol: "A$", min: 760, name: "Australian Dollar" },
  IN: { code: "INR", symbol: "\u20B9", min: 42000, name: "Indian Rupee" },
  ZA: { code: "ZAR", symbol: "R", min: 9500, name: "South African Rand" },
  KE: { code: "KES", symbol: "KSh", min: 65000, name: "Kenyan Shilling" },
  GH: { code: "GHS", symbol: "\u20B5", min: 6200, name: "Ghanaian Cedi" },
  DEFAULT: { code: "USD", symbol: "$", min: 500, name: "US Dollar" },
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
    signup: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [currency, setCurrency] = useState(CURRENCY_BY_REGION.DEFAULT);
  const [location, setLocation] = useState<string>("Detecting...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          const countryCode = data.country_code;
          const regionCurrency = CURRENCY_BY_REGION[countryCode] || CURRENCY_BY_REGION.DEFAULT;
          setCurrency(regionCurrency);
          setLocation(`${data.city}, ${data.country_name}`);
        }
      })
      .catch(() => {
        setLocation("Location unknown");
      });
  }, []);

  const formatMinBudget = () => {
    return `${currency.symbol}${currency.min.toLocaleString()} ${currency.code}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", projectType: "", budget: "", message: "", signup: false });
  };

  return (
    <main className="lp-content" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      <section className="mb-20">
        <p className="lp-section-label">Contact</p>
        <h1 className="lp-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Let&apos;s build<br />
          <em>something exceptional.</em>
        </h1>
        <p className="text-base text-muted-foreground max-w-lg mt-6 leading-relaxed">
          Available for freelance WordPress and Next.js work. Tell me what you&apos;re building and I&apos;ll get back to you within 24 hours.
        </p>
      </section>

      <div className="grid md:grid-cols-5 gap-12">
        <section className="md:col-span-2 space-y-8">
          <div>
            <p className="lp-section-label mb-4">Get in touch</p>
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-3">
                    <Icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-sm text-primary underline decoration-dotted underline-offset-4">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-dotted border-border pt-6">
            <p className="lp-section-label mb-2">Your location</p>
            <p className="text-sm text-foreground">{location}</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Detected via IP. Budget shown in {currency.name} ({currency.code}).
            </p>
          </div>

          <div>
            <p className="lp-section-label mb-3">Elsewhere</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-dotted underline-offset-4"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="lp-section-label mb-3">Availability</p>
            <p className="text-sm text-primary">Open for freelance work</p>
            <p className="text-xs text-muted-foreground mt-1">Response time: within 24 hours</p>
          </div>
        </section>

        <section className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="lp-section-label block mb-2">Name <span className="text-primary">*</span></label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="dotted-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="lp-section-label block mb-2">Email <span className="text-primary">*</span></label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="dotted-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="lp-section-label block mb-2">I&apos;m interested in... <span className="text-primary">*</span></label>
              <select
                required
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="dotted-select"
              >
                <option value="">Select a project type</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="lp-section-label block mb-2">Budget <span className="text-primary">*</span></label>
              <div className="flex items-center border-b border-dotted border-border">
                <span className="text-sm text-primary pr-3 font-medium">{currency.symbol}</span>
                <input
                  type="number"
                  required
                  min={currency.min}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="dotted-input border-0 flex-1"
                  placeholder={`Enter your budget in ${currency.code}`}
                />
                <span className="text-xs text-muted-foreground pl-3">{currency.code}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 italic opacity-70">
                Minimum budget: {formatMinBudget()} ({currency.name}). Detection based on your location: {location}.
              </p>
            </div>

            <div>
              <label className="lp-section-label block mb-2">Project details <span className="text-primary">*</span></label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="dotted-textarea"
                placeholder="Tell me about your project. What are you building? What does success look like?"
                rows={6}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.signup}
                onChange={(e) => setForm({ ...form, signup: e.target.checked })}
                className="mt-1"
              />
              <span className="text-xs text-muted-foreground">
                Sign up for news and updates. No spam, occasional project updates only.
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={16} /> Message sent - I&apos;ll reply within 24 hours
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
