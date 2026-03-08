// HTTP status codes
export const HTTP_STATUS = { OK: 200, CREATED: 201, NO_CONTENT: 204, BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404, CONFLICT: 409, UNPROCESSABLE: 422, TOO_MANY_REQUESTS: 429, INTERNAL_ERROR: 500, BAD_GATEWAY: 502, SERVICE_UNAVAILABLE: 503, } as const;
export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
export function isSuccess(status: number): boolean { return status >= 200 && status < 300; }
export function isClientError(status: number): boolean { return status >= 400 && status < 500; }
export function isServerError(status: number): boolean { return status >= 500; }
