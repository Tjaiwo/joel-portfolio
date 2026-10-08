export type Currency = {
  code: string;
  symbol: string;
  min: number;
  name: string;
};

export const CURRENCY_BY_COUNTRY: Record<string, Currency> = {
  // Africa
  NG: { code: "NGN", symbol: "\u20A6", min: 350000, name: "Nigerian Naira" },
  GH: { code: "GHS", symbol: "\u20B5", min: 6200, name: "Ghanaian Cedi" },
  KE: { code: "KES", symbol: "KSh", min: 65000, name: "Kenyan Shilling" },
  ZA: { code: "ZAR", symbol: "R", min: 9500, name: "South African Rand" },
  EG: { code: "EGP", symbol: "E\u00A3", min: 24000, name: "Egyptian Pound" },
  MA: { code: "MAD", symbol: "MAD", min: 5000, name: "Moroccan Dirham" },

  // North America
  US: { code: "USD", symbol: "$", min: 500, name: "US Dollar" },
  CA: { code: "CAD", symbol: "C$", min: 680, name: "Canadian Dollar" },
  MX: { code: "MXN", symbol: "MX$", min: 8500, name: "Mexican Peso" },

  // Europe (Eurozone)
  IE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  DE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  FR: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  ES: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  IT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  NL: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  BE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  AT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  PT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  FI: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  GR: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  LU: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  MT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  CY: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  SK: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  SI: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  EE: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  LV: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },
  LT: { code: "EUR", symbol: "\u20AC", min: 460, name: "Euro" },

  // Europe (non-Eurozone)
  GB: { code: "GBP", symbol: "\u00A3", min: 400, name: "British Pound" },
  CH: { code: "CHF", symbol: "CHF", min: 440, name: "Swiss Franc" },
  SE: { code: "SEK", symbol: "kr", min: 5200, name: "Swedish Krona" },
  NO: { code: "NOK", symbol: "kr", min: 5400, name: "Norwegian Krone" },
  DK: { code: "DKK", symbol: "kr", min: 3400, name: "Danish Krone" },
  PL: { code: "PLN", symbol: "z\u0142", min: 2000, name: "Polish Z\u0142oty" },
  CZ: { code: "CZK", symbol: "K\u010D", min: 11500, name: "Czech Koruna" },
  HU: { code: "HUF", symbol: "Ft", min: 180000, name: "Hungarian Forint" },
  RO: { code: "RON", symbol: "lei", min: 2300, name: "Romanian Leu" },
  TR: { code: "TRY", symbol: "\u20BA", min: 16000, name: "Turkish Lira" },

  // Asia
  IN: { code: "INR", symbol: "\u20B9", min: 42000, name: "Indian Rupee" },
  PK: { code: "PKR", symbol: "Rs", min: 140000, name: "Pakistani Rupee" },
  BD: { code: "BDT", symbol: "\u09F3", min: 60000, name: "Bangladeshi Taka" },
  LK: { code: "LKR", symbol: "Rs", min: 150000, name: "Sri Lankan Rupee" },
  NP: { code: "NPR", symbol: "Rs", min: 67000, name: "Nepalese Rupee" },
  JP: { code: "JPY", symbol: "\u00A5", min: 75000, name: "Japanese Yen" },
  CN: { code: "CNY", symbol: "\u00A5", min: 3600, name: "Chinese Yuan" },
  SG: { code: "SGD", symbol: "S$", min: 670, name: "Singapore Dollar" },
  MY: { code: "MYR", symbol: "RM", min: 2350, name: "Malaysian Ringgit" },
  TH: { code: "THB", symbol: "\u0E3F", min: 17500, name: "Thai Baht" },
  PH: { code: "PHP", symbol: "\u20B1", min: 29000, name: "Philippine Peso" },
  ID: { code: "IDR", symbol: "Rp", min: 7900000, name: "Indonesian Rupiah" },
  VN: { code: "VND", symbol: "\u20AB", min: 12500000, name: "Vietnamese \u0110\u1ED3ng" },
  AE: { code: "AED", symbol: "AED", min: 1840, name: "UAE Dirham" },
  SA: { code: "SAR", symbol: "SAR", min: 1880, name: "Saudi Riyal" },
  IL: { code: "ILS", symbol: "\u20AA", min: 1850, name: "Israeli Shekel" },

  // Oceania
  AU: { code: "AUD", symbol: "A$", min: 760, name: "Australian Dollar" },
  NZ: { code: "NZD", symbol: "NZ$", min: 830, name: "New Zealand Dollar" },

  // South America
  BR: { code: "BRL", symbol: "R$", min: 2500, name: "Brazilian Real" },
  AR: { code: "ARS", symbol: "AR$", min: 450000, name: "Argentine Peso" },
};

export const DEFAULT_CURRENCY: Currency = CURRENCY_BY_COUNTRY.US;

export function getCurrencyByCountry(code: string): Currency {
  return CURRENCY_BY_COUNTRY[code] || DEFAULT_CURRENCY;
}

export function getMinimumBudget(currencyCode: string): number {
  const found = Object.values(CURRENCY_BY_COUNTRY).find(
    (c) => c.code === currencyCode
  );
  return found?.min ?? DEFAULT_CURRENCY.min;
}

export function getCurrencyName(currencyCode: string): string {
  const found = Object.values(CURRENCY_BY_COUNTRY).find(
    (c) => c.code === currencyCode
  );
  return found?.name ?? DEFAULT_CURRENCY.name;
}
