const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix the select onChange to keep "Under..." selected
const oldOnChange = `onChange={(e) => {
                        const val = e.target.value;
                        if (val === currency.ranges[0]?.label) {
                          setShowCustomBudget(true);
                          setFormData({ ...formData, budget: "" });
                        } else {
                          setShowCustomBudget(false);
                          setFormData({ ...formData, budget: val });
                        }
                      }}`;

const newOnChange = `onChange={(e) => {
                        const val = e.target.value;
                        if (val === currency.ranges[0]?.label) {
                          setShowCustomBudget(true);
                          setFormData({ ...formData, budget: val });
                          setCustomBudget("");
                        } else {
                          setShowCustomBudget(false);
                          setFormData({ ...formData, budget: val });
                        }
                      }}`;

if (p.includes(oldOnChange)) {
  p = p.replace(oldOnChange, newOnChange);
  console.log('OK: Fixed select onChange to keep "Under..." selected');
}

// Fix the custom input to have proper label
const oldInput = `{showCustomBudget && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Enter your budget in `;

const newInput = `{showCustomBudget && (
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
                                setFormData({ ...formData, budget: currency.ranges[0]?.label });
                              }
                            }}
                            className="form-input w-full px-4 py-3 rounded-md text-sm md:text-[18px] text-foreground"
                          />
                        </div>
                      )}`;

// The old input block includes the full placeholder line - let's find and replace a unique snippet
const oldSnippet = 'placeholder="Enter your budget in';
const oldBlockStart = p.indexOf(oldSnippet);
if (oldBlockStart > 0) {
  // Find the start of the {showCustomBudget && ( block
  let blockStart = p.lastIndexOf('{showCustomBudget && (', oldBlockStart);
  // Find the end of the block
  let blockEnd = p.indexOf(')}', oldBlockStart);
  if (blockEnd > 0) blockEnd = p.indexOf('>', blockEnd) + 1; // include closing >
  if (blockEnd > 0) blockEnd = p.indexOf('\n', blockEnd) + 1; // include newline
  if (blockEnd > 0 && blockEnd < blockStart + 2000) {
    const oldBlock = p.substring(blockStart, blockEnd + 20);
    p = p.replace(oldBlock, newInput);
    console.log('OK: Custom input field updated with label');
  } else {
    console.log('SKIP: Could not isolate custom input block');
  }
} else {
  console.log('SKIP: Custom input not found - may not have been added yet');
}

fs.writeFileSync('src/app/page.tsx', p);
