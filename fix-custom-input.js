const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Insert custom budget input between </select> and the Message label div
const oldBlock = `                      </select>
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message`;

const newBlock = `                      </select>
                      {showCustomBudget && (
                        <div className="mt-3">
                          <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                            Enter your budget
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 500000"
                            value={customBudget}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomBudget(val);
                              if (val && !isNaN(Number(val)) && Number(val) > 0) {
                                setFormData({ ...formData, budget: currency.code + " " + Number(val).toLocaleString("en-US") });
                              } else {
                                setFormData({ ...formData, budget: currency.ranges[0]?.label || "" });
                              }
                            }}
                            className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground"
                          />
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message`;

if (p.includes(oldBlock)) {
  p = p.replace(oldBlock, newBlock);
  console.log('✅ Custom budget input added after select');
} else {
  console.log('⚠️ Could not find insert point');
}

fs.writeFileSync('src/app/page.tsx', p);
