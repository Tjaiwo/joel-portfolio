const fs = require('fs');
const F = 'src/app/globals.css';
let s = fs.readFileSync(F, 'utf8');

const newCSS = `

/* ─── La Playa editorial styles ─── */

/* Marquee */
.marquee {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  display: flex;
  align-items: center;
}
.marquee-track {
  display: inline-flex;
  animation: marquee 40s linear infinite;
  will-change: transform;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 2rem;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 400;
  font-style: italic;
  font-family: var(--font-serif, Georgia, serif);
  color: var(--muted-foreground);
  white-space: nowrap;
}
.marquee-item::after {
  content: "✳";
  font-size: 0.5em;
  color: var(--primary);
  font-style: normal;
  vertical-align: middle;
}

/* Live time */
.live-time {
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
}
.live-time-pulse {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  margin-right: 8px;
  vertical-align: middle;
  animation: live-pulse 2s ease-in-out infinite;
}
@keyframes live-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Top nav */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: color-mix(in srgb, var(--background) 80%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
@media (min-width: 768px) {
  .top-nav { padding: 1.5rem 2.5rem; }
}

/* Editorial hero */
.editorial-hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .editorial-hero { padding: 10rem 2.5rem 6rem; }
}
.editorial-hero h1 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  max-width: 18ch;
}
.editorial-hero h1 em {
  font-style: italic;
  color: var(--primary);
}
.editorial-hero p {
  margin-top: 2rem;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  max-width: 50ch;
  line-height: 1.6;
  color: var(--muted-foreground);
}
.editorial-hero .hero-footnote {
  margin-top: 3rem;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  opacity: 0.6;
}

/* Footer with live status */
.editorial-footer {
  border-top: 1px solid var(--border);
  padding: 3rem 1.5rem 2rem;
  margin-top: 8rem;
}
.editorial-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-end;
}
.editorial-footer-section {
  font-size: 12px;
  color: var(--muted-foreground);
  line-height: 1.6;
}
.editorial-footer-section .label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 10px;
  opacity: 0.5;
  margin-bottom: 6px;
  display: block;
}
.editorial-footer-section a {
  color: var(--foreground);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

/* Main content without sidebar */
.content-no-sidebar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
@media (min-width: 768px) {
  .content-no-sidebar { padding: 0 2.5rem; }
}
`;

if (!s.includes('marquee-track')) {
  s += newCSS;
  fs.writeFileSync(F, s, 'utf8');
  console.log('  ok added La Playa CSS (marquee, live time, top nav, editorial hero/footer)');
} else {
  console.log('  - La Playa CSS already exists');
}
