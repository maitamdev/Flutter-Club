// Formatting utilities
export function formatNumber(num: number): string { return new Intl.NumberFormat('vi-VN').format(num); }
export function formatCurrency(amount: number, currency: string = 'VND'): string { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(amount); }
export function formatPercent(value: number): string { return value.toFixed(1) + '%'; }
export function formatDuration(seconds: number): string { const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = seconds % 60; if (h > 0) return h + 'h ' + m + 'm'; if (m > 0) return m + 'm ' + s + 's'; return s + 's'; }
export function pluralize(count: number, singular: string, plural?: string): string { return count === 1 ? singular : (plural || singular + 's'); }
