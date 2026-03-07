export const KEYBOARD_SHORTCUTS = {
  GLOBAL: { SEARCH: { key: 'k', meta: true, description: 'TÃ¬m kiáº¿m' }, THEME: { key: 't', meta: true, shift: true, description: 'Chuyá»ƒn theme' },
    HOME: { key: 'h', meta: true, description: 'Vá» trang chá»§' }, HELP: { key: '?', description: 'Má»Ÿ trá»£ giÃºp' } },
  NAVIGATION: { DASHBOARD: { key: '1', alt: true, description: 'Dashboard' }, SESSIONS: { key: '2', alt: true, description: 'Buá»•i há»c' },
    MEMBERS: { key: '3', alt: true, description: 'ThÃ nh viÃªn' }, ASSIGNMENTS: { key: '4', alt: true, description: 'BÃ i táº­p' } },
  EDITOR: { SAVE: { key: 's', meta: true, description: 'LÆ°u' }, UNDO: { key: 'z', meta: true, description: 'HoÃ n tÃ¡c' },
    REDO: { key: 'z', meta: true, shift: true, description: 'LÃ m láº¡i' }, BOLD: { key: 'b', meta: true, description: 'In Ä‘áº­m' } },
} as const;
