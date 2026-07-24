const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add error message below the input
const oldClose = `                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message`;

const newClose = `                    </div>
                    {budgetError && (
                      <p className="text-red-500 text-xs mt-1">{budgetError}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                      Message`;

if (p.includes(oldClose)) {
  p = p.replace(oldClose, newClose);
  console.log('✅ Error message added');
} else {
  console.log('⚠️ Pattern 1 not found');
}

// 2. Add budget validation to handleSubmit
const oldSubmit = `  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setFormState("sent");
          setFormData({ name: "", email: "", message: "", budget: "" });
          setTimeout(() => setFormState("idle"), 4000);
        } else {
          setFormState("idle");
          alert("Something went wrong. Please try again.");
        }
      } catch {
        setFormState("idle");
        alert("Network error. Please check your connection and try again.");
      }
    },
    [formData]`;

const newSubmit = `  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate budget before sending
      if (formData.budget) {
        const val = Number(formData.budget);
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
        if (val < minBudget) {
          setBudgetError('Minimum budget is ' + currency.code + ' ' + minBudget.toLocaleString("en-US"));
          return;
        }
      }
      
      setFormState("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setFormState("sent");
          setFormData({ name: "", email: "", message: "", budget: "" });
          setBudgetError("");
          setTimeout(() => setFormState("idle"), 4000);
        } else {
          setFormState("idle");
          alert("Something went wrong. Please try again.");
        }
      } catch {
        setFormState("idle");
        alert("Network error. Please check your connection and try again.");
      }
    },
    [formData, currency.code, currency.r]`;

if (p.includes(oldSubmit)) {
  p = p.replace(oldSubmit, newSubmit);
  console.log('✅ Submit validation added');
} else {
  console.log('⚠️ Pattern 2 not found');
}

fs.writeFileSync('src/app/page.tsx', p);
