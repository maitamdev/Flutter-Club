// DOM event helpers
export function preventDefault(e: Event): void { e.preventDefault(); }
export function stopPropagation(e: Event): void { e.stopPropagation(); }
export function onClickOutside(element: HTMLElement, callback: () => void): () => void {
  const handler = (e: MouseEvent) => { if (!element.contains(e.target as Node)) callback(); };
  document.addEventListener('mousedown', handler);
  return () => document.removeEventListener('mousedown', handler);
}