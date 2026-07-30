const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Add state
p = p.replace(
  'const [copied, setCopied] = useState(false);',
  'const [copied, setCopied] = useState(false);\n  const [loading, setLoading] = useState(true);'
);

// Add timer to hide preloader
p = p.replace(
  'useEffect(() => { setCurrency(getCurrencyFromTimezone()); }, []);',
  'useEffect(() => { setCurrency(getCurrencyFromTimezone()); }, []);\n\n  useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);'
);

// Add preloader JSX
const mainStart = '<main className="flex-1 lg:ml-[280px]"';
const preloader = `{loading && (
        <div className="fixed inset-0 z-[99999] bg-[#0C0C0C] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              Joel<span className="text-foreground">.</span>
            </h2>
            <div className="mt-4 w-32 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      )}
      <main className="flex-1 lg:ml-[280px]"`;

p = p.replace(mainStart, preloader);
console.log('Clean preloader added');

fs.writeFileSync('src/app/page.tsx', p);
