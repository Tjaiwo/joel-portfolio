const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Remove the orphaned keyframe percentages
const orphan = `}

  30% { opacity: 0.6; }
  60% { opacity: 0.1; }
  100% { opacity: 0; }
}`;

css = css.replace(orphan, '}');
console.log('✅ Removed orphaned CSS');

fs.writeFileSync('src/app/globals.css', css);
