"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CoffeeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    updateTheme(dark);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty("--background", "#0f0f0e");
      document.documentElement.style.setProperty("--foreground", "#E8E2D0");
      document.documentElement.style.setProperty("--card", "#1a1a18");
      document.documentElement.style.setProperty("--card-foreground", "#E8E2D0");
      document.documentElement.style.setProperty("--muted", "#1a1a18");
      document.documentElement.style.setProperty("--muted-foreground", "#8a8575");
      document.documentElement.style.setProperty("--secondary", "#1a1a18");
      document.documentElement.style.setProperty("--secondary-foreground", "#E8E2D0");
      document.documentElement.style.setProperty("--accent", "#1a1a18");
      document.documentElement.style.setProperty("--accent-foreground", "#E8E2D0");
      document.documentElement.style.setProperty("--border", "#E8E2D0");
      document.documentElement.style.setProperty("--input", "#E8E2D0");
      document.documentElement.style.setProperty("--popover", "#0f0f0e");
      document.documentElement.style.setProperty("--popover-foreground", "#E8E2D0");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty("--background", "#F5F1E8");
      document.documentElement.style.setProperty("--foreground", "#3D4135");
      document.documentElement.style.setProperty("--card", "#EDE8DC");
      document.documentElement.style.setProperty("--card-foreground", "#3D4135");
      document.documentElement.style.setProperty("--muted", "#E8E2D0");
      document.documentElement.style.setProperty("--muted-foreground", "#7A7565");
      document.documentElement.style.setProperty("--secondary", "#E8E2D0");
      document.documentElement.style.setProperty("--secondary-foreground", "#3D4135");
      document.documentElement.style.setProperty("--accent", "#E8E2D0");
      document.documentElement.style.setProperty("--accent-foreground", "#3D4135");
      document.documentElement.style.setProperty("--border", "#3D4135");
      document.documentElement.style.setProperty("--input", "#3D4135");
      document.documentElement.style.setProperty("--popover", "#F5F1E8");
      document.documentElement.style.setProperty("--popover-foreground", "#3D4135");
    }
  };

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    updateTheme(newDark);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-dotted border-border transition-all hover:bg-secondary"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Coffee's done" : "Coffee's brewing"}
    >
      {/* Coffee cup SVG */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground"
      >
        {/* Cup body */}
        <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
        {/* Handle */}
        <path d="M16 9h2a3 3 0 0 1 0 6h-2" />
        {/* Coffee liquid (animated fill) */}
        <motion.path
          d="M5 9h10v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z"
          fill="#6B7A3D"
          stroke="none"
          animate={{
            opacity: isDark ? 0.2 : 1,
          }}
          transition={{ duration: 0.6 }}
        />
        {/* Steam (only when light = coffee's brewing) */}
        <AnimatePresence>
          {!isDark && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.path
                d="M8 3c0 1 .5 1.5.5 2.5S8 6.5 8 7.5"
                stroke="#6B7A3D"
                strokeWidth="1.2"
                animate={{
                  y: [0, -2, 0],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M11 3c0 1 .5 1.5.5 2.5S11 6.5 11 7.5"
                stroke="#6B7A3D"
                strokeWidth="1.2"
                animate={{
                  y: [0, -2, 0],
                  opacity: [0.4, 0.15, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
              <motion.path
                d="M14 3c0 1 .5 1.5.5 2.5S14 6.5 14 7.5"
                stroke="#6B7A3D"
                strokeWidth="1.2"
                animate={{
                  y: [0, -2, 0],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </button>
  );
}
