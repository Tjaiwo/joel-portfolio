const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the entire iframe setup with a clean CSS approach
const oldIframeBlock = `        {(hovered || hasLoaded) && (
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
                width: '1440px',
                height: '900px',
                transform: 'scale(0.4)',
                transformOrigin: 'top left',
                border: 'none'
              }}
            />
          </div>
        )}`;

const newIframeBlock = `        {(hovered || hasLoaded) && (
          <div className="iframe-scale-container">
            <iframe
              ref={iframeRef}
              src={hasLoaded ? project.url : project.url}
              title={project.title}
              onLoad={handleLoad}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
            />
          </div>
        )}`;

p = p.replace(oldIframeBlock, newIframeBlock);
console.log('✅ Iframe simplified');

// Replace the CSS with proper scaling
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove old iframe scale rules
css = css.replace(/\/\* Scale iframe to fit card \*\/[\s\S]*?\}/, '');

// Add clean scaling
css += `
/* Scale iframe to fit card perfectly */
.iframe-scale-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.iframe-scale-container iframe {
  width: 1440px;
  height: 900px;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
}
@media (max-width: 640px) {
  .iframe-scale-container iframe {
    transform: scale(0.22);
  }
}
@media (min-width: 641px) and (max-width: 1024px) {
  .iframe-scale-container iframe {
    transform: scale(0.33);
  }
}
@media (min-width: 1025px) and (max-width: 1280px) {
  .iframe-scale-container iframe {
    transform: scale(0.28);
  }
}
@media (min-width: 1281px) {
  .iframe-scale-container iframe {
    transform: scale(0.33);
  }
}
`;

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ CSS updated with proper scaling');
