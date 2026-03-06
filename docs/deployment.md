# Huong dan deploy

## Deploy len Vercel
1. Push code len GitHub
2. Ket noi repository voi Vercel
3. Cau hinh Environment Variables
4. Deploy

## Environment Variables can thiet
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_TOKEN_SECRET
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

## Deploy Firebase Rules
firebase deploy --only firestore:rules
firebase deploy --only storage
