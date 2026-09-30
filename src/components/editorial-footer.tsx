"use client";

import { LiveTime } from "@/components/live-time";

export function EditorialFooter() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-inner">
        <div className="editorial-footer-section">
          <span className="label">Currently</span>
          <LiveTime />
          <div style={{ marginTop: "4px" }}>Available for freelance work</div>
        </div>

        <div className="editorial-footer-section">
          <span className="label">Contact</span>
          <a href="mailto:hello@joelakinlosotu.xyz">hello@joelakinlosotu.xyz</a>
        </div>

        <div className="editorial-footer-section">
          <span className="label">Elsewhere</span>
          <a href="https://github.com/Tjaiwo" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
          <a href="https://www.linkedin.com/in/joelakinlosotu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <div className="editorial-footer-section">
          <span className="label">© {new Date().getFullYear()}</span>
          <div>Joel Akinlosotu</div>
          <div style={{ opacity: 0.5, marginTop: "4px" }}>Built with care in Lagos</div>
        </div>
      </div>
    </footer>
  );
}
