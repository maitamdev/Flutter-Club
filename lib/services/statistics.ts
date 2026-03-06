// Statistics calculation helpers
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}
export function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0
  const mean = values.reduce((s, v) => s + v, 0) / values.length
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2))
  return Math.sqrt(squaredDiffs.reduce((s, v) => s + v, 0) / values.length)
}
export function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b)
  const index = (percentile / 100) * (sorted.length - 1)
  const lower = Math.floor(index); const upper = Math.ceil(index)
  if (lower === upper) return sorted[lower]
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower)
}
export function calculateMode(values: number[]): number | undefined {
  if (values.length === 0) return undefined
  const freq = new Map<number, number>()
  values.forEach(v => freq.set(v, (freq.get(v) || 0) + 1))
  let maxFreq = 0; let mode = values[0]
  freq.forEach((f, v) => { if (f > maxFreq) { maxFreq = f; mode = v } })
  return mode
}
