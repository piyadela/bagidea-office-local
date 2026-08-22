#!/usr/bin/env node
// เทียบ fork นี้กับ bagidea/bagidea-office ต้นทาง แล้วบอกว่า "อะไรหยิบมาได้บ้าง"
// โดยไม่ merge ทั้งก้อน — fork นี้ไม่มีประวัติร่วมกับต้นทาง (คนละ root commit) และมี
// Local CLI engine (codex/grok/agy) ที่ต้นทางไม่มี การ merge ตรงๆ จะทับของเราหาย
//
//   node scripts/upstream-diff.js              สรุปว่าควรหยิบอะไร
//   node scripts/upstream-diff.js <ไฟล์>       ดู patch ของไฟล์นั้น (จากจุดที่ไฟล์นั้นแยกตัว)
//
// วิธีจัดกลุ่ม: ไฟล์บนดิสก์ของเราถูกเทียบ hash กับ blob ของ "ทุก commit ต้นทาง" ย้อนหลัง
// ถ้าตรงกับ commit ไหน แปลว่าเราไม่เคยแก้ไฟล์นั้น (แค่หยุดอยู่ที่ commit นั้น) → ทับได้
// ถ้าไม่ตรงกับ commit ไหนเลย แปลว่าเราแก้เอง → ต้องอ่าน patch ก่อน
// ใช้ partial clone (--filter=blob:none) จึงเร็วและไม่กินดิสก์

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const UPSTREAM = "https://github.com/bagidea/bagidea-office.git";

const git = (...args) => {
  try {
    return execFileSync("git", args,
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch { return null; }
};
const gitLines = (...args) => (git(...args) || "").split("\n").filter(Boolean);

if (!git("remote", "get-url", "upstream")) {
  console.log("ตั้ง remote upstream ให้ก่อน...");
  git("remote", "add", "upstream", UPSTREAM);
}
const localVer = String(fs.readFileSync(path.join(ROOT, "VERSION"), "utf8")).trim();
const baseTag = "upstream-v" + localVer;
process.stdout.write("ดึงข้อมูลต้นทาง...");
git("fetch", "--filter=blob:none", "--no-tags", "upstream",
  "main:refs/remotes/upstream/main", "+refs/tags/v" + localVer + ":refs/tags/" + baseTag);
console.log(" เสร็จ");
if (!git("rev-parse", "--verify", "--quiet", baseTag)) {
  console.log("ต้นทางไม่มี tag v" + localVer + " — เทียบจุดแยกตัวไม่ได้");
  process.exit(1);
}
const upVer = git("show", "upstream/main:VERSION") || "?";
// commit ต้นทางตั้งแต่จุดอ้างอิง เรียงจากใหม่ไปเก่า
const commits = gitLines("rev-list", baseTag + "..upstream/main").concat(git("rev-parse", baseTag));

// commit ต้นทางที่ล่าสุดซึ่งเนื้อไฟล์ตรงกับของเราเป๊ะ (null = เราแก้เอง)
function ourBase(file) {
  const ours = git("hash-object", "--", path.join(ROOT, file));
  if (!ours) return null;
  for (const c of commits) if (git("rev-parse", c + ":" + file) === ours) return c;
  return null;
}

const only = process.argv[2];
if (only) {
  const from = ourBase(only) || baseTag;
  console.log("เทียบจาก " + git("log", "-1", "--format=%h %s", from) + "\n");
  console.log(git("diff", from, "upstream/main", "--", only) ||
    "ต้นทางไม่ได้แก้ " + only + " เลยตั้งแต่จุดนั้น");
  process.exit(0);
}

const NUM = {};
for (const l of gitLines("diff", "--numstat", baseTag, "upstream/main")) {
  const p = l.split("\t");
  NUM[p[2]] = "+" + p[0] + "/-" + p[1];
}
const tracked = new Set(gitLines("ls-files"));
const current = [], safe = [], review = [], absent = [];
for (const f of Object.keys(NUM)) {
  if (!fs.existsSync(path.join(ROOT, f))) { absent.push(f); continue; }
  const base = ourBase(f);
  if (!base) { review.push(f); continue; }
  const behind = gitLines("diff", "--numstat", base, "upstream/main", "--", f)[0];
  if (!behind) current.push(f);
  else { const p = behind.split("\t"); safe.push([f, "+" + p[0] + "/-" + p[1]]); }
}

console.log("\nVERSION ในเครื่อง " + localVer + " · ต้นทาง " + upVer + " · ต้นทางมี commit ใหม่ " +
  (commits.length - 1) + " ครั้ง\n");

console.log("✔ ตรงกับต้นทางแล้ว (" + current.length + ") — ไม่ต้องทำอะไร");
if (current.length) console.log("   " + current.join(", "));

console.log("\n✅ หยิบมาได้เลย (" + safe.length + ") — คุณไม่เคยแก้ไฟล์นี้ ทับได้ไม่เสียอะไร");
safe.forEach(([f, s]) => console.log("   " + s.padEnd(12) + " " + f));
if (safe.length)
  console.log("   → git checkout upstream/main -- " + safe.slice(0, 3).map((x) => x[0]).join(" ") +
    (safe.length > 3 ? " ..." : ""));

console.log("\n⚠ ต้องอ่านก่อน (" + review.length + ") — คุณแก้ไฟล์นี้เอง ทับแล้วของคุณหาย");
review.forEach((f) => console.log("   " + NUM[f].padEnd(12) + " " + f + (tracked.has(f) ? "  (คุณ commit ไว้)" : "")));
if (review.length)
  console.log("   → node scripts/upstream-diff.js " + review[0] + "   แล้วค่อยเลือกหยิบเป็นส่วนๆ");

console.log("\n➖ ข้ามได้ (" + absent.length + ") — ไฟล์ที่เครื่องคุณไม่มี");
const byDir = {};
absent.forEach((f) => { const d = f.split("/")[0]; byDir[d] = (byDir[d] || 0) + 1; });
console.log("   " + (Object.entries(byDir).map(([d, n]) => d + "/ (" + n + ")").join(", ") || "-"));

console.log("\nต้นทางทำอะไรมาบ้าง:");
gitLines("log", "--format=  %h %s", baseTag + "..upstream/main").forEach((l) => console.log(l));
