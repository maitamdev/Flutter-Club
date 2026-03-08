// Skip link navigation
export const SKIP_LINK_TARGETS = { main: 'main-content', nav: 'main-navigation', search: 'search-form', footer: 'main-footer' } as const;
export function createSkipLink(target: string, label: string): { href: string; label: string } { return { href: '#' + target, label: 'Skip to ' + label }; }
export function getDefaultSkipLinks() { return [ createSkipLink(SKIP_LINK_TARGETS.main, 'main content'), createSkipLink(SKIP_LINK_TARGETS.nav, 'navigation'), createSkipLink(SKIP_LINK_TARGETS.search, 'search') ]; }
