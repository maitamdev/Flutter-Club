/**
 * Script tạo tài khoản Admin đầu tiên
 * Chạy: npx ts-node scripts/seed-admin.ts
 * Hoặc: npx tsx scripts/seed-admin.ts
 */

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

// Firebase config - lấy từ .env.local
const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "flutterclub-26ccb.firebaseapp.com",
  projectId: "flutterclub-26ccb",
  storageBucket: "flutterclub-26ccb.firebasestorage.app",
  messagingSenderId: "69373921672",
  appId: "1:69373921672:web:41f2a51582a999adf2123d"
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
    // Thử tạo user mới
    let uid: string

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
      uid = userCredential.user.uid
      console.log('✅ Đã tạo tài khoản Firebase Auth')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        // User đã tồn tại, đăng nhập để lấy uid
        console.log('⚠️  Email đã tồn tại, đang cập nhật role...')
        const userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
        uid = userCredential.user.uid
      } else {
        throw error
      }
    }

    // Tạo/cập nhật document trong Firestore
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
