import { z } from "zod";
import { getMinimumBudget } from "./currency";

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long"),

    email: z
      .string()
      .email("Please enter a valid email address")
      .max(254, "Email is too long"),

    projectType: z
      .string()
      .min(1, "Please select a project type"),

    currencyCode: z
      .string()
      .length(3, "Invalid currency code"),

    budget: z
      .string()
      .min(1, "Please enter a budget"),

    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(5000, "Message is too long"),

    signup: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    const min = getMinimumBudget(data.currencyCode);
    const value = Number(data.budget.replace(/,/g, ""));

    if (isNaN(value) || value <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["budget"],
        message: "Please enter a valid number",
      });
      return;
    }

    if (value < min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["budget"],
        message: `Minimum budget for ${data.currencyCode} is ${min.toLocaleString()}`,
      });
    }
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function getFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.issues.forEach((err) => {
    const path = err.path.join(".");
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });
  return errors;
}
