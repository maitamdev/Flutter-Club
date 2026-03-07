export interface SearchResult<T = unknown> { items: T[]; total: number; page: number; pageSize: number; query: string; filters: Record<string, string>; took: number; }
export interface SearchSuggestion { text: string; type: 'member' | 'session' | 'material' | 'assignment'; id: string; }
