const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Fix float-tag (line 584)
css = css.replace(
  '@keyframes float-tag {\n  0%, 100% { transform: translateY(0px); }\n.skill-tag {',
  '@keyframes float-tag {\n  0%, 100% { transform: translateY(0px); }\n  50% { transform: translateY(-4px); }\n}\n.skill-tag {'
);

// Fix slide-up (line 219) if broken
css = css.replace(
  '@keyframes slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n.to {',
  '@keyframes slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {'
);
// Add missing closing brace after "to" block
css = css.replace(
  '    transform: translateY(0);\n  }\n\n',
  '    transform: translateY(0);\n  }\n}\n\n'
);

console.log('Fixed remaining keyframes');

fs.writeFileSync('src/app/globals.css', css);
