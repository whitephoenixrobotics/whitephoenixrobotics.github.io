# Phoenix Flow — หน้าดาวน์โหลด

หน้าเว็บดาวน์โหลด Phoenix Flow (static site) โฮสต์บน GitHub Pages
👉 **https://whitephoenixrobotics.github.io**

มีให้เลือก 2 รุ่น:
- **CPU only** — ใช้ได้ทุกเครื่อง Windows 10/11
- **CPU + CUDA** — เร่งด้วยการ์ดจอ NVIDIA

ลิงก์ดาวน์โหลดดึง release ล่าสุดจาก
[`whitephoenixrobotics/PhoenixFlow-Releases`](https://github.com/whitephoenixrobotics/PhoenixFlow-Releases/releases/latest)
ผ่าน GitHub API อัตโนมัติ — ออก release ใหม่แล้วหน้าเว็บอัปเดตเอง ไม่ต้องแก้โค้ด

## ไฟล์
- `index.html` — โครงหน้า
- `styles.css` — สไตล์ (ธีมฟ้าตามแบรนด์)
- `app.js` — ดึง release ล่าสุด + เติมลิงก์/ขนาดไฟล์
- `assets/` — โลโก้ White Phoenix

## รันดูในเครื่อง
```
python -m http.server 4178
```
แล้วเปิด http://localhost:4178
