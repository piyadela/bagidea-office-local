# 🏢 BagIdea Office (Local CLI Edition)

[![base](https://img.shields.io/badge/upstream-bagidea--office%20v1.0.4-2b6cb0)](https://github.com/bagidea/bagidea-office)
![runs](https://img.shields.io/badge/runs-web%20only%20·%20no%20build-2f855a)

**BagIdea Office** คือระบบบริหารจัดการทีม AI Agents ทำงานร่วมกันแบบ Multi-Agent Office —
เวอร์ชันนี้ต่อยอดจาก [bagidea/bagidea-office](https://github.com/bagidea/bagidea-office) **v1.0.4**
แล้วปรับให้รันผ่าน **Local CLI Engines** บนเครื่องได้โดยตรง (ไม่ต้องพึ่ง API ภายนอกอย่างเดียว)
และ **รันเป็นเว็บล้วน — ไม่ต้อง build ตัว shell (.exe) หรือ Godot**

---

## ✨ คุณสมบัติเด่น (Features)

1. **💻 รองรับ Local CLI Engines หลากหลาย (Swappable Brains)**
   - **Codex CLI (`codex`)**: เอนจินสำหรับการเขียนโค้ดและทดสอบระบบ พร้อมระบบปลดล็อก Workspace Write Sandbox
   - **Antigravity CLI (`agy`)**: เอนจินจาก Google Antigravity สำหรับงานวิเคราะห์ วิจัย และวางแผน
   - **Grok CLI (`grok`)**: เอนจินสำหรับงานวิเคราะห์ข้อมูลและประมวลผลความเร็วสูง
   - **Claude CLI / API (`claude`)**: เอนจิน Anthropic Claude สำหรับการควบคุมสถาปัตยกรรมระบบหลัก

2. **🛡️ Security Center & Unattended Mode**
   - ระบบควบคุมสิทธิ์การสร้าง/ลบ/แก้ไขไฟล์อย่างปลอดภัย
   - สวิตช์ **`🔓 อนุมัติอัตโนมัติ (autoApprove)`** สำหรับสั่งงานทิ้งไว้โดยไม่ต้องเฝ้ากด Allow
   - ระบบป้องกันไฟล์โปรเจกต์สำคัญจากการถูกลบโดยไม่ได้รับอนุญาต

3. **🛰️ Mission Control & Interactive Task View**
   - แสดงรายการภารกิจของ AI Agents แต่ละท่านแบบ Real-time
   - **คลิกการ์ดภารกิจหรือการ์ด Security Center**: เพื่อสลับไปยังบทสนทนาและดูข้อความคำสั่งตั้งต้นจาก CEO ได้ทันที

4. **🚀 Windows One-Click Launchers**
   - ดับเบิ้ลคลิกรันระบบและเปิดเบราว์เซอร์ได้ทันทีผ่านสคริปต์ Batch (.bat)

---

## 🧭 fork นี้ต่างจากต้นทางยังไง

| เพิ่มเข้ามา | ทำอะไร |
|---|---|
| **Local CLI Engines** | `codex` / `agy` / `grok` รันเป็นสมองของ agent ได้ตรงๆ — ต้นทางไม่มีส่วนนี้เลย |
| **หนึ่งเธรด หนึ่งบ้าน** | ทุกเธรดผูกกับโปรเจคเดียว (`daemon/session-pick.js`) งานเบื้องหลังจึงไม่ไปต่อบทสนทนาของโปรเจคอื่น |
| **โปรเจคประจำของ agent (`home`)** | ทีมที่ผูกกับโปรเจคจะไม่หลุดไปทำที่อื่น ตั้งได้จากหน้า AGENTS |
| **ปิดข้อความขยะได้จริง** | mood line สุ่มทุก ~55 วินาทีเดิมไม่มีสวิตช์ปิด ตอนนี้อยู่ใต้ `socialMin` (ตั้ง 0 = เงียบสนิท) |
| **UI บอกความจริงเรื่องสมอง** | เลือก CLI engine แล้วจะเตือนว่าช่อง TOOLS ไม่ถูกส่งให้ engine นั้น และโมเดล `claude-*` จะถูกข้าม |
| **`scripts/upstream-diff.js`** | เทียบกับต้นทางแล้วบอกว่าไฟล์ไหน *หยิบมาได้เลย* / *ต้องอ่านก่อน* — ดูหัวข้อ [ตามอัปเดตต้นทาง](#-ตามอัปเดตจากต้นทาง) |

## 🆕 ของใหม่ที่ได้มาจาก upstream 1.0.4

- 📦 **Execution backend** — สั่งให้ agent (สาย claude) ไปรันใน docker หรืออีกเครื่องผ่าน ssh ได้
- 👻 **Ghost worktree** — sub-agent ที่ทำงานขนานกันเลิกเขียนทับกันเอง (เปิดด้วย `reg.ghostWorktrees`)
- 🔎 **ค้นความจำด้วยความหมาย** — embedding + RRF fusion คู่กับ BM25 เดิม (opt-in, ล้มแล้วถอยกลับไปค้นด้วยคำ)
- 🎨 **Media Studio** ที่ `/studio` — แก้ภาพได้ ไม่ใช่แค่สร้าง
- 📚 **สกิลแก้ตัวเอง** — งานที่ *ล้ม* ก็ถูกนำมาปรับสกิลเดิม ไม่ใช่กองสกิลใหม่ทับไปเรื่อยๆ
- 🧰 **Tools Hub** ดึง catalog สดจากเว็บ — ปุ่มที่เคยตายเพราะแพ็กเกจ npm ถูกเลิกใช้ ถูกแก้ได้โดยไม่ต้องรอ release
- 🛠 **`bagidea doctor`** — บอกว่าทำไมออฟฟิศไม่ขึ้น (พอร์ต / proxy / firewall)

> การพอร์ตทำแบบ three-way merge บนฐานที่ค้นหาเจอ ไม่ใช่ยกไฟล์มาทับ — Local CLI จึงอยู่ครบทั้ง 17 จุดเรียก
> ส่วนที่ยังไม่ได้คือ shell ฝั่ง Rust (หน้าต่างโปร่งแสง/มุมโค้ง) ซึ่ง**ไม่กระทบ** เพราะโหมดนี้รันเป็นเว็บล้วน

## 🛠️ วิธีการติดตั้งและเริ่มใช้งาน (Getting Started)

### 1. ความต้องการของระบบ (Prerequisites)
- **Node.js**: เวอร์ชัน 18 ขึ้นไป
- **Web Browser**: Chrome, Edge, หรือ Brave
- *(อุปกรณ์เสริม)* ติดตั้ง CLI เอนจินที่ต้องการใช้งานบนเครื่อง (เช่น `codex`, `agy`, `grok`)

### 2. ดาวน์โหลดโปรเจกต์ (Clone Repository)
```bash
git clone https://github.com/piyadela/bagidea-office-local.git
cd bagidea-office-local
```

### 3. วิธีเริ่มการทำงาน (Start Office)

#### **วิธีที่ 1: ดับเบิ้ลคลิกสคริปต์บน Windows (แนะนำ)**
- ดับเบิ้ลคลิกไฟล์ **`start-office.bat`** (หรือ `run-office.bat`)
- ระบบจะเริ่มเปิด Daemon Server บนพอร์ต `http://127.0.0.1:8787` และเปิดหน้าต่างเบราว์เซอร์ให้อัตโนมัติ

#### **วิธีที่ 2: รันผ่าน Terminal / Command Line**
```bash
node daemon/server.js
```
จากนั้นเปิดเบราว์เซอร์ไปที่ `http://127.0.0.1:8787`

---

## ⚙️ วิธีตั้งค่าเลือกใช้ Local CLI ให้กับ AI Agent

1. เปิดหน้าจอ **BagIdea Office** บนเบราว์เซอร์
2. ไปที่เมนู **Settings ⚙️ ➔ แถบ AGENTS**
3. เลือก Agent ที่ต้องการ (เช่น `Shino`, `Codex`, `Kwin`) แล้วกด **✏ Edit Agent**
4. ในช่อง **💻 LOCAL CLI ENGINE — รันผ่าน CLI บนเครื่อง** เลือกเอนจินที่ต้องการ:
   - `(ดีฟอลต์ — รันผ่าน Claude / API)`
   - `Claude CLI (claude)`
   - `Codex CLI (codex)`
   - `Grok CLI (grok)`
   - `Antigravity CLI (agy)`
5. กด **💾 Save Agent**

---

## 🛑 วิธีปิดการทำงาน (Stop Office)
- ดับเบิ้ลคลิกไฟล์ **`stop-office.bat`** เพื่อปิดกระบวนการทำงานของ Daemon Server อย่างสะอาด

---

## 🔄 ตามอัปเดตจากต้นทาง

fork นี้ไม่มีประวัติร่วมกับต้นทาง (คนละ root commit) และมีโค้ด Local CLI ที่ต้นทางไม่มี —
`git pull` จากต้นทางจึง merge ไม่ได้ และปุ่ม update ในแอปก็ดึงอะไรมาไม่ได้ ใช้สคริปต์นี้แทน:

```bash
node scripts/upstream-diff.js              # สรุปว่าอะไรหยิบมาได้บ้าง
node scripts/upstream-diff.js <ไฟล์>       # ดู patch ของไฟล์นั้น
```

มันตั้ง remote `upstream` ให้เอง ดึงแบบ blobless (ไม่กินดิสก์) แล้วแยกไฟล์เป็น 3 กอง
โดยเทียบ hash ไฟล์ในเครื่องกับ blob ของ**ทุก commit ต้นทาง** — ไฟล์ที่เราไม่เคยแก้จะถูกจัดเป็น
"หยิบมาได้เลย" แม้เวอร์ชันในเครื่องจะนำหน้าเลขใน `VERSION` ไปแล้วก็ตาม

```
✔ ตรงกับต้นทางแล้ว   ไม่ต้องทำอะไร
✅ หยิบมาได้เลย       git checkout upstream/main -- <ไฟล์>
⚠ ต้องอ่านก่อน       ไฟล์ที่เราแก้เอง — อ่าน patch แล้วเลือกหยิบเป็นส่วนๆ
```

## 📜 License
พัฒนาและปรับแต่งบนฐานรากของ **BagIdea Office** สิทธิ์การใช้งานเป็นไปตามข้อกำหนดต้นฉบับ
