// Keyboard shortcut definitions
export interface KeyboardShortcutDef {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  description: string
  action: string
}
export const APP_SHORTCUTS: KeyboardShortcutDef[] = [
  { key: 'k', ctrl: true, description: 'Tim kiem', action: 'search' },
  { key: 'n', ctrl: true, description: 'Tao moi', action: 'create' },
  { key: '/', description: 'Focus tim kiem', action: 'focus-search' },
  { key: 'Escape', description: 'Dong dialog', action: 'close' },
  { key: '1', alt: true, description: 'Buoi hoc', action: 'nav-sessions' },
  { key: '2', alt: true, description: 'Bai tap', action: 'nav-assignments' },
  { key: '3', alt: true, description: 'Quiz', action: 'nav-quizzes' },
]
