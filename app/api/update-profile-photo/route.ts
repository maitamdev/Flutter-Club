import { NextRequest, NextResponse } from 'next/server'
import { updateUser } from '@/lib/firebase/firestore'

export async function POST(req: NextRequest) {
    try {
        const { photoURL, userId } = await req.json()

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        if (!photoURL || typeof photoURL !== 'string') {
            return NextResponse.json(
                { error: 'Invalid photo URL' },
                { status: 400 }
            )
        }

        // Validate URL format
        try {
            new URL(photoURL)
        } catch {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            )
        }

        // Update user profile in Firestore
        await updateUser(userId, { photoURL })

        return NextResponse.json({
            success: true,
            message: 'Profile photo updated successfully'
        })

    } catch (error) {
        console.error('Update profile photo error:', error)
        return NextResponse.json(
            { error: 'Failed to update profile photo' },
            { status: 500 }
        )
    }
}
