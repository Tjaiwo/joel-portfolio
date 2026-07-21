const fs = require('fs');
const path = require('path');

// Ask user to choose
console.log('Choose fix option:');
console.log('  A: Remove output: "export" from next.config.js (keep API route)');
console.log('  B: Delete /app/api directory (keep static export)');
console.log('  C: Do both');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter A, B, or C: ', (choice) => {
  readline.close();
  
  const upperChoice = choice.toUpperCase();
  let fixes = [];
  let changes = 0;

  // Option A or C: Remove output: "export" from next.config.js
  if (upperChoice === 'A' || upperChoice === 'C') {
    const configPaths = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
    let configFile = null;
    
    for (const p of configPaths) {
      if (fs.existsSync(p)) {
        configFile = p;
        break;
      }
    }

    if (configFile) {
      let config = fs.readFileSync(configFile, 'utf8');
      
      // Remove the entire output: "export" line (with possible trailing comma)
      const patterns = [
        /output:\s*["']export["']\s*,?\s*/g,           // output: "export",
        /output:\s*["']export["']\s*/g,                 // output: "export"
      ];
      
      let newConfig = config;
      for (const pattern of patterns) {
        newConfig = newConfig.replace(pattern, '');
      }
      
      if (newConfig !== config) {
        fs.writeFileSync(configFile, newConfig, 'utf8');
        console.log('✓ Removed output: "export" from ' + configFile);
        fixes.push('Removed output: "export"');
        changes++;
      } else {
        console.log('⚠ Could not find output: "export" in ' + configFile);
      }
    } else {
      console.log('⚠ No next.config file found');
    }
  }

  // Option B or C: Delete /app/api directory
  if (upperChoice === 'B' || upperChoice === 'C') {
    const apiPaths = ['app/api', 'src/app/api'];
    let apiDir = null;
    
    for (const p of apiPaths) {
      if (fs.existsSync(p)) {
        apiDir = p;
        break;
      }
    }

    if (apiDir) {
      fs.rmSync(apiDir, { recursive: true, force: true });
      console.log('✓ Deleted ' + apiDir + ' directory');
      fixes.push('Deleted API route directory');
      changes++;
    } else {
      console.log('⚠ No /app/api directory found');
    }
  }

  // Summary
  console.log('\n=== Summary ===');
  console.log('Changes made: ' + changes);
  fixes.forEach(f => console.log('  • ' + f));
  
  if (changes === 0) {
    console.log('\n⚠ No changes were made. Your project may already be fixed.');
  } else {
    console.log('\nNow run these commands to push:');
    console.log('  git add -A');
    console.log('  git commit -m "fix: resolve Vercel build error with output export and API route"');
    console.log('  git push origin main');
  }
});
