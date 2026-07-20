"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

interface ThemeCtx {
  theme: Theme;
  resolved: "dark" | "light";
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "system",
  resolved: "dark",
  setTheme: () => {},
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystem(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  const resolve = useCallback((t: Theme) => {
    return t === "system" ? getSystem() : t;
  }, []);

  const apply = useCallback(
    (r: "dark" | "light") => {
      const root = document.documentElement;
      root.classList.toggle("dark", r === "dark");
      root.style.colorScheme = r;
      setResolved(r);
    },
    []
  );

  /* On mount: read persisted preference or default to system */
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? "system";
    setThemeState(initial);
    apply(resolve(initial));
    setMounted(true);
  }, [resolve, apply]);

  /* Listen for OS-level theme changes when set to "system" */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") apply(getSystem());
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, apply]);

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t);
      localStorage.setItem("theme", t);
      apply(resolve(t));
    },
    [resolve, apply]
  );

  const toggle = useCallback(() => {
    const next: Theme = resolved === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolved, setTheme]);

  /* Prevent flash: render nothing until we know the theme */
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
