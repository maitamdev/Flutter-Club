const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export function formatVND(amount: number): string { return VND.format(amount); }
export function formatUSD(amount: number): string { return USD.format(amount); }
export function parseCurrency(str: string): number { return Number(str.replace(/[^\d.-]/g, '')); }
export function convertVNDtoUSD(vnd: number, rate = 24500): number { return Math.round((vnd / rate) * 100) / 100; }
