// Enum utilities
export function getEnumValues<T extends Record<string, string | number>>(enumObj: T): T[keyof T][] { return Object.values(enumObj).filter(v => typeof v !== 'number') as T[keyof T][]; }
export function getEnumKeys<T extends Record<string, string | number>>(enumObj: T): (keyof T)[] { return Object.keys(enumObj).filter(k => isNaN(Number(k))) as (keyof T)[]; }
export function isEnumValue<T extends Record<string, string | number>>(enumObj: T, value: unknown): value is T[keyof T] { return Object.values(enumObj).includes(value as T[keyof T]); }
