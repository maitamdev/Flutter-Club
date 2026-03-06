import { cn } from '@/lib/utils'

interface FilePreviewProps {
  fileName: string
  fileSize?: number
  fileType?: string
  onRemove?: () => void
  className?: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const typeIcons: Record<string, string> = {
  pdf: 'ðŸ“„', doc: 'ðŸ“', docx: 'ðŸ“', xls: 'ðŸ“Š', xlsx: 'ðŸ“Š', ppt: 'ðŸ“Ž', pptx: 'ðŸ“Ž',
  zip: 'ðŸ“¦', rar: 'ðŸ“¦', jpg: 'ðŸ–¼ï¸', jpeg: 'ðŸ–¼ï¸', png: 'ðŸ–¼ï¸', gif: 'ðŸ–¼ï¸',
}

export function FilePreview({ fileName, fileSize, fileType, onRemove, className }: FilePreviewProps) {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  const icon = typeIcons[ext] || 'ðŸ“'
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-lg border bg-card', className)}>
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{fileName}</p>
        {fileSize && <p className="text-xs text-muted-foreground">{formatSize(fileSize)}</p>}
      </div>
      {onRemove && <button onClick={onRemove} className="text-muted-foreground hover:text-destructive"><span className="text-lg">Ã—</span></button>}
    </div>
  )
}
