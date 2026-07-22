const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Remove unused state variables
const oldState = `  const [showCustomBudget, setShowCustomBudget] = useState(false);
  const [customBudget, setCustomBudget] = useState("");`;

if (p.includes(oldState)) {
  p = p.replace(oldState, '');
  console.log('✅ Removed unused state variables');
}

// 2. Replace the entire budget dropdown block with a simple input
const oldBlock = `                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Budget ({currency.code})
                    </label>
                    <select
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
                      </select>
                  </div>`;

const newBlock = `                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Budget
                    </label>
                    <div className="flex items-center rounded-md border border-input bg-background overflow-hidden">
                      <span className="px-3 py-3 text-sm md:text-[18px] text-muted-foreground bg-muted/50 font-medium border-r border-input">
                        {currency.code}
                      </span>
                      <input
                        type="number"
                        placeholder="Enter your budget"
                        value={formData.budget}
                        onChange={(e) => {
                          const val = e.target.value;
                          const numVal = Number(val);
                          const minBudget = currency.code === 'NGN' ? 200000 : Math.round(500 * (currency.code === 'USD' ? 1 : (currency.symbol === '\\u20A6' ? 1500 : currency.r || 1)));
                          setFormData({ ...formData, budget: val });
                        }}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          const minBudget = currency.code === 'NGN' ? 200000 : 500;
                          if (e.target.value && val < minBudget) {
                            alert('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                            setFormData({ ...formData, budget: '' });
                          }
                        }}
                        className="flex-1 px-4 py-3 text-sm md:text-[18px] text-foreground bg-transparent outline-none"
                        min={currency.code === 'NGN' ? 200000 : 500}
                      />
                    </div>
                  </div>`;

if (p.includes(oldBlock)) {
  p = p.replace(oldBlock, newBlock);
  console.log('✅ Budget dropdown replaced with currency-prefixed input');
}

// 3. Also remove any leftover custom input block if it exists
const customBlock = /{showCustomBudget && \([\s\S]*?\)\s*\}\s*/;
if (p.match(customBlock)) {
  p = p.replace(customBlock, '');
  console.log('✅ Removed leftover custom input block');
}

fs.writeFileSync('src/app/page.tsx', p);
