"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import {
  CURRENCY_BY_COUNTRY,
  DEFAULT_CURRENCY,
  getCurrencyByCountry,
} from "@/lib/currency";

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

const ASSETS = [
  "Copywriting",
  "Photography / Videos",
  "Branding Style",
  "Domain / Hosting",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectTypes: [] as string[],
    assets: [] as string[],
    budget: "",
    message: "",
    hearAbout: "",
    signup: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [location, setLocation] = useState<string>("Detecting...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          setCurrency(getCurrencyByCountry(data.country_code));
          setLocation(`${data.city}, ${data.country_name}`);
        }
      })
      .catch(() => { setLocation("Location unknown"); });
  }, []);

  const formatMinBudget = () => `${currency.symbol}${currency.min.toLocaleString()} ${currency.code}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm({ ...form, [name]: newValue });
    if (fieldErrors[name]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[name];
      setFieldErrors(newErrors);
    }
  };

  const handlePillClick = (type: string, field: "projectTypes" | "assets" = "projectTypes") => {
    setForm(prev => {
      const currentList = prev[field];
      const isSelected = currentList.includes(type);
      return {
        ...prev,
        [field]: isSelected
          ? currentList.filter(t => t !== type)
          : [...currentList, type]
      };
    });
    if (fieldErrors[field]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[field];
      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setErrorMessage("");

    if (form.projectTypes.length === 0) {
      setFieldErrors({ projectTypes: "Please select at least one option" });
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          projectType: form.projectTypes.join(", "),
          currencyCode: currency.code,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setErrorMessage(data.error || "Something went wrong");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", projectTypes: [], budget: "", message: "", signup: false });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <main className="lp-content" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      <section className="mb-24 border-y border-dashed border-primary py-12 md:py-16 relative flex items-center">
        <div className="absolute top-4 right-4 hidden md:flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-primary border border-primary px-3 py-1 rounded-full">
          Based in Lagos, Nigeria
        </div>
        <h1 className="text-left text-[clamp(4rem,14vw,12rem)] font-bold leading-none tracking-tighter text-primary uppercase">
          Contact
        </h1>
      </section>

      <div className="grid md:grid-cols-12 gap-16">
        <section className="md:col-span-4 space-y-12">
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
                        <a href={info.href} className="text-sm text-primary underline decoration-dotted underline-offset-4">{info.value}</a>
                      ) : (
                        <p className="text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-dashed border-border pt-6">
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
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-dotted underline-offset-4">
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

        <section className="md:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label className="text-sm font-mono uppercase tracking-widest font-bold mb-4 block text-foreground">Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 pb-3 focus:outline-none focus:border-primary transition-colors text-lg" placeholder="Your name" disabled={status === "submitting"} />
                {fieldErrors.name && <p className="text-xs text-destructive mt-2">{fieldErrors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-mono uppercase tracking-widest font-bold mb-4 block text-foreground">Email *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 pb-3 focus:outline-none focus:border-primary transition-colors text-lg" placeholder="you@example.com" disabled={status === "submitting"} />
                {fieldErrors.email && <p className="text-xs text-destructive mt-2">{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <p className="text-sm font-mono uppercase tracking-widest font-bold mb-5 block text-foreground">I'm interested in... *</p>
              <div className="flex flex-wrap gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = form.projectTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handlePillClick(type, "projectTypes")}
                      disabled={status === "submitting"}
                      className={
                        isSelected
                          ? "px-5 py-3 text-sm font-mono font-bold uppercase tracking-wider bg-primary text-primary-foreground border border-primary transition-all"
                          : "px-5 py-3 text-sm font-mono uppercase tracking-wider bg-transparent text-primary border border-dashed border-primary hover:bg-primary/5 hover:border-solid transition-all"
                      }
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.projectTypes && <p className="text-xs text-destructive mt-2">{fieldErrors.projectTypes}</p>}
            </div>

            <div>
              <p className="text-sm font-mono uppercase tracking-widest font-bold mb-5 block text-foreground">I already have... </p>
              <div className="flex flex-wrap gap-3">
                {ASSETS.map((type) => {
                  const isSelected = form.assets.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handlePillClick(type, "assets")}
                      disabled={status === "submitting"}
                      className={
                        isSelected
                          ? "px-5 py-3 text-sm font-mono font-bold uppercase tracking-wider bg-primary text-primary-foreground border border-primary transition-all"
                          : "px-5 py-3 text-sm font-mono uppercase tracking-wider bg-transparent text-primary border border-dashed border-primary hover:bg-primary/5 hover:border-solid transition-all"
                      }
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-mono uppercase tracking-widest font-bold mb-4 block text-foreground">Budget *</label>
              <div className="flex items-center border-b border-primary/30 pb-3 focus-within:border-primary transition-colors">
                <span className="text-lg text-primary pr-3 font-mono">{currency.code}</span>
                <input type="number" name="budget" required min={currency.min} value={form.budget} onChange={handleChange} className="bg-transparent border-0 flex-1 focus:outline-none text-lg" placeholder="Enter your budget" disabled={status === "submitting"} />
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2 opacity-70">
                Minimum budget: {formatMinBudget()} ({currency.name}).
              </p>
              {fieldErrors.budget && <p className="text-xs text-destructive mt-2">{fieldErrors.budget}</p>}
            </div>

            <div>
              <label className="text-sm font-mono uppercase tracking-widest font-bold mb-4 block text-foreground">Project details *</label>
              <textarea name="message" required value={form.message} onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 pb-3 focus:outline-none focus:border-primary transition-colors text-lg" placeholder="Tell me about your project..." rows={3} disabled={status === "submitting"} />
              {fieldErrors.message && <p className="text-xs text-destructive mt-2">{fieldErrors.message}</p>}
            </div>

            <div>
              <label className="text-sm font-mono uppercase tracking-widest font-bold mb-4 block text-foreground">How Did You Find Me? *</label>
              <input type="text" name="hearAbout" required value={form.hearAbout} onChange={handleChange} className="w-full bg-transparent border-b border-primary/30 pb-3 focus:outline-none focus:border-primary transition-colors text-lg" placeholder="How did you hear about me?" disabled={status === "submitting"} />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="signup" checked={form.signup} onChange={handleChange} className="mt-1" disabled={status === "submitting"} />
              <span className="text-sm text-muted-foreground">
                Sign up for news and updates. No spam, occasional project updates only.
              </span>
            </label>

            {status === "error" && errorMessage && (
              <div className="flex items-center gap-2 p-4 border border-destructive bg-destructive/10 text-sm text-destructive font-mono uppercase tracking-wider">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

            <button type="submit" disabled={status === "submitting"} className="w-full py-5 font-mono font-bold uppercase tracking-widest text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
              {status === "submitting" ? (
                "SENDING ENQUIRY..."
              ) : status === "success" ? (
                "ENQUIRY SENT - THANK YOU"
              ) : (
                "SUBMIT ENQUIRY"
              )}
            </button>
          </form>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Joel Akinlosotu - Web Development",
            description: "WordPress and Next.js developer. 50+ projects shipped across aviation, industrial, media, e-commerce, and architecture.",
            url: "https://joelakinlosotu.xyz/contact",
            email: "joelakinlosotu@gmail.com",
            telephone: "+234 906 897 1351",
            priceRange: "From $500",
            areaServed: "Worldwide",
            knowsAbout: ["WordPress", "Next.js", "WooCommerce", "Elementor", "SEO", "Web Performance"],
            sameAs: [
              "https://linkedin.com/in/joelakinlosotu",
              "https://github.com/Tjaiwo",
              "https://instagram.com/@joelakinlosotu"
            ]
          })
        }}
      />
    </main>
  );
}
