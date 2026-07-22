const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Normalize line endings
p = p.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// 1. Fix the onBlur min budget logic
const oldBlur = `onBlur={(e) => {
                          const val = Number(e.target.value);
                          const minBudget = currency.code === 'NGN' ? 200000 : 500;
                          if (e.target.value && val < minBudget) {
                            alert('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                            setFormData({ ...formData, budget: '' });
                          }
                        }}
                        min={currency.code === 'NGN' ? 200000 : 500}`;

const newBlur = `onBlur={(e) => {
                          const val = Number(e.target.value);
                          let minBudget;
                          if (currency.code === 'NGN') {
                            minBudget = 250000;
                          } else if (currency.code === 'GBP') {
                            minBudget = 500;
                          } else if (currency.code === 'EUR') {
                            minBudget = 500;
                          } else {
                            const rate = currency.r || 1;
                            minBudget = Math.round(500 * rate);
                          }
                          if (e.target.value && val < minBudget) {
                            alert('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                            setFormData({ ...formData, budget: '' });
                          }
                        }}
                        min={currency.code === 'NGN' ? 250000 : currency.code === 'GBP' ? 500 : currency.code === 'EUR' ? 500 : 500}`;

if (p.includes(oldBlur)) {
  p = p.replace(oldBlur, newBlur);
  console.log('✅ Min budget updated: NGN 250K, GBP £500, EUR €500, others $500×rate');
} else {
  console.log('⚠️ Could not find old onBlur block');
}

// 2. Reduce currency prefix font size by 2px
const oldPrefix = `<span className="px-4 py-3 text-sm md:text-[18px] text-primary font-medium bg-muted/50 border-r border-input">`;
const newPrefix = `<span className="px-4 py-3 text-xs md:text-[16px] text-primary font-medium bg-muted/50 border-r border-input">`;

if (p.includes(oldPrefix)) {
  p = p.replace(oldPrefix, newPrefix);
  console.log('✅ Currency prefix font reduced by 2px');
} else {
  console.log('⚠️ Could not find currency prefix span');
}

fs.writeFileSync('src/app/page.tsx', p);
