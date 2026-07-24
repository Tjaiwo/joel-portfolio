const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace: iframe src only set on hover
const oldIframe = `            <iframe
              ref={iframeRef}
              src={project.url}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="absolute inset-0"
            />`;

const newIframe = `            <iframe
              ref={iframeRef}
              src={frameHovered || hasLoaded ? project.url : undefined}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="absolute inset-0"
            />`;

p = p.replace(oldIframe, newIframe);

// Keep iframe container always visible
// Screenshot shows until loaded
const oldImg = `style={{ opacity: loaded ? 0 : 1, transition: 'opacity 0.3s' }}`;
const newImg = `style={{ opacity: hasLoaded ? 0 : 1, transition: 'opacity 0.3s' }}`;

p = p.replace(oldImg, newImg);

console.log('✅ Iframe src only set on hover, screenshot hides when loaded');
fs.writeFileSync('src/app/page.tsx', p);
