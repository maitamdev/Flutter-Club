interface FeatureFlag { enabled: boolean; rolloutPercentage?: number; allowedRoles?: string[]; description?: string; }
const FLAGS: Record<string, FeatureFlag> = {
  'dark-mode': { enabled: true, description: 'Dark mode toggle' },
  'ai-assistant': { enabled: true, allowedRoles: ['admin', 'trainer'], description: 'AI chat assistant' },
  'export-pdf': { enabled: false, rolloutPercentage: 50, description: 'PDF export feature' },
  'real-time-chat': { enabled: false, description: 'Real-time messaging' },
  'advanced-analytics': { enabled: true, allowedRoles: ['admin'], description: 'Advanced analytics dashboard' },
};
export function isFeatureEnabled(flag: string, userRole?: string): boolean {
  const f = FLAGS[flag]; if (!f || !f.enabled) return false;
  if (f.allowedRoles && userRole && !f.allowedRoles.includes(userRole)) return false;
  if (f.rolloutPercentage !== undefined) return Math.random() * 100 < f.rolloutPercentage;
  return true;
}
export function getAllFlags(): Record<string, FeatureFlag> { return { ...FLAGS }; }
