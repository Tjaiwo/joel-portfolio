const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Normalize line endings first
p = p.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Remove state variables
p = p.replace(/  const \[showCustomBudget, setShowCustomBudget\] = useState\(false\);\n/, '');
p = p.replace(/  const \[customBudget, setCustomBudget\] = useState\(""\);\n/, '');

// Now match the select (without \r issues)
const selectStart = `<select
                        value={formData.budget}
                        onChange={(e) => {
                        const val = e.target.value;
                        if (val === currency.ranges[0]?.label) {
                          setShowCustomBudget(true);
                          setFormData({ ...formData, budget: val });
                          setCustomBudget("");
                        } else {
                          setShowCustomBudget(false);
                          setFormData({ ...formData, budget: val });
                        }
                      }}
                        className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Select your budget range
                        </option>
                        {currency.ranges.map((range) => (
                          <option key={range.label} value={range.label}>
                            {range.label}
                          </option>
                        ))}
                      </select>`;

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

if (p.includes(selectStart)) {
  p = p.replace(selectStart, newInput);
  console.log('✅ Select replaced');
} else {
  console.log('⚠️ Still no match after normalization. Debug info:');
  const idx = p.indexOf('setShowCustomBudget(true)');
  if (idx > 0) console.log('Found at index', idx, 'surrounding:', JSON.stringify(p.substring(idx-20, idx+50)));
}

fs.writeFileSync('src/app/page.tsx', p);
