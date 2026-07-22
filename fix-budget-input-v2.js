const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Remove unused state variables
p = p.replace(/const \[showCustomBudget, setShowCustomBudget\] = useState\(false\);\s*/, '');
p = p.replace(/const \[customBudget, setCustomBudget\] = useState\(""\);\s*/, '');
console.log('✅ Cleaned up state variables');

// 2. Replace the select element and its wrapper
const oldSelect = `<select
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

if (p.includes(oldSelect)) {
  p = p.replace(oldSelect, newInput);
  console.log('✅ Select replaced with currency-prefixed input');
} else {
  console.log('⚠️ Could not find select element');
}

// 3. Update the label from "Budget (NGN)" to just "Budget"
p = p.replace(/Budget \({currency\.code}\)/, 'Budget');
console.log('✅ Label updated');

fs.writeFileSync('src/app/page.tsx', p);
