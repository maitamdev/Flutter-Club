# Firebase Security Rules Guide

## Nguyen tac phan quyen
1. **Admin**: Co quyen toan bo
2. **Trainer**: Co the tao buoi hoc, bai tap, quiz, thong bao
3. **Member**: Chi xem va thuc hien (diem danh, nop bai, lam quiz)

## Cau truc rules
- isAuthenticated(): Kiem tra dang nhap
- isAdmin(): Kiem tra quyen admin
- isTrainer(): Kiem tra quyen admin hoac trainer
- isMember(): Kiem tra thanh vien hoat dong
- isOwner(uid): Kiem tra chu so huu tai lieu

## Luu y bao mat
- Khong bao gio cho phep client tu chinh quyen
- Luon xac thuc server-side cho thao tac nhay cam
- Su dung serverTimestamp() thay vi client timestamp
