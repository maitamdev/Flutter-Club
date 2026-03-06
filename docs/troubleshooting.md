# Troubleshooting Guide

## Loi thuong gap

### npm install that bai
- Xoa node_modules va package-lock.json
- Chay lai npm install
- Neu van loi, thu npm install --legacy-peer-deps

### Firebase permission denied
- Kiem tra Firebase Security Rules
- Kiem tra tai khoan co role phu hop
- Kiem tra .env.local co dung thong tin

### Build loi
- Xoa .next/
- Chay npm run build lai
- Kiem tra TypeScript errors

### QR diem danh khong hoat dong
- Kiem tra camera permissions trong browser
- Thu dung HTTPS (khong dung HTTP)
- Kiem tra QR code con hieu luc (10 giay)

### Dark mode loi
- Xoa localStorage
- Chon lai theme

### Anh khong hien thi
- Kiem tra Cloudinary config
- Kiem tra next.config.js remotePatterns
