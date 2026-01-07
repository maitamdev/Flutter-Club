# WebOOM DHV TEC

Hệ thống quản lý Câu lạc bộ Web - Khoa Kỹ Thuật Công Nghệ, Đại học Hùng Vương TPHCM

## Tính năng

- 🔐 **Xác thực**: Đăng nhập bằng Email/Password hoặc Google
- 👥 **Quản lý thành viên**: Duyệt yêu cầu tham gia, phân quyền (Admin/Trainer/Member)
- 📅 **Quản lý buổi học**: Tạo, chỉnh sửa, xem chi tiết buổi học
- ✅ **Điểm danh QR động**: Mã QR thay đổi mỗi 10 giây, chống gian lận
- 📝 **Bài tập**: Giao bài, nộp bài, chấm điểm với rubric
- ❓ **Quiz**: Tạo quiz MCQ, làm bài, chấm tự động
- 📢 **Thông báo**: Đăng và xem thông báo realtime
- 🌙 **Dark mode**: Hỗ trợ giao diện sáng/tối

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation

## Cài đặt

### 1. Clone và cài dependencies

```bash
cd ft-club-hub
npm install
```

### 2. Thiết lập Firebase

1. Tạo project mới tại [Firebase Console](https://console.firebase.google.com/)

2. Bật các services:
   - **Authentication**: Bật Email/Password và Google provider
   - **Firestore Database**: Tạo database ở chế độ production
   - **Storage**: Tạo bucket

3. Tạo file `.env.local` từ `.env.example` và điền thông tin Firebase

### 3. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

### 4. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Tạo Admin đầu tiên

Chạy script:

```bash
npx tsx scripts/seed-admin.ts
```

Tài khoản mặc định:
- Email: `admin@ftclub.com`
- Password: `Admin@123456`

## Phân quyền

| Tính năng | Admin | Trainer | Member |
|-----------|-------|---------|--------|
| Quản lý thành viên | ✅ | ❌ | ❌ |
| Duyệt yêu cầu tham gia | ✅ | ❌ | ❌ |
| Tạo/sửa buổi học | ✅ | ✅ | ❌ |
| Điểm danh | ✅ | ✅ | ✅ |
| Tạo/sửa bài tập | ✅ | ✅ | ❌ |
| Nộp bài tập | ❌ | ❌ | ✅ |
| Tạo quiz | ✅ | ✅ | ❌ |
| Làm quiz | ❌ | ❌ | ✅ |
| Đăng thông báo | ✅ | ✅ | ❌ |

## Điểm danh QR động

Hệ thống điểm danh sử dụng QR code động để chống gian lận:
- Mã QR và mã dự phòng thay đổi mỗi 10 giây
- Điểm danh chỉ mở trong khoảng thời gian giới hạn
- Danh sách điểm danh cập nhật realtime

## Deploy lên Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm Environment Variables từ `.env.local`
4. Deploy

## License

MIT
