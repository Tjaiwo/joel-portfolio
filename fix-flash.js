const fs = require('fs');
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Add blocking script before <ThemeProvider> to prevent flash
const headClose = '</head>';
const darkScript = `  <script dangerouslySetInnerHTML={{ __html: \`
    (function() {
      try {
        var theme = localStorage.getItem('theme') || 'dark';
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch(e) {}
    })();
  \` }} />
  </head>`;

layout = layout.replace(headClose, darkScript);
fs.writeFileSync('src/app/layout.tsx', layout);
console.log('Dark mode flash prevention added');
