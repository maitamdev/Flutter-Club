// Responsive breakpoints
export const BREAKPOINTS = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 } as const;
export type Breakpoint = keyof typeof BREAKPOINTS;
export const MEDIA_QUERIES: Record<Breakpoint, string> = { xs: '(min-width: 0px)', sm: '(min-width: 640px)', md: '(min-width: 768px)', lg: '(min-width: 1024px)', xl: '(min-width: 1280px)', '2xl': '(min-width: 1536px)' };
