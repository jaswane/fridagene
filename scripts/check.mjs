// Quick smoke-check for holiday engine. Run with: npx tsx scripts/check.mjs
import {
  easterSunday,
  publicHolidays,
  longWeekends,
  bridgeDays,
  workdaysInYear,
  fridayAfterAscension,
  isoDate,
} from "../lib/holidays.ts";

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
    lw.includes.bridge ? "+bridge " + lw.includes.bridge : ""
  );

console.log("\n--- Friday after Ascension 2026 ---", isoDate(fridayAfterAscension(2026)));
