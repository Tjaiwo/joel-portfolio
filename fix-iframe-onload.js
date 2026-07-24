const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace iframe: always have src, use about:blank when not hovered
const oldIframe = `          <iframe
            ref={iframeRef}
            src={frameHovered || hasLoaded ? project.url : undefined}
            title={project.title}
            onLoad={handleLoad}
            sandbox="allow-scripts allow-same-origin"
            className="absolute inset-0"
          />`;

const newIframe = `          {frameHovered || hasLoaded ? (
            <iframe
              ref={iframeRef}
              src={project.url}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className="absolute inset-0"
            />
          ) : null}`;

p = p.replace(oldIframe, newIframe);

// Update screenshot opacity - hide when iframe is present and loaded
const oldImg = 'style={{ opacity: loaded ? 0 : 1, transition: \'opacity 0.3s\' }}';
const newImg = 'style={{ opacity: (frameHovered || hasLoaded) && loaded ? 0 : 1, transition: \'opacity 0.3s\' }}';

p = p.replace(oldImg, newImg);

console.log('✅ Iframe renders only on hover, screenshot hides only when loaded');
fs.writeFileSync('src/app/page.tsx', p);
