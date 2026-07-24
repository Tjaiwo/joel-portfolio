const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Wrap iframe in a container that scales it down
const oldIframe = `        {(hovered || hasLoaded) && (
          <iframe
            ref={iframeRef}
            src={hasLoaded ? project.url : project.url}
            title={project.title}
            onLoad={handleLoad}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className={loaded ? "opacity-100" : "opacity-0"}
          />
        )}`;

const newIframe = `        {(hovered || hasLoaded) && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: '100%', height: '100%' }}>
            <iframe
              ref={iframeRef}
              src={hasLoaded ? project.url : project.url}
              title={project.title}
              onLoad={handleLoad}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
              style={{
                width: '1680px',
                height: '1050px',
                transform: 'scale(0.4)',
                transformOrigin: 'top left',
                border: 'none'
              }}
            />
          </div>
        )}`;

p = p.replace(oldIframe, newIframe);

// Add CSS to make the scale responsive
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
/* Scale iframe to fit card */
.browser-frame iframe {
  width: 1680px !important;
  height: 1050px !important;
}
@media (max-width: 640px) {
  .browser-frame iframe {
    transform: scale(0.22) !important;
  }
}
@media (min-width: 641px) and (max-width: 1024px) {
  .browser-frame iframe {
    transform: scale(0.35) !important;
  }
}
@media (min-width: 1025px) {
  .browser-frame iframe {
    transform: scale(0.4) !important;
  }
}
`;
fs.writeFileSync('src/app/globals.css', css);

console.log('✅ Iframe renders at 1680×1050, scaled to fit card');
