const fs = require('fs');
let p = fs.readFileSync('src/app/page.tsx', 'utf8');

const NEW_BLOCK = `/* ────────────── CURRENCY DETECTION (country-level) ────────────── */

/* Base USD thresholds used to generate local-currency budget ranges */
const USD_THRESHOLDS = [1000, 3000, 5000, 10000, 25000];

/* Nigeria-specific thresholds in NGN */
const NGN_THRESHOLDS = [500000, 1500000, 3000000, 5000000, 10000000];

function fmtNum(n) { return n.toLocaleString("en-US"); }

function makeRanges(symbol, rate, thresholds) {
  var loc = (thresholds || USD_THRESHOLDS).map(function(t) { return Math.round(t * rate); });
  return [
    { label: "Under " + symbol + fmtNum(loc[0]), isCustom: true },
    { label: symbol + fmtNum(loc[0]) + " \\u2013 " + symbol + fmtNum(loc[1]) },
    { label: symbol + fmtNum(loc[1]) + " \\u2013 " + symbol + fmtNum(loc[2]) },
    { label: symbol + fmtNum(loc[2]) + " \\u2013 " + symbol + fmtNum(loc[3]) },
    { label: symbol + fmtNum(loc[3]) + " \\u2013 " + symbol + fmtNum(loc[4]) },
    { label: symbol + fmtNum(loc[4]) + "+" },
  ];
}

/* Timezone → { symbol, code, rate (vs USD), useNGN (bool) } */
const TZ_MAP = {
  /* ── Africa ── */
  "Africa/Lagos":                          { s: "\\u20A6", c: "NGN", r: 1, useNGN: true },
  "Africa/Douala":                         { s: "CFA", c: "XAF", r: 600 },
  "Africa/Bangui":                         { s: "CFA", c: "XAF", r: 600 },
  "Africa/Brazzaville":                    { s: "CFA", c: "XAF", r: 600 },
  "Africa/Libreville":                     { s: "CFA", c: "XAF", r: 600 },
  "Africa/Malabo":                         { s: "CFA", c: "XAF", r: 600 },
  "Africa/Ndjamena":                       { s: "CFA", c: "XAF", r: 600 },
  "Africa/Kinshasa":                       { s: "CFA", c: "XAF", r: 600 },
  "Africa/Accra":                          { s: "\\u20B5", c: "GHS", r: 15 },
  "Africa/Nairobi":                        { s: "KSh", c: "KES", r: 150 },
  "Africa/Johannesburg":                   { s: "R", c: "ZAR", r: 18 },
  "Africa/Cairo":                          { s: "E\\u00A3", c: "EGP", r: 48 },
  "Africa/Casablanca":                     { s: "MAD", c: "MAD", r: 10 },
  "Africa/Tunis":                          { s: "TND", c: "TND", r: 3.1 },
  "Africa/Algiers":                        { s: "DZD", c: "DZD", r: 134 },
  "Africa/Abidjan":                        { s: "CFA", c: "XOF", r: 600 },
  "Africa/Dakar":                          { s: "CFA", c: "XOF", r: 600 },
  "Africa/Bamako":                         { s: "CFA", c: "XOF", r: 600 },
  "Africa/Ouagadougou":                    { s: "CFA", c: "XOF", r: 600 },
  "Africa/Niamey":                         { s: "CFA", c: "XOF", r: 600 },
  "Africa/Porto-Novo":                     { s: "CFA", c: "XOF", r: 600 },
  "Africa/Lome":                           { s: "CFA", c: "XOF", r: 600 },
  "Africa/Conakry":                        { s: "CFA", c: "XOF", r: 600 },
  "Africa/Bissau":                         { s: "CFA", c: "XOF", r: 600 },
  "Africa/Freetown":                       { s: "CFA", c: "XOF", r: 600 },
  "Africa/Monrovia":                       { s: "CFA", c: "XOF", r: 600 },
  "Africa/Dar_es_Salaam":                  { s: "TZS", c: "TZS", r: 2650 },
  "Africa/Kampala":                        { s: "UGX", c: "UGX", r: 3700 },
  "Africa/Addis_Ababa":                    { s: "Br", c: "ETB", r: 57 },
  "Africa/Maputo":                         { s: "MZN", c: "MZN", r: 64 },
  "Africa/Harare":                         { s: "ZWL", c: "ZWL", r: 3600 },
  "Africa/Lusaka":                         { s: "ZMW", c: "ZMW", r: 27 },
  "Africa/Kigali":                         { s: "FRw", c: "RWF", r: 1300 },
  "Africa/Antananarivo":                   { s: "Ar", c: "MGA", r: 4500 },
  "Africa/Mogadishu":                      { s: "Sh", c: "SOS", r: 570 },
  "Africa/Tripoli":                        { s: "LD", c: "LYD", r: 4.9 },
  "Africa/Khartoum":                       { s: "SDG", c: "SDG", r: 600 },
  "Africa/Windhoek":                       { s: "N$", c: "NAD", r: 18 },
  "Africa/Blantyre":                       { s: "MK", c: "MWK", r: 1720 },
  "Africa/Gaborone":                       { s: "P", c: "BWP", r: 13.7 },

  /* ── Europe ── */
  "Europe/London":                         { s: "\\u00A3", c: "GBP", r: 0.79 },
  "Europe/Dublin":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Paris":                          { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Berlin":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Madrid":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Rome":                           { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Amsterdam":                      { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Brussels":                       { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Vienna":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Helsinki":                       { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Lisbon":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Athens":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Tallinn":                        { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Vilnius":                        { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Riga":                           { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Ljubljana":                      { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Bratislava":                     { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Zagreb":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Luxembourg":                     { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Valletta":                       { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Nicosia":                        { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Zurich":                         { s: "CHF", c: "CHF", r: 0.88 },
  "Europe/Stockholm":                      { s: "kr", c: "SEK", r: 10.5 },
  "Europe/Oslo":                           { s: "kr", c: "NOK", r: 10.8 },
  "Europe/Copenhagen":                     { s: "kr", c: "DKK", r: 6.9 },
  "Europe/Warsaw":                         { s: "z\\u0142", c: "PLN", r: 4 },
  "Europe/Prague":                         { s: "K\\u010D", c: "CZK", r: 23 },
  "Europe/Budapest":                       { s: "Ft", c: "HUF", r: 365 },
  "Europe/Bucharest":                      { s: "lei", c: "RON", r: 4.6 },
  "Europe/Sofia":                          { s: "\\u043B\\u0432", c: "BGN", r: 1.8 },
  "Europe/Belgrade":                       { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Podgorica":                      { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Sarajevo":                       { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Skopje":                         { s: "\\u20AC", c: "EUR", r: 0.92 },
  "Europe/Istanbul":                       { s: "\\u20BA", c: "TRY", r: 32 },
  "Europe/Moscow":                         { s: "\\u20BD", c: "RUB", r: 90 },
  "Europe/Samara":                         { s: "\\u20BD", c: "RUB", r: 90 },
  "Europe/Kiev":                           { s: "\\u20B4", c: "UAH", r: 40 },
  "Europe/Uzhgorod":                       { s: "\\u20B4", c: "UAH", r: 40 },
  "Europe/Minsk":                          { s: "Br", c: "BYN", r: 3.2 },
  "Europe/Reykjavik":                      { s: "kr", c: "ISK", r: 138 },
  "Europe/Tirane":                         { s: "L", c: "ALL", r: 95 },

  /* ── Americas ── */
  "America/New_York":                      { s: "$", c: "USD", r: 1 },
  "America/Chicago":                       { s: "$", c: "USD", r: 1 },
  "America/Denver":                        { s: "$", c: "USD", r: 1 },
  "America/Los_Angeles":                   { s: "$", c: "USD", r: 1 },
  "America/Anchorage":                     { s: "$", c: "USD", r: 1 },
  "America/Phoenix":                       { s: "$", c: "USD", r: 1 },
  "America/Detroit":                       { s: "$", c: "USD", r: 1 },
  "America/Indiana/Indianapolis":          { s: "$", c: "USD", r: 1 },
  "America/Kentucky/Louisville":           { s: "$", c: "USD", r: 1 },
  "America/Boise":                         { s: "$", c: "USD", r: 1 },
  "America/Toronto":                       { s: "C$", c: "CAD", r: 1.37 },
  "America/Vancouver":                     { s: "C$", c: "CAD", r: 1.37 },
  "America/Montreal":                      { s: "C$", c: "CAD", r: 1.37 },
  "America/Edmonton":                      { s: "C$", c: "CAD", r: 1.37 },
  "America/Winnipeg":                      { s: "C$", c: "CAD", r: 1.37 },
  "America/Halifax":                       { s: "C$", c: "CAD", r: 1.37 },
  "America/Regina":                        { s: "C$", c: "CAD", r: 1.37 },
  "America/Mexico_City":                   { s: "MX$", c: "MXN", r: 17 },
  "America/Cancun":                        { s: "MX$", c: "MXN", r: 17 },
  "America/Monterrey":                     { s: "MX$", c: "MXN", r: 17 },
  "America/Sao_Paulo":                     { s: "R$", c: "BRL", r: 5 },
  "America/Rio_Branco":                    { s: "R$", c: "BRL", r: 5 },
  "America/Manaus":                        { s: "R$", c: "BRL", r: 5 },
  "America/Argentina/Buenos_Aires":        { s: "AR$", c: "ARS", r: 900 },
  "America/Bogota":                        { s: "COL$", c: "COP", r: 4150 },
  "America/Lima":                          { s: "S/", c: "PEN", r: 3.7 },
  "America/Santiago":                      { s: "CLP$", c: "CLP", r: 950 },
  "America/Caracas":                       { s: "Bs.", c: "VES", r: 36 },
  "America/Guayaquil":                     { s: "$", c: "USD", r: 1 },
  "America/Quito":                         { s: "$", c: "USD", r: 1 },
  "America/La_Paz":                        { s: "Bs", c: "BOB", r: 6.9 },
  "America/Asuncion":                      { s: "Gs", c: "PYG", r: 7300 },
  "America/Montevideo":                    { s: "U$", c: "UYU", r: 40 },
  "America/Tegucigalpa":                   { s: "L", c: "HNL", r: 25 },
  "America/Managua":                       { s: "C$", c: "NIO", r: 37 },
  "America/San_Jose":                      { s: "\\u20A1", c: "CRC", r: 530 },
  "America/Panama":                        { s: "B/.", c: "USD", r: 1 },
  "America/Havana":                        { s: "$", c: "CUP", r: 24 },
  "America/Santo_Domingo":                 { s: "RD$", c: "DOP", r: 60 },
  "America/Port-au-Prince":                { s: "G", c: "HTG", r: 133 },
  "America/Jamaica":                       { s: "J$", c: "JMD", r: 158 },

  /* ── Asia ── */
  "Asia/Tokyo":                            { s: "\\u00A5", c: "JPY", r: 155 },
  "Asia/Shanghai":                         { s: "\\u00A5", c: "CNY", r: 7.2 },
  "Asia/Chongqing":                        { s: "\\u00A5", c: "CNY", r: 7.2 },
  "Asia/Harbin":                           { s: "\\u00A5", c: "CNY", r: 7.2 },
  "Asia/Urumqi":                           { s: "\\u00A5", c: "CNY", r: 7.2 },
  "Asia/Hong_Kong":                        { s: "HK$", c: "HKD", r: 7.8 },
  "Asia/Taipei":                           { s: "NT$", c: "TWD", r: 32 },
  "Asia/Seoul":                            { s: "\\u20A9", c: "KRW", r: 1370 },
  "Asia/Singapore":                        { s: "S$", c: "SGD", r: 1.34 },
  "Asia/Kolkata":                          { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/Calcutta":                         { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/Mumbai":                           { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/Chennai":                          { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/Bangalore":                        { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/Hyderabad":                        { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/New_Delhi":                        { s: "\\u20B9", c: "INR", r: 83 },
  "Asia/Bangkok":                          { s: "\\u0E3F", c: "THB", r: 35 },
  "Asia/Dubai":                            { s: "AED", c: "AED", r: 3.67 },
  "Asia/Muscat":                           { s: "AED", c: "AED", r: 3.67 },
  "Asia/Riyadh":                           { s: "SAR", c: "SAR", r: 3.75 },
  "Asia/Qatar":                            { s: "SAR", c: "SAR", r: 3.75 },
  "Asia/Karachi":                          { s: "Rs", c: "PKR", r: 278 },
  "Asia/Lahore":                           { s: "Rs", c: "PKR", r: 278 },
  "Asia/Dhaka":                            { s: "\\u09F3", c: "BDT", r: 121 },
  "Asia/Jakarta":                          { s: "Rp", c: "IDR", r: 15800 },
  "Asia/Kuala_Lumpur":                     { s: "RM", c: "MYR", r: 4.7 },
  "Asia/Manila":                           { s: "\\u20B1", c: "PHP", r: 58 },
  "Asia/Ho_Chi_Minh":                      { s: "\\u20AB", c: "VND", r: 25000 },
  "Asia/Phnom_Penh":                       { s: "\\u17DB", c: "KHR", r: 4100 },
  "Asia/Yangon":                           { s: "K", c: "MMK", r: 2100 },
  "Asia/Colombo":                          { s: "Rs", c: "LKR", r: 305 },
  "Asia/Kathmandu":                        { s: "Rs", c: "NPR", r: 133 },
  "Asia/Dili":                             { s: "$", c: "USD", r: 1 },
  "Asia/Bishkek":                          { s: "som", c: "KGS", r: 89 },
  "Asia/Tashkent":                         { s: "so\\u02BCm", c: "UZS", r: 12800 },
  "Asia/Almaty":                           { s: "\\u20B8", c: "KZT", r: 456 },
  "Asia/Ashgabat":                         { s: "m", c: "TMT", r: 3.5 },
  "Asia/Kabul":                            { s: "\\u060B", c: "AFN", r: 71 },
  "Asia/Tehran":                           { s: "\\uFDFC", c: "IRR", r: 42000 },
  "Asia/Baku":                             { s: "\\u20BC", c: "AZN", r: 1.7 },
  "Asia/Tbilisi":                          { s: "\\u20BE", c: "GEL", r: 2.7 },
  "Asia/Yerevan":                          { s: "\\u058F", c: "AMD", r: 388 },
  "Asia/Jerusalem":                        { s: "\\u20AA", c: "ILS", r: 3.7 },

  /* ── Oceania ── */
  "Australia/Sydney":                      { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Melbourne":                   { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Perth":                       { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Brisbane":                    { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Adelaide":                    { s: "A$", c: "AUD", r: 1.55 },
  "Australia/Darwin":                      { s: "A$", c: "AUD", r: 1.55 },
  "Pacific/Auckland":                      { s: "NZ$", c: "NZD", r: 1.72 },
  "Pacific/Fiji":                          { s: "FJ$", c: "FJD", r: 2.25 },
};

function lookupTZ(tz) { return TZ_MAP[tz] || null; }

const LANG_TZ = {
  "GB": "Europe/London", "NG": "Africa/Lagos", "CM": "Africa/Douala",
  "GH": "Africa/Accra", "KE": "Africa/Nairobi", "ZA": "Africa/Johannesburg",
  "US": "America/New_York", "CA": "America/Toronto", "JP": "Asia/Tokyo",
  "CN": "Asia/Shanghai", "IN": "Asia/Kolkata", "DE": "Europe/Berlin",
  "FR": "Europe/Paris", "BR": "America/Sao_Paulo", "AU": "Australia/Sydney",
  "AE": "Asia/Dubai", "SA": "Asia/Riyadh", "PK": "Asia/Karachi",
  "BD": "Asia/Dhaka", "PH": "Asia/Manila", "MY": "Asia/Kuala_Lumpur",
  "ID": "Asia/Jakarta", "TH": "Asia/Bangkok", "VN": "Asia/Ho_Chi_Minh",
  "EG": "Africa/Cairo", "MA": "Africa/Casablanca", "TN": "Africa/Tunis",
  "TZ": "Africa/Dar_es_Salaam", "UG": "Africa/Kampala", "ET": "Africa/Addis_Ababa",
  "SE": "Europe/Stockholm", "NO": "Europe/Oslo", "DK": "Europe/Copenhagen",
  "PL": "Europe/Warsaw", "CH": "Europe/Zurich", "TR": "Europe/Istanbul",
  "RU": "Europe/Moscow", "UA": "Europe/Kiev", "MX": "America/Mexico_City",
  "CO": "America/Bogota", "PE": "America/Lima", "CL": "America/Santiago",
  "AR": "America/Argentina/Buenos_Aires", "KR": "Asia/Seoul", "SG": "Asia/Singapore",
  "NZ": "Pacific/Auckland", "IE": "Europe/Dublin", "IT": "Europe/Rome",
  "ES": "Europe/Madrid", "NL": "Europe/Amsterdam", "BE": "Europe/Brussels",
  "PT": "Europe/Lisbon", "AT": "Europe/Vienna", "FI": "Europe/Helsinki",
  "GR": "Europe/Athens", "CZ": "Europe/Prague", "HU": "Europe/Budapest",
  "RO": "Europe/Bucharest", "IL": "Asia/Jerusalem",
  "SN": "Africa/Dakar", "CI": "Africa/Abidjan", "ML": "Africa/Bamako",
  "BF": "Africa/Ouagadougou", "NE": "Africa/Niamey", "BJ": "Africa/Porto-Novo",
  "TG": "Africa/Lome", "GN": "Africa/Conakry", "SL": "Africa/Freetown",
  "LR": "Africa/Monrovia", "TD": "Africa/Ndjamena", "CG": "Africa/Brazzaville",
  "GA": "Africa/Libreville", "GQ": "Africa/Malabo", "CF": "Africa/Bangui",
  "CD": "Africa/Kinshasa", "ZM": "Africa/Lusaka", "RW": "Africa/Kigali",
  "MG": "Africa/Antananarivo", "SO": "Africa/Mogadishu", "LY": "Africa/Tripoli",
  "SD": "Africa/Khartoum", "NA": "Africa/Windhoek", "MW": "Africa/Blantyre",
  "MZ": "Africa/Maputo", "BW": "Africa/Gaborone",
};

function regionFallback(tz) {
  var region = tz.split("/")[0];
  if (region === "Europe") return { s: "\\u20AC", c: "EUR", r: 0.92 };
  if (region === "Africa") return { s: "\\u20AC", c: "EUR", r: 0.92 };
  if (region === "Asia") return { s: "$", c: "USD", r: 1 };
  return { s: "$", c: "USD", r: 1 };
}

function getCurrencyFromTimezone() {
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    var cfg = lookupTZ(tz);
    if (cfg) {
      if (cfg.useNGN) return { symbol: cfg.s, code: cfg.c, ranges: makeRanges(cfg.s, cfg.r, NGN_THRESHOLDS) };
      return { symbol: cfg.s, code: cfg.c, ranges: makeRanges(cfg.s, cfg.r) };
    }
  } catch (e) {}
  try {
    var lang = (navigator.language || "").split("-")[1] || "";
    if (lang && LANG_TZ[lang]) {
      var cfg2 = lookupTZ(LANG_TZ[lang]);
      if (cfg2) {
        if (cfg2.useNGN) return { symbol: cfg2.s, code: cfg2.c, ranges: makeRanges(cfg2.s, cfg2.r, NGN_THRESHOLDS) };
        return { symbol: cfg2.s, code: cfg2.c, ranges: makeRanges(cfg2.s, cfg2.r) };
      }
    }
  } catch (e) {}
  try {
    var tz2 = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    var cfg3 = regionFallback(tz2);
    return { symbol: cfg3.s, code: cfg3.c, ranges: makeRanges(cfg3.s, cfg3.r) };
  } catch (e) {}
  return { symbol: "$", code: "USD", ranges: makeRanges("$", 1) };
}

const DEFAULT_CURRENCY = { symbol: "$", code: "USD", ranges: makeRanges("$", 1) };

function handleCustomBudget(ranges, currencyCode, onBudgetSelect) {
  return function(selectedRange) {
    if (selectedRange && selectedRange.isCustom) {
      var budget = prompt("Enter your budget in " + currencyCode + ":");
      if (budget && !isNaN(budget) && Number(budget) > 0) {
        onBudgetSelect(currencyCode + " " + fmtNum(Number(budget)));
      } else if (budget !== null) {
        alert("Please enter a valid number greater than 0");
      }
    } else if (selectedRange) {
      onBudgetSelect(selectedRange.label);
    }
  };
}`;

// Replace from "/* ────────────── CURRENCY DETECTION" to "const DEFAULT_CURRENCY..."
var oldBlock = /\/\* ─+ CURRENCY DETECTION[\s\S]*?const DEFAULT_CURRENCY\s*=\s*\{[^}]*\}\s*;/;
var m = p.match(oldBlock);
if (!m) { console.log('SKIP: could not find old currency block'); process.exit(1); }
p = p.replace(oldBlock, NEW_BLOCK);
console.log('OK: Replaced currency block (' + m[0].length + ' chars -> ' + NEW_BLOCK.length + ' chars)');

// Update dropdown handler
var dropdownPattern = /(onValueChange|onChange)=\{\((\w+)\)\s*=>\s*setSelectedBudget\([^)]+\)\}/;
var dropdownMatch = p.match(dropdownPattern);
if (dropdownMatch) {
  var oldHandler = dropdownMatch[0];
  var newHandler = 'onValueChange={handleCustomBudget(currency.ranges, currency.code, setSelectedBudget)}';
  p = p.replace(oldHandler, newHandler);
  console.log('OK: Updated dropdown to use handleCustomBudget');
} else {
  console.log('WARN: Could not auto-update dropdown handler.');
  console.log('      Manually replace onValueChange with:');
  console.log('      onValueChange={handleCustomBudget(currency.ranges, currency.code, setSelectedBudget)}');
}

fs.writeFileSync('src/app/page.tsx', p);
