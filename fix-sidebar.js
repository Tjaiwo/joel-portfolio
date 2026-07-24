const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix the broken button in sidebar
const brokenBtn = `          <button
            {useLocalTime()}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}`;

const fixedBtn = `          <button
              onClick={() => setSoundEnabled(!soundEnabled)}`;

p = p.replace(brokenBtn, fixedBtn);
console.log('✅ Fixed sidebar button');

// Now add clock to mobile header properly
const mobileHeaderEnd = '<div className="flex items-center gap-2">';
const mobileWithClock = `<div className="flex items-center gap-2">
            <span className="text-primary font-mono text-[11px] mr-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>{useLocalTime()}</span>`;

p = p.replace(mobileHeaderEnd, mobileWithClock);
console.log('✅ Clock added to mobile header');

fs.writeFileSync('src/app/page.tsx', p);
