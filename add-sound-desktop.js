const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add sound toggle next to the sidebar ThemeToggle (line 1090)
const oldSidebar = '<ThemeToggle className="mt-2" />';
const newSidebar = `<div className="flex items-center gap-2 mt-2">
          <ThemeToggle />
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-md border border-border hover:border-primary/30 transition-colors text-[11px] font-mono text-muted-foreground hover:text-primary"
            title={soundEnabled ? "Sound on" : "Sound off"}
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
        </div>`;

p = p.replace(oldSidebar, newSidebar);
console.log('✅ Sound toggle added to desktop sidebar');

fs.writeFileSync('src/app/page.tsx', p);
