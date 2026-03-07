interface CompressOptions { maxWidth?: number; maxHeight?: number; quality?: number; format?: 'jpeg' | 'png' | 'webp'; }
class ImageCompressionService {
  async compress(file: File, options: CompressOptions = {}): Promise<Blob> {
    const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = 'webp' } = options;
    return new Promise((resolve, reject) => {
      const img = new Image(); const url = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img; const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
        width *= ratio; height *= ratio;
        const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
        canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(blob => { URL.revokeObjectURL(url); blob ? resolve(blob) : reject(new Error('Compression failed')); }, `image/${format}`, quality);
      };
      img.onerror = () => reject(new Error('Invalid image')); img.src = url;
    });
  }
  getFileSizeReduction(original: number, compressed: number): string { return `${Math.round((1 - compressed / original) * 100)}% smaller`; }
}
export const imageCompression = new ImageCompressionService();
