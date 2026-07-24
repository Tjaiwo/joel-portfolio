const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add budgetError state
const formStateLine = 'const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "" });';
const newFormState = `const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "" });
  const [budgetError, setBudgetError] = useState("");`;

p = p.replace(formStateLine, newFormState);
console.log('✅ Added budgetError state');

// 2. Replace the input's onBlur and className
const oldInput = `<input
                        type="number"
                        placeholder="Enter your budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        onBlur={(e) => {
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
                        min={currency.code === 'NGN' ? 250000 : currency.code === 'GBP' ? 500 : currency.code === 'EUR' ? 500 : 500}
                        className="flex-1 px-4 py-3 text-sm md:text-[18px] text-foreground bg-transparent outline-none border-0"
                      />`;

const newInput = `<input
                        type="number"
                        placeholder="Enter your budget"
                        value={formData.budget}
                        onChange={(e) => {
                          setFormData({ ...formData, budget: e.target.value });
                          setBudgetError("");
                        }}
                        onBlur={(e) => {
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
                            setBudgetError('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                          } else {
                            setBudgetError("");
                          }
                        }}
                        className={\`flex-1 px-4 py-3 text-sm md:text-[18px] text-foreground bg-transparent outline-none border-0 \${budgetError ? 'border-red-500' : ''}\`}
                      />`;

p = p.replace(oldInput, newInput);
console.log('✅ Input validation now inline');

// 3. Add error message below the input, inside the wrapper div
const afterInput = `<input
                        type="number"
                        placeholder="Enter your budget"
                        value={formData.budget}
                        onChange={(e) => {
                          setFormData({ ...formData, budget: e.target.value });
                          setBudgetError("");
                        }}
                        onBlur={(e) => {
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
                            setBudgetError('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
                          } else {
                            setBudgetError("");
                          }
                        }}
                        className={\`flex-1 px-4 py-3 text-sm md:text-[18px] text-foreground bg-transparent outline-none border-0 \${budgetError ? 'border-red-500' : ''}\`}
                      />`;

// Find the closing div after the input
const closingDivPattern = /(                      <\/div>\s*\n\s*<\/div>\s*\n\s*<div>\s*\n\s*<label className="block text-\[14px\] text-muted-foreground mb-2 font-mono uppercase tracking-wider">\s*\n\s*Message)/;

const errorDiv = `                    </div>
                    {budgetError && (
                      <p className="text-red-500 text-xs mt-1">{budgetError}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message`;

const match = p.match(closingDivPattern);
if (match) {
  p = p.replace(match[0], errorDiv);
  console.log('✅ Error message added below input');
} else {
  console.log('⚠️ Could not add error message - check manually');
}

fs.writeFileSync('src/app/page.tsx', p);
