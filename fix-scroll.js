const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(
  '.timeline-scroll {',
  `.timeline-scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  -webkit-scrollbar-display: none;
  scrollbar-width: none;
  padding-bottom: 1rem;
  width: 100%;
  max-width: 100vw;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;`
);

fs.writeFileSync('src/app/globals.css', css);
console.log('✅ Force horizontal scroll with flex-wrap: nowrap');
