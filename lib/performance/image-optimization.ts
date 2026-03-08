// Image optimization utilities
export function getOptimalImageSize(containerWidth: number, pixelRatio: number = 1): number { const sizes = [320, 640, 750, 828, 1080, 1200, 1920, 2048]; const target = containerWidth * pixelRatio; return sizes.find(s => s >= target) || sizes[sizes.length - 1]; }
export function generateSrcSet(baseUrl: string, widths: number[]): string { return widths.map(w => baseUrl + '?w=' + w + ' ' + w + 'w').join(', '); }
export function getImagePlaceholder(width: number, height: number): string { return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"><rect fill="#e2e8f0" width="100%" height="100%"/></svg>'); }
