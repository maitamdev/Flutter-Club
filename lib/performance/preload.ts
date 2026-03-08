// Resource preloading
export function preloadImage(src: string): Promise<void> { return new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(); img.onerror = reject; img.src = src; }); }
export function preloadImages(srcs: string[]): Promise<void[]> { return Promise.all(srcs.map(preloadImage)); }
export function prefetchUrl(url: string): void { if (typeof document === 'undefined') return; const link = document.createElement('link'); link.rel = 'prefetch'; link.href = url; document.head.appendChild(link); }
