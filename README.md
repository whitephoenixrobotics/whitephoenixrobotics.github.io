# PhoenixNest — หน้าดาวน์โหลด

หน้าเว็บดาวน์โหลด PhoenixNest (static site) โฮสต์บน GitHub Pages
👉 **https://whitephoenixrobotics.github.io**

PhoenixNest คือศูนย์รวมระบบนิเวศ Phoenix Nest — ล็อกอินครั้งเดียว เลือกติดตั้งโมดูล AI
ที่ต้องการ (AI Flow, PhoenixPy, …) แล้วเปิดใช้งานได้ในแอปเดียว

ลิงก์ดาวน์โหลดดึง release ล่าสุดจาก
[`whitephoenixrobotics/PhoenixNest`](https://github.com/whitephoenixrobotics/PhoenixNest/releases/latest)
ผ่าน GitHub API อัตโนมัติ — ออก release ใหม่แล้วหน้าเว็บอัปเดตเอง ไม่ต้องแก้โค้ด

## ไฟล์
- `index.html` — โครงหน้า
- `styles.css` — สไตล์ (ธีมม่วง–ส้มตามแบรนด์ PhoenixNest)
- `app.js` — ดึง release ล่าสุด + เติมลิงก์/ขนาดไฟล์/เวอร์ชัน
- `assets/` — โลโก้ PhoenixNest

## รันดูในเครื่อง
```
python -m http.server 4178
```
แล้วเปิด http://localhost:4178
