const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add a state variable for custom budget input
const stateLine = `const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "" });`;
const newState = `const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "" });
  const [showCustomBudget, setShowCustomBudget] = useState(false);
  const [customBudget, setCustomBudget] = useState("");`;

if (p.includes(stateLine)) {
  p = p.replace(stateLine, newState);
  console.log('OK: Added custom budget state');
}

// 2. Replace the select onChange to toggle input visibility
const oldSelectOnChange = `onChange={(e) => {
                        const val = e.target.value;
                        if (val === currency.ranges[0]?.label) {
                          const budget = prompt("Enter your budget in " + currency.code + ":");
                          if (budget && !isNaN(Number(budget)) && Number(budget) > 0) {
                            setFormData({ ...formData, budget: currency.code + " " + Number(budget).toLocaleString("en-US") });
                          } else if (budget !== null) {
                            alert("Please enter a valid number greater than 0");
                          }
                        } else {
                          setFormData({ ...formData, budget: val });
                        }
                      }}`;

const newSelectOnChange = `onChange={(e) => {
                        const val = e.target.value;
                        if (val === currency.ranges[0]?.label) {
                          setShowCustomBudget(true);
                          setFormData({ ...formData, budget: "" });
                        } else {
                          setShowCustomBudget(false);
                          setFormData({ ...formData, budget: val });
                        }
                      }}`;

if (p.includes(oldSelectOnChange)) {
  p = p.replace(oldSelectOnChange, newSelectOnChange);
  console.log('OK: Select onChange now toggles custom input');
}

// 3. Add the custom budget input field after </select>
const afterSelect = `                      </select>
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">`;

const afterSelectNew = `                      </select>
                      {showCustomBudget && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Enter your budget in ` + "${currency.code}" + `"
                            value={customBudget}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomBudget(val);
                              if (val && !isNaN(Number(val)) && Number(val) > 0) {
                                setFormData({ ...formData, budget: currency.code + " " + Number(val).toLocaleString("en-US") });
                              }
                            }}
                            className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground"
                          />
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">`;

if (p.includes(afterSelect)) {
  p = p.replace(afterSelect, afterSelectNew);
  console.log('OK: Custom budget input field added');
} else {
  console.log('SKIP: Could not find insert point after </select>');
}

fs.writeFileSync('src/app/page.tsx', p);
