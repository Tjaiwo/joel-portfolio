"use client";

import Link from "next/link";
import { LiveTime } from "@/components/live-time";

export function EditorialFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        {/* Currently */}
        <div className="lp-footer-section">
          <span className="label dark:text-white/70">Currently</span>
          <LiveTime />
          <div style={{ marginTop: "4px" }}>Available for freelance work</div>
        </div>

        {/* Contact */}
        <div className="lp-footer-section">
          <span className="label">Contact</span>
          <a href="mailto:joelakinlosotu@gmail.com">joelakinlosotu@gmail.com</a>
          <div style={{ marginTop: "4px" }}>
            <a href="tel:+2349068971351">+234 906 897 1351</a>
          </div>
        </div>

        {/* Elsewhere */}
        <div className="lp-footer-section">
          <span className="label">Elsewhere</span>
          <div className="flex flex-col gap-1">
            <a href="https://linkedin.com/in/joelakinlosotu" target="_blank" rel="noopener noreferrer">[ LinkedIn ]</a>
            <a href="https://instagram.com/@joelakinlosotu" target="_blank" rel="noopener noreferrer">[ Instagram ]</a>
            <a href="https://github.com/Tjaiwo" target="_blank" rel="noopener noreferrer">[ GitHub ]</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="lp-footer-section">
          <span className="label">© {new Date().getFullYear()}</span>
          <div>Joel Akinlosotu</div>
          <div style={{ opacity: 0.5, marginTop: "4px" }}>Built with care in Lagos</div>
        </div>
      </div>
    </footer>
  );
}
