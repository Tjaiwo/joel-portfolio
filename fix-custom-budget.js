const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the budget select onChange to handle custom option
const oldOnChange = `onChange={(e) => setFormData({ ...formData, budget: e.target.value })}`;

const newOnChange = `onChange={(e) => {
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

if (p.includes(oldOnChange)) {
  p = p.replace(oldOnChange, newOnChange);
  console.log('OK: Budget dropdown now triggers custom prompt for first option');
} else {
  console.log('SKIP: Could not find budget onChange');
}

fs.writeFileSync('src/app/page.tsx', p);
