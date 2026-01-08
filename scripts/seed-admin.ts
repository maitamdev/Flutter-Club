/**
 * Script tạo tài khoản Admin đầu tiên
 * 
 * Cách chạy:
 * 1. Tạo file .env trong thư mục scripts với nội dung:
 *    FIREBASE_API_KEY=your_api_key
 *    FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 *    FIREBASE_PROJECT_ID=your_project_id
 *    FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 *    FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 *    FIREBASE_APP_ID=your_app_id
 * 
 * 2. Chạy: npx tsx scripts/seed-admin.ts
 */

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Firebase config - lấy từ environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Lỗi: Thiếu Firebase config!')
  console.error('Vui lòng tạo file .env hoặc set environment variables')
  console.error('Xem hướng dẫn trong comment đầu file')
  process.exit(1)
}

// ============ CẤU HÌNH ADMIN ============
const ADMIN_EMAIL = 'admin@ftclub.com'
const ADMIN_PASSWORD = 'Admin@123456'
const ADMIN_NAME = 'Admin WebOOM'
const ADMIN_STUDENT_ID = 'ADMIN001'
// ========================================

async function seedAdmin() {
  console.log('🚀 Bắt đầu tạo tài khoản Admin...\n')

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  try {
    let uid: string

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
      uid = userCredential.user.uid
      console.log('✅ Đã tạo tài khoản Firebase Auth')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('⚠️  Email đã tồn tại, đang cập nhật role...')
        const userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
        uid = userCredential.user.uid
      } else {
        throw error
      }
    }

    await setDoc(doc(db, 'users', uid), {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      studentId: ADMIN_STUDENT_ID,
      role: 'admin',
      status: 'active',
      createdAt: serverTimestamp(),
    })

    console.log('✅ Đã tạo document trong Firestore')
    console.log('\n========================================')
    console.log('🎉 TẠO ADMIN THÀNH CÔNG!')
    console.log('========================================')
    console.log(`📧 Email:    ${ADMIN_EMAIL}`)
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`)
    console.log(`👤 Tên:      ${ADMIN_NAME}`)
    console.log(`🆔 MSSV:     ${ADMIN_STUDENT_ID}`)
    console.log('========================================\n')
    console.log('👉 Truy cập /admin/login để đăng nhập')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Lỗi:', error.message)
    process.exit(1)
  }
}

seedAdmin()
