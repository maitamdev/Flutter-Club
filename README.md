# FT-Club Hub

Hệ thống quản lý Câu lạc bộ Flutter - Khoa Kỹ Thuật Công Nghệ

## Tính năng

- 🔐 **Xác thực**: Đăng nhập bằng Email/Password hoặc Google
- 👥 **Quản lý thành viên**: Duyệt yêu cầu tham gia, phân quyền (Admin/Trainer/Member)
- 📅 **Quản lý buổi học**: Tạo, chỉnh sửa, xem chi tiết buổi học
- ✅ **Điểm danh QR động**: Mã QR thay đổi mỗi 30 giây, chống gian lận
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
# hoặc
pnpm install
```

### 2. Thiết lập Firebase

1. Tạo project mới tại [Firebase Console](https://console.firebase.google.com/)

2. Bật các services:
   - **Authentication**: Bật Email/Password và Google provider
   - **Firestore Database**: Tạo database ở chế độ production
   - **Storage**: Tạo bucket

3. Lấy Firebase config từ Project Settings > General > Your apps > Web app

4. Tạo file `.env.local` từ `.env.example`:

```bash
cp .env.example .env.local
```

5. Điền thông tin Firebase vào `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_TOKEN_SECRET=your_random_secret_key_here
```

### 3. Deploy Security Rules

Copy nội dung từ `firestore.rules` và `storage.rules` vào Firebase Console:
- Firestore Database > Rules
- Storage > Rules

### 4. Chạy development server

```bash
npm run dev
# hoặc
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Tạo Admin đầu tiên

1. Đăng nhập bằng Google hoặc Email
2. Điền form yêu cầu tham gia
3. Vào Firebase Console > Firestore > Collection `users`
4. Tìm document của user vừa tạo
5. Thêm/sửa các field:
   - `role`: `"admin"`
   - `status`: `"active"`

Hoặc tạo document mới trong collection `users` với cấu trúc:

```json
{
  "name": "Admin Name",
  "studentId": "ADMIN001",
  "email": "admin@example.com",
  "role": "admin",
  "status": "active",
  "createdAt": Timestamp
}
```

Document ID phải là UID của user từ Firebase Auth.

## Cấu trúc thư mục

```
ft-club-hub/
├── app/
│   ├── (auth)/           # Auth pages (login, request-access)
│   ├── (dashboard)/      # Protected pages
│   │   ├── sessions/     # Buổi học
│   │   ├── assignments/  # Bài tập
│   │   ├── quizzes/      # Quiz
│   │   ├── announcements/# Thông báo
│   │   ├── members/      # Quản lý thành viên (Admin)
│   │   └── access-requests/ # Duyệt yêu cầu (Admin)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── attendance/       # QR Scanner
│   ├── charts/           # Recharts components
│   └── providers/        # Context providers
├── lib/
│   ├── firebase/         # Firebase config & services
│   ├── hooks/            # Custom hooks (useAuth)
│   ├── utils/            # Utilities
│   └── validations/      # Zod schemas
├── types/                # TypeScript types
├── firestore.rules       # Firestore security rules
└── storage.rules         # Storage security rules
```

## Phân quyền

| Tính năng | Admin | Trainer | Member |
|-----------|-------|---------|--------|
| Xem dashboard | ✅ | ✅ | ✅ |
| Quản lý thành viên | ✅ | ❌ | ❌ |
| Duyệt yêu cầu tham gia | ✅ | ❌ | ❌ |
| Tạo/sửa buổi học | ✅ | ✅ | ❌ |
| Bắt đầu điểm danh | ✅ | ✅ | ❌ |
| Điểm danh | ✅ | ✅ | ✅ |
| Tạo/sửa bài tập | ✅ | ✅ | ❌ |
| Nộp bài tập | ❌ | ❌ | ✅ |
| Chấm điểm | ✅ | ✅ | ❌ |
| Tạo quiz | ✅ | ✅ | ❌ |
| Làm quiz | ❌ | ❌ | ✅ |
| Đăng thông báo | ✅ | ✅ | ❌ |

## Điểm danh QR động

Hệ thống điểm danh sử dụng QR code động để chống gian lận:

1. **Token xoay vòng**: Mã QR chứa token được tạo từ `HMAC(secret + seed + timeSlot)`, thay đổi mỗi 30 giây
2. **Time window**: Điểm danh chỉ mở trong khoảng thời gian giới hạn (mặc định 10 phút)
3. **Mã dự phòng**: Code 6 ký tự cho trường hợp không quét được QR
4. **Realtime**: Danh sách điểm danh cập nhật ngay lập tức

## Build Production

```bash
npm run build
npm start
```

## License

MIT
