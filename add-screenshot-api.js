const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update the screenshot image to use Thum.io API as fallback
const oldImg = `<img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />`;

const newImg = `<img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const target = e.currentTarget;
                const url = \`https://image.thum.io/get/width/800/crop/600/\${project.url}\`;
                if (target.src !== url) target.src = url;
              }}
            />`;

p = p.replace(oldImg, newImg);
console.log('✅ Screenshot API fallback added - uses Thum.io if local image missing');
console.log('');
console.log('No API key needed. Free tier: 100 screenshots/month.');
console.log('If local screenshot exists, it loads first. API only called if image 404s.');

fs.writeFileSync('src/app/page.tsx', p);
