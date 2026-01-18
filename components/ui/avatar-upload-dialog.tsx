'use client'

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, X, Check, AlertCircle, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AvatarUploadDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onUploadSuccess: (url: string) => void
    currentAvatarUrl?: string
    userId: string
}

export function AvatarUploadDialog({
    open,
    onOpenChange,
    onUploadSuccess,
    currentAvatarUrl,
    userId
}: AvatarUploadDialogProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (file: File) => {
        setError(null)
        setSuccess(false)

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            setError('Chỉ chấp nhận file JPG, PNG hoặc WebP')
            return
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
            setError('Kích thước file tối đa là 5MB')
            return
        }

        setSelectedFile(file)

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        setUploading(true)
        setError(null)

        try {
            // Upload to Cloudinary
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('userId', userId)

            const uploadResponse = await fetch('/api/upload-avatar', {
                method: 'POST',
                body: formData,
            })

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json()
                throw new Error(errorData.error || 'Upload failed')
            }

            const { url } = await uploadResponse.json()

            // Update user profile
            const updateResponse = await fetch('/api/update-profile-photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ photoURL: url, userId }),
            })

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json()
                throw new Error(errorData.error || 'Failed to update profile')
            }

            setSuccess(true)
            setTimeout(() => {
                onUploadSuccess(url)
                handleClose()
            }, 1500)

        } catch (err) {
            console.error('Upload error:', err)
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi upload')
        } finally {
            setUploading(false)
        }
    }

    const handleClose = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setError(null)
        setSuccess(false)
        setIsDragging(false)
        onOpenChange(false)
    }

    const handleRemoveFile = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Cập nhật ảnh đại diện</DialogTitle>
                    <DialogDescription>
                        Chọn ảnh từ máy tính của bạn. Kích thước tối đa 5MB.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* File Upload Area */}
                    {!selectedFile ? (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
                                isDragging
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                                    : "border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            )}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Upload className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold mb-1">
                                        {isDragging ? 'Thả file vào đây' : 'Kéo thả ảnh vào đây'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        hoặc click để chọn file
                                    </p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    JPG, PNG hoặc WebP (tối đa 5MB)
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleInputChange}
                                className="hidden"
                            />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Preview */}
                            <div className="relative">
                                <div className="aspect-square w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                    <img
                                        src={previewUrl || ''}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                    onClick={handleRemoveFile}
                                    disabled={uploading}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* File Info */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <ImageIcon className="h-5 w-5 text-blue-500" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Cập nhật ảnh đại diện thành công!
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={uploading}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading || success}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                        {uploading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Đang upload...
                            </>
                        ) : success ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Thành công
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
