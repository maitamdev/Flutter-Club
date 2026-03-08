// Lazy component loading registry
import { lazy, ComponentType } from 'react';
export const LazyComponents = { Dashboard: lazy(() => import('@/app/(dashboard)/layout')), MemberProfile: lazy(() => import('@/components/ui/member-profile-card')), DataTable: lazy(() => import('@/components/ui/data-table')), Chart: lazy(() => import('@/components/charts/BarChart' as string).catch(() => ({ default: (() => null) as unknown as ComponentType }))), } as const;
export function preloadComponent(loader: () => Promise<unknown>): void { loader(); }
