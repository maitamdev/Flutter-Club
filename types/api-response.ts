// Standardized API response types
export interface ApiResponse<T = unknown> { success: boolean; data?: T; error?: ApiError; meta?: ResponseMeta; }
export interface ApiError { code: string; message: string; details?: Record<string, string[]>; }
export interface ResponseMeta { page: number; limit: number; total: number; totalPages: number; }
export type PaginatedResponse<T> = ApiResponse<T[]> & { meta: ResponseMeta; };
export interface ApiSuccessResponse<T> extends ApiResponse<T> { success: true; data: T; }
export interface ApiErrorResponse extends ApiResponse { success: false; error: ApiError; }
