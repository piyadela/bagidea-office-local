# 🏢 BagIdea Office (Local CLI Edition)

**BagIdea Office** คือระบบบริหารจัดการทีม AI Agents ทำงานร่วมกันแบบ Multi-Agent Office โดยเวอร์ชันนี้ได้รับการปรับแต่งพิเศษเพื่อรองรับการรันผ่าน **Local CLI Engines** บนเครื่องคอมพิวเตอร์โดยตรง (ไม่ต้องพึ่งพา API Direct ภายนอกเพียงอย่างเดียว)

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

## 📜 License
พัฒนาและปรับแต่งบนฐานรากของ **BagIdea Office** สิทธิ์การใช้งานเป็นไปตามข้อกำหนดต้นฉบับ
