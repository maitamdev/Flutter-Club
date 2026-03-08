// Device detection
export function isMobile(): boolean { if (typeof window === 'undefined') return false; return window.innerWidth < 768; }
export function isTablet(): boolean { if (typeof window === 'undefined') return false; return window.innerWidth >= 768 && window.innerWidth < 1024; }
export function isDesktop(): boolean { if (typeof window === 'undefined') return false; return window.innerWidth >= 1024; }
export function isTouchDevice(): boolean { if (typeof window === 'undefined') return false; return 'ontouchstart' in window || navigator.maxTouchPoints > 0; }
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' { if (isMobile()) return 'mobile'; if (isTablet()) return 'tablet'; return 'desktop'; }
