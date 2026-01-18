import { NextRequest, NextResponse } from 'next/server'

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export async function POST(req: NextRequest) {
    try {
        // Get the file from form data
        const formData = await req.formData()
        const file = formData.get('file') as File
        const userId = formData.get('userId') as string

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
                { status: 400 }
            )
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            )
        }

        // Upload to Cloudinary
        const uploadFormData = new FormData()
        uploadFormData.append('file', file)
        uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET || '')
        uploadFormData.append('folder', 'ft-club-hub/avatars')

        const cloudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: uploadFormData,
            }
        )

        if (!cloudinaryResponse.ok) {
            const error = await cloudinaryResponse.text()
            console.error('Cloudinary upload error:', error)
            return NextResponse.json(
                { error: 'Failed to upload image' },
                { status: 500 }
            )
        }

        const data = await cloudinaryResponse.json()

        return NextResponse.json({
            success: true,
            url: data.secure_url,
            publicId: data.public_id
        })

    } catch (error) {
        console.error('Upload avatar error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
