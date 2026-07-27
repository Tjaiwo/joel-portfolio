const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove keyboard konami listener
const oldKeyboard = `useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    let pos = 0;
    const handler = (e) => {
      if (e.key === code[pos] || e.code === code[pos]) {
        pos++;
        if (pos === code.length) {
          setKonami(true);
          setTimeout(() => setKonami(false), 4000);
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);`;

p = p.replace(oldKeyboard, '');
console.log('Removed keyboard konami, tap only now');

fs.writeFileSync('src/app/page.tsx', p);
