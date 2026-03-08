// Text sizing utilities for accessibility
export function getPreferredFontSize(): number { if (typeof window === 'undefined') return 16; const html = document.documentElement; const computed = getComputedStyle(html).fontSize; return parseFloat(computed) || 16; }
export function scaleFontSize(baseSize: number, scale: number): string { return (baseSize * scale) + 'px'; }
export function isLargeText(fontSize: number, isBold: boolean): boolean { return isBold ? fontSize >= 18.66 : fontSize >= 24; }
