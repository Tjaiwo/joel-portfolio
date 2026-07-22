const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Remove state variables
p = p.replace(/  const \[showCustomBudget, setShowCustomBudget\] = useState\(false\);\n/, '');
p = p.replace(/  const \[customBudget, setCustomBudget\] = useState\(""\);\n/, '');

// 2. Find the Budget label and replace everything from there to </select>
const labelPattern = /(<label className="block text-\[14px\] text-muted-foreground mb-2 font-mono uppercase tracking-wider">\s*Budget \([^)]*\)\s*<\/label>\s*)([\s\S]*?)(<\/select>)/;
const labelMatch = p.match(labelPattern);

if (labelMatch) {
  const newInput = `<label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Budget
                    </label>
                    <div className="flex items-center rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
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
  
  p = p.replace(labelMatch[0], newInput);
  console.log('✅ Budget section replaced');
} else {
  console.log('⚠️ Could not find budget label + select pattern');
}

fs.writeFileSync('src/app/page.tsx', p);
