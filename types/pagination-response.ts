export interface PaginatedResponse<T> { data: T[]; pagination: PaginationMeta; }
export interface PaginationMeta { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number; hasNextPage: boolean; hasPreviousPage: boolean; }
export interface CursorPagination<T> { data: T[]; cursor: string | null; hasMore: boolean; }
