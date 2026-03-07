export function arrayToCSV<T extends Record<string, unknown>>(data: T[], columns?: (keyof T)[]): string {
  if (!data.length) return '';
  const keys = columns || (Object.keys(data[0]) as (keyof T)[]);
  const header = keys.join(',');
  const rows = data.map(row => keys.map(k => { const v = String(row[k] ?? ''); return v.includes(',') ? `"${v}"` : v; }).join(','));
  return [header, ...rows].join('\n');
}
export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}
