const fs = require('fs');

// ═══ 1. FIX THEME TOGGLE - REMOVE SYSTEM, DEFAULT DARK ═══
let themeToggle = fs.readFileSync('src/components/theme-toggle.tsx', 'utf8');

// Remove system option, keep only light/dark
const oldToggle = `import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, toggle, theme } = useTheme();
  const label =
    theme === "system" ? (
      resolved === "dark" ? "Dark" : "Light"
    ) : resolved === "dark" ? (
      "Dark"
    ) : (
      "Light"
    );
  const title =
    theme === "system"
      ? \`System (\${label})\`
      : resolved === "dark"
        ? "Switch to Light"
        : "Switch to Dark";`;

const newToggle = `import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, toggle, theme } = useTheme();
  const label = resolved === "dark" ? "Dark" : "Light";
  const title = resolved === "dark" ? "Switch to Light" : "Switch to Dark";`;

themeToggle = themeToggle.replace(oldToggle, newToggle);

// Simplify the click handler
themeToggle = themeToggle.replace(
  `onClick={() => {
      const modes = ["light", "dark", "system"] as const;
      const i = modes.indexOf(theme) + 1;
      toggle(modes[i % 3]);
    }}`,
  `onClick={() => {
      toggle(resolved === "dark" ? "light" : "dark");
    }}`
);

fs.writeFileSync('src/components/theme-toggle.tsx', themeToggle);
console.log('1. Theme toggle: system removed, light/dark only');

// ═══ 2. SET DEFAULT TO DARK MODE ═══
let themeProvider = fs.readFileSync('src/components/theme-provider.tsx', 'utf8');
themeProvider = themeProvider.replace('defaultTheme="system"', 'defaultTheme="dark"');
fs.writeFileSync('src/components/theme-provider.tsx', themeProvider);
console.log('2. Default theme set to dark');

// ═══ 3. FIX SCRAMBLE - words not cycling ═══
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// The issue: idx.current gets stuck. Let me check the current hook
// Replace the scramble hook with a working version
const oldHook = /function useScramble[\s\S]*?return display;\n\}/;
const newHook = `function useScramble(words) {
  const [display, setDisplay] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";

  useEffect(() => {
    const word = words[wordIndex];
    const next = words[(wordIndex + 1) % words.length];

    setDisplay(word);
    
    const t1 = setTimeout(() => {
      const start = Date.now();
      const scrambleInterval = setInterval(() => {
        if (Date.now() - start > 200) {
          clearInterval(scrambleInterval);
          let i = 0;
          const revealInterval = setInterval(() => {
            if (i > next.length) {
              clearInterval(revealInterval);
              setDisplay(next);
              setWordIndex((prev) => (prev + 1) % words.length);
            } else {
              let s = "";
              for (let j = 0; j < next.length; j++) {
                s += j < i ? next[j] : chars[Math.floor(Math.random() * chars.length)];
              }
              setDisplay(s);
              i++;
            }
          }, 50);
        } else {
          let s = "";
          for (let j = 0; j < Math.max(word.length, next.length); j++) {
            s += chars[Math.floor(Math.random() * chars.length)];
          }
          setDisplay(s);
        }
      }, 30);
    }, 2500);

    return () => clearTimeout(t1);
  }, [wordIndex]);

  return display;
}`;

page = page.replace(oldHook, newHook);
console.log('3. Scramble hook fixed - uses useState for wordIndex');

fs.writeFileSync('src/app/page.tsx', page);
