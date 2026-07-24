const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the iframe with a simpler version - loads on first hover, stays loaded
const oldIframe = `<iframe
              key={frameHovered ? 'live' : 'off'}
              ref={iframeRef}
              src={frameHovered ? project.url : 'about:blank'}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
            />`;

const newIframe = `<iframe
              ref={iframeRef}
              src={frameHovered || hasLoaded ? project.url : ''}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
              style={{ display: (frameHovered || hasLoaded) ? 'block' : 'none' }}
            />`;

p = p.replace(oldIframe, newIframe);

// Also remove the condition wrapping the iframe - always render it, just hide/show
const oldWrapper = `{frameHovered && (
          <div className="absolute inset-0 iframe-scale-container" style={{ clipPath: "none", overflow: "hidden", zIndex: loaded ? 10 : 5 }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
                <div className="iframe-spinner-ring" />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={frameHovered || hasLoaded ? project.url : ''}
              title={project.title}
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin"
              className={loaded ? "opacity-100" : "opacity-0"}
              style={{ display: (frameHovered || hasLoaded) ? 'block' : 'none' }}
            />
          </div>
        )}`;

const newWrapper = `<div className="absolute inset-0 iframe-scale-container" style={{ clipPath: "none", overflow: "hidden", zIndex: loaded ? 10 : 5, display: (frameHovered || hasLoaded) ? 'block' : 'none' }}>
            {frameHovered && !loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
                <div className="iframe-spinner-ring" />
              </div>
            )}
            {(frameHovered || hasLoaded) && (
              <iframe
                ref={iframeRef}
                src={project.url}
                title={project.title}
                onLoad={handleLoad}
                sandbox="allow-scripts allow-same-origin"
                className={loaded ? "opacity-100" : "opacity-0"}
              />
            )}
          </div>`;

p = p.replace(oldWrapper, newWrapper);
console.log('✅ Iframe simplified - loads on hover, stays');

fs.writeFileSync('src/app/page.tsx', p);
