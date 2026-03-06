// Platform detection
export function isBrowser(): boolean { return typeof window !== 'undefined' }
export function isServer(): boolean { return typeof window === 'undefined' }
export function isMobileDevice(): boolean {
  if (!isBrowser()) return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
export function isIOS(): boolean {
  if (!isBrowser()) return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
export function isAndroid(): boolean {
  if (!isBrowser()) return false
  return /Android/i.test(navigator.userAgent)
}
export function isTouchDevice(): boolean {
  if (!isBrowser()) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
