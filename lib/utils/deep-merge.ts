type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]; };
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: DeepPartial<T>[]): T {
  const result = { ...target };
  for (const source of sources) {
    for (const key in source) {
      const sv = source[key]; const tv = result[key];
      if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {
        (result as any)[key] = deepMerge(tv, sv as any);
      } else { (result as any)[key] = sv; }
    }
  }
  return result;
}
