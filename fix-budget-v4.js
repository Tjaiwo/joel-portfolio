const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Remove state variables
p = p.replace(/  const \[showCustomBudget, setShowCustomBudget\] = useState\(false\);\s*\n/, '');
p = p.replace(/  const \[customBudget, setCustomBudget\] = useState\(""\);\s*\n/, '');

// Match from <select to </select>
const selectPattern = /<select\n[^>]*>[\s\S]*?<\/select>/;
const selectMatch = p.match(selectPattern);

if (selectMatch && selectMatch[0].includes('setShowCustomBudget')) {
  const newInput = `<div className="flex items-center rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                      <span className="px-4 py-3 text-sm md:text-[18px] text-primary font-medium bg-muted/50 border-r border-input">
                        {currency.code}
                      </span>
                      <input
                        type="number"
                        placeholder="Enter your budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          const minBudget = currency.code === 'NGN' ? 200000 : 500;
                          if (e.target.value && val < minBudget) {
                            alert('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                            setFormData({ ...formData, budget: '' });
                          }
                        }}
                        min={currency.code === 'NGN' ? 200000 : 500}
                        className="flex-1 px-4 py-3 text-sm md:text-[18px] text-foreground bg-transparent outline-none border-0"
                      />
                    </div>`;
  
  p = p.replace(selectMatch[0], newInput);
  console.log('✅ Select replaced with currency-prefixed input');
} else {
  console.log('⚠️ Could not find select with setShowCustomBudget');
}

fs.writeFileSync('src/app/page.tsx', p);
