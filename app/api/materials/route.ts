import { NextRequest, NextResponse } from 'next/server'
import { uploadMaterial } from '@/lib/firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const uploadedBy = formData.get('uploadedBy') as string

    if (!file || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const materialId = await uploadMaterial({
      file,
      title,
      category,
      fileName: file.name,
      fileSize: file.size,
      uploadedBy,
    })

    return NextResponse.json({ id: materialId }, { status: 201 })
  } catch (error: any) {
    console.error('Material upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
