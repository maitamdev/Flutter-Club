// Common component prop types
import { ReactNode } from 'react';
export interface BaseProps { className?: string; id?: string; }
export interface WithChildren extends BaseProps { children: ReactNode; }
export interface WithIcon extends BaseProps { icon?: ReactNode; iconPosition?: 'left' | 'right'; }
export interface Loadable { loading?: boolean; error?: string | null; }
export interface Selectable { selected?: boolean; onSelect?: (selected: boolean) => void; }
export interface Sortable { sortKey?: string; sortDirection?: 'asc' | 'desc'; onSort?: (key: string) => void; }
export interface Pageable { page: number; pageSize: number; total: number; onPageChange: (page: number) => void; }
