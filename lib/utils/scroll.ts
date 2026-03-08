// Scroll utilities
export function scrollToTop(smooth: boolean = true): void { window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' }); }
export function scrollToElement(id: string, offset: number = 0): void { const el = document.getElementById(id); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - offset; window.scrollTo({ top, behavior: 'smooth' }); } }
export function lockScroll(): () => void { const scrollY = window.scrollY; document.body.style.position = 'fixed'; document.body.style.top = '-' + scrollY + 'px'; document.body.style.width = '100%'; return () => { document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = ''; window.scrollTo(0, scrollY); }; }
