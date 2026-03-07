'use client';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
interface FileUploadProps { onUpload?: (files: File[]) => void; accept?: string; multiple?: boolean; maxSize?: number; }
export function FileUpload({ onUpload, accept, multiple=false, maxSize=10485760 }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFiles = (files: FileList) => { const valid = Array.from(files).filter(f => f.size <= maxSize); onUpload?.(valid); };
  return (<div className={cn('border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors', dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400')}
    onDragOver={e => { e.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)}
    onDrop={e => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }} onClick={() => inputRef.current?.click()}>
    <input ref={inputRef} type='file' accept={accept} multiple={multiple} onChange={e => e.target.files && handleFiles(e.target.files)} className='hidden' />
    <p className='text-gray-500'>Drag and drop or click to select</p>
  </div>);
}
