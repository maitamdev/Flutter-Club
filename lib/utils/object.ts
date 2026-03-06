// Object utility functions
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => { if (key in obj) result[key] = obj[key] })
  return result
}
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete (result as any)[key])
  return result as Omit<T, K>
}
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
export function isEmpty(obj: unknown): boolean {
  if (obj == null) return true
  if (typeof obj === 'string' || Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}
export function mergeDeep<T extends object>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target }
  sources.forEach(source => {
    Object.keys(source || {}).forEach(key => {
      const val = (source as any)[key]
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        (result as any)[key] = mergeDeep((result as any)[key] || {}, val)
      } else { (result as any)[key] = val }
    })
  })
  return result
}
