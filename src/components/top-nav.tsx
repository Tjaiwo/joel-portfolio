"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="top-nav">
      <a
        href="/"
        className="text-sm font-medium tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Joel Akinlosotu
      </a>

      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-background border-b border-border">
          <div className="flex flex-col p-6 gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-left text-base text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
