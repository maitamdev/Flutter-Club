// Bundle analysis helpers
export function estimateModuleSize(code: string): number { return new Blob([code]).size; }
export function formatBytes(bytes: number): string { if (bytes === 0) return '0 B'; const k = 1024; const sizes = ['B', 'KB', 'MB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; }
export function shouldCodeSplit(moduleSize: number, threshold: number = 50000): boolean { return moduleSize > threshold; }
