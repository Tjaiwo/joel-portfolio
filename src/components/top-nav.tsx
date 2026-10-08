"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CoffeeToggle } from "@/components/coffee-toggle";

const NAV_ITEMS = [
  { href: "/", label: "WORK" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Live Lagos time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const lagosTime = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(lagosTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="top-nav">
        <Link href="/" className="text-base" style={{ fontFamily: "var(--font-mono)" }}>
          <span style={{ color: "var(--foreground)" }}>&lt;</span>
          <span style={{ color: "var(--primary)" }}>JA</span>
          <span style={{ color: "var(--foreground)" }}>/&gt;</span>
        </Link>

        {/* La Playa-style greeting with live time */}
        <div className="hidden md:block text-xs text-muted-foreground uppercase">
          Hi, stranger. It&apos;s a sunny one over here. {time}
        </div>

        <div className="hidden md:flex items-center gap-[30px]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
              </Link>
            );
          })}
          <CoffeeToggle />
        </div>

        <div className="flex md:hidden items-center gap-4">
          <CoffeeToggle />
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] md:hidden flex flex-col"
            style={{ backgroundColor: "#0f0f0e", color: "#E8E2D0" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Link href="/" onClick={() => setOpen(false)} className="text-base" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="text-white">&lt;</span>
                <span style={{ color: "#6B7A3D" }}>JA</span>
                <span className="text-white">/&gt;</span>
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-5">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={`block py-4 text-2xl font-medium uppercase tracking-[0.04em] transition-colors ${isActive ? "text-[#6B7A3D]" : "text-white/80 hover:text-white"}`} style={{ fontFamily: "var(--font-mono)" }}>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="px-5 py-6 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                * Coded by hand, backed by coffee
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
