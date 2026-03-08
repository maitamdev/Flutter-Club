// Keyboard utilities
export function isModifierKey(event: KeyboardEvent): boolean { return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey; }
export function getShortcutString(event: KeyboardEvent): string { const parts: string[] = []; if (event.ctrlKey || event.metaKey) parts.push('Ctrl'); if (event.altKey) parts.push('Alt'); if (event.shiftKey) parts.push('Shift'); parts.push(event.key.toUpperCase()); return parts.join('+'); }
export function matchShortcut(event: KeyboardEvent, shortcut: string): boolean { return getShortcutString(event) === shortcut; }
