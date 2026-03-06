// DOM utility functions
export function scrollToTop(smooth: boolean = true): void {
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
}
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
export function getScrollPercentage(): number {
  const h = document.documentElement
  const st = h.scrollTop || document.body.scrollTop
  const sh = h.scrollHeight - h.clientHeight
  return sh > 0 ? Math.round((st / sh) * 100) : 0
}
