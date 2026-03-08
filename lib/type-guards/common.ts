// Common type guards
export function isString(value: unknown): value is string { return typeof value === 'string'; }
export function isNumber(value: unknown): value is number { return typeof value === 'number' && !isNaN(value); }
export function isBoolean(value: unknown): value is boolean { return typeof value === 'boolean'; }
export function isArray<T>(value: unknown): value is T[] { return Array.isArray(value); }
export function isNonNullObject(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value); }
export function isDefined<T>(value: T | undefined | null): value is T { return value !== undefined && value !== null; }
export function isNonEmptyString(value: unknown): value is string { return typeof value === 'string' && value.trim().length > 0; }
