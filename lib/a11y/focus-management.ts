// Focus management utilities
export function focusFirstElement(container: HTMLElement): void { const focusable = container.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); focusable[0]?.focus(); }
export function getFocusableElements(container: HTMLElement): HTMLElement[] { return Array.from(container.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')); }
export function restoreFocus(element: HTMLElement | null): void { element?.focus(); }
