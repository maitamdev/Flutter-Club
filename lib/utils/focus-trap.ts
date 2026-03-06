// Focus trap utility
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  return Array.from(container.querySelectorAll<HTMLElement>(selectors))
}
export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  const focusable = getFocusableElements(container)
  if (focusable.length === 0) return
  const first = focusable[0]; const last = focusable[focusable.length - 1]
  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
}
