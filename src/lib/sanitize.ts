// Lightweight XSS sanitization - strips HTML tags and dangerous characters
export function sanitize(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[\r\n]/g, " ") // Strip newlines (prevents header injection)
    .trim();
}

export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitize(value);
    } else if (typeof value === "boolean") {
      sanitized[key] = value;
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
}
