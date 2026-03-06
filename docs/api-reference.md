# API Documentation

## Authentication
- POST /api/auth/login - Dang nhap
- POST /api/auth/register - Dang ky
- POST /api/auth/forgot-password - Quen mat khau

## Sessions
- GET /api/sessions - Lay danh sach buoi hoc
- POST /api/sessions - Tao buoi hoc moi
- PUT /api/sessions/:id - Cap nhat buoi hoc
- DELETE /api/sessions/:id - Xoa buoi hoc

## Assignments
- GET /api/assignments - Lay danh sach bai tap
- POST /api/assignments - Tao bai tap moi
- PUT /api/assignments/:id - Cap nhat bai tap
- DELETE /api/assignments/:id - Xoa bai tap

## Quizzes
- GET /api/quizzes - Lay danh sach quiz
- POST /api/quizzes - Tao quiz moi

## Members
- GET /api/members - Lay danh sach thanh vien
- PUT /api/members/:id - Cap nhat thong tin thanh vien
