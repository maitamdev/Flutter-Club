export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  const cloned = {} as T;
  for (const key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) (cloned as any)[key] = deepClone((obj as any)[key]); }
  return cloned;
}
