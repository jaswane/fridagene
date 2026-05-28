// Quick smoke-check for holiday engine. Run with: npx tsx scripts/check.mjs
import {
  easterSunday,
  publicHolidays,
  longWeekends,
  bridgeDays,
  workdaysInYear,
  fridayAfterAscension,
  isoDate,
  isoWeekMonday,
  addDays,
  getWeekendStatus,
  dateOf,
} from "../lib/holidays.ts";
import {
  FIRST_SUPPORTED_YEAR,
  getSupportedYears,
  isSupportedYear,
  maxSupportedYear,
  currentYear,
} from "../lib/years.ts";
import { allYearSlugs, parseYearSlug } from "../lib/routing.ts";

let failures = 0;
function assert(label, cond) {
  console.log(`${cond ? "ok  " : "FAIL"} ${label}`);
  if (!cond) failures++;
}

console.log("--- Rullerende årsvindu ---");
const cy = currentYear();
const max = maxSupportedYear();
console.log(`currentYear=${cy}  window=${FIRST_SUPPORTED_YEAR}..${max}`);
assert("2025 finnes fortsatt", getSupportedYears().includes(2025));
assert("currentYear + 10 finnes", getSupportedYears().includes(cy + 10));
assert(`helligdager-${cy + 10} parser ok`, !!parseYearSlug(`helligdager-${cy + 10}`));
assert(`fa-mest-fri-${cy + 10} parser ok`, !!parseYearSlug(`fa-mest-fri-${cy + 10}`));
assert(`flaggdager-${cy + 10} parser ok`, !!parseYearSlug(`flaggdager-${cy + 10}`));
assert("helligdager-2024 → null (før FIRST_SUPPORTED_YEAR)", parseYearSlug("helligdager-2024") === null);
assert(`helligdager-${cy + 11} → null (utenfor vindu)`, parseYearSlug(`helligdager-${cy + 11}`) === null);
assert("isSupportedYear(2024) === false", isSupportedYear(2024) === false);
assert(`isSupportedYear(${cy + 10}) === true`, isSupportedYear(cy + 10) === true);

console.log("\n--- Routing/sitemap-konsistens ---");
const slugs = allYearSlugs().map((s) => s.slug);
const everyParses = slugs.every((s) => parseYearSlug(s) !== null);
assert(`alle ${slugs.length} prebuilt slugs parser ok`, everyParses);
assert(`helligdager-${cy + 10} er i allYearSlugs`, slugs.includes(`helligdager-${cy + 10}`));


console.log("--- Easter sanity ---");
for (const y of [2025, 2026, 2027, 2028, 2030, 2035]) {
  console.log(y, isoDate(easterSunday(y)));
}

console.log("\n--- Public holidays 2026 ---");
for (const h of publicHolidays(2026)) console.log(h.date, h.name);

console.log("\n--- Workdays per year ---");
for (const y of [2025, 2026, 2027, 2028]) console.log(y, workdaysInYear(y));

console.log("\n--- Bridge days 2026 ---");
for (const b of bridgeDays(2026)) console.log(b.date, b.description);

console.log("\n--- Long weekends 2026 ---");
for (const lw of longWeekends(2026))
  console.log(
    lw.start,
    "->",
    lw.end,
    "(" + lw.days + "d)",
    lw.includes.holidays.join("; ") || "helg",
    lw.includes.bridges.length ? "+bridges " + lw.includes.bridges.join(",") : ""
  );

console.log("\n--- Friday after Ascension 2026 ---", isoDate(fridayAfterAscension(2026)));

console.log("\n--- Fellesferie + helg-status ---");
assert("fellesferie 2026 uke 28 = mandag 6. juli", isoDate(isoWeekMonday(2026, 28)) === "2026-07-06");
assert("fellesferie 2026 uke 30 fredag = 24. juli", isoDate(addDays(isoWeekMonday(2026, 30), 4)) === "2026-07-24");
// 2026-05-29 er fredag → "Helgen starter i morgen"
assert("fredag → helg i morgen", getWeekendStatus(dateOf(2026, 5, 29)).label === "Helgen starter i morgen.");
// 2026-05-25 er mandag → helg om 5 dager
assert("mandag → helg om 5 dager", getWeekendStatus(dateOf(2026, 5, 25)).label === "Helg om 5 dager.");
// 2026-05-30 er lørdag → helg nå
assert("lørdag → det er helg nå", getWeekendStatus(dateOf(2026, 5, 30)).isWeekendNow === true);

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"}`);
if (failures > 0) process.exit(1);
