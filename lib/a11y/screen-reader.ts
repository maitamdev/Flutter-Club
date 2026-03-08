// Screen reader utilities
export function srOnly(text: string): string { return text; }
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void { const el = document.createElement('div'); el.setAttribute('role', 'status'); el.setAttribute('aria-live', priority); el.className = 'sr-only'; el.textContent = message; document.body.appendChild(el); setTimeout(() => el.remove(), 1000); }
export function getAriaLabel(element: HTMLElement): string | null { return element.getAttribute('aria-label') || element.getAttribute('aria-labelledby'); }
