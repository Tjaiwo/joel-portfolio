"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function CountUp({ from = 0, to, suffix = "", duration = 2, delay = 0, className = "" }: CountUpProps) {
  const [count, setCount] = useState(from);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(from + (to - from) * eased));
        if (progress >= 1) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [started, from, to, duration, delay]);

  return <span ref={ref} className={className}>{count}{suffix}</span>;
}
