interface UploadProgress { loaded: number; total: number; percentage: number; }
interface UploadResult { url: string; publicId: string; format: string; size: number; }
class FileUploadService {
  private maxSize = 10 * 1024 * 1024;
  private allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  validate(file: File): string | null { if (file.size > this.maxSize) return 'File quÃ¡ lá»›n (max 10MB)'; if (!this.allowedTypes.includes(file.type)) return 'Äá»‹nh dáº¡ng khÃ´ng há»— trá»£'; return null; }
  async upload(file: File, onProgress?: (p: UploadProgress) => void): Promise<UploadResult> {
    const error = this.validate(file); if (error) throw new Error(error);
    const formData = new FormData(); formData.append('file', file);
    const res = await fetch('/api/upload-avatar', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  }
}
export const fileUploadService = new FileUploadService();
