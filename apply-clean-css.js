const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove only the preloader/burn-in CSS blocks safely
css = css.replace(/\/\* Cinematic burn-in[\s\S]*?@keyframes burn-vignette[\s\S]*?\}/, '');
css = css.replace(/\/\* Cinematic preloader[\s\S]*?\.preloader-scanlines[\s\S]*?@keyframes dots-blink[\s\S]*?\}/, '');
css = css.replace(/\.cinematic-preloader[\s\S]*?@keyframes dots-blink[\s\S]*?\}/, '');
css = css.replace(/\.theme-burn[\s\S]*?@keyframes burn-flash[\s\S]*?\}/, '');
css = css.replace(/\.burn-scanlines[\s\S]*?@keyframes burn-white[\s\S]*?\}/, '');
css = css.replace(/\.konami-confetti[\s\S]*?@keyframes konami-pulse[\s\S]*?\}/, '');

// Remove duplicate CSS blocks
css = css.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync('src/app/globals.css', css);
console.log('CSS cleaned safely from restored version');
