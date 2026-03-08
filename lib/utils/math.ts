// Math utilities
export function clamp(value: number, min: number, max: number): number { return Math.min(Math.max(value, min), max); }
export function lerp(start: number, end: number, t: number): number { return start + (end - start) * t; }
export function roundTo(value: number, decimals: number): number { return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals); }
export function percentage(value: number, total: number): number { if (total === 0) return 0; return roundTo((value / total) * 100, 2); }
export function sum(values: number[]): number { return values.reduce((a, b) => a + b, 0); }
export function average(values: number[]): number { if (values.length === 0) return 0; return sum(values) / values.length; }
