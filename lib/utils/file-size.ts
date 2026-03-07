const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${UNITS[i]}`;
}
export function parseFileSize(str: string): number {
  const match = str.match(/^([\d.]+)\s*(B|KB|MB|GB|TB)$/i);
  if (!match) return 0;
  return parseFloat(match[1]) * Math.pow(1024, UNITS.indexOf(match[2].toUpperCase()));
}
export function isFileSizeValid(bytes: number, maxMB: number): boolean { return bytes <= maxMB * 1024 * 1024; }
