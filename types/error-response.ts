export interface ErrorResponse { code: string; message: string; details?: Record<string, string[]>; statusCode: number; timestamp: string; path?: string; }
export interface ValidationError { field: string; message: string; value?: unknown; }
export type ErrorCode = 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'VALIDATION' | 'RATE_LIMIT' | 'SERVER_ERROR';
