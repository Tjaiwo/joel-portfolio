"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Monitor } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolved, toggle, theme } = useTheme();

  const icon =
    theme === "system" ? (
      <Monitor size={16} strokeWidth={1.8} />
    ) : resolved === "dark" ? (
      <Moon size={16} strokeWidth={1.8} />
    ) : (
      <Sun size={16} strokeWidth={1.8} />
    );

  const label =
    theme === "system"
      ? "System"
      : resolved === "dark"
        ? "Dark"
        : "Light";

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all ${className}`}
      aria-label={`Current: ${label}. Click to switch theme.`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolved + theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-4 h-4"
        >
          {icon}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs hidden lg:inline">{label}</span>
    </button>
  );
}