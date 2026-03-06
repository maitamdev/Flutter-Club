'use client'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface FileDropzoneProps { onFileDrop: (files: File[]) => void; accept?: string; multiple?: boolean; maxSize?: number; className?: string }

export function FileDropzone({ onFileDrop, accept, multiple = false, maxSize, className }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFileDrop(multiple ? files : files.slice(0, 1))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onFileDrop(Array.from(e.target.files))
  }
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn('border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors', isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50', className)}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="hidden" />
      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
      <p className="text-sm font-medium">Keo tha file vao day hoac click de chon</p>
      {maxSize && <p className="text-xs text-muted-foreground mt-1">Kich thuoc toi da: {(maxSize / 1024 / 1024).toFixed(0)}MB</p>}
    </div>
  )
}
