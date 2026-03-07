export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const masked = local.length <= 2 ? '*'.repeat(local.length) : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return `${masked}@${domain}`;
}
export function isDisposableEmail(email: string): boolean {
  const disposable = ['tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com', 'yopmail.com'];
  return disposable.some(d => email.endsWith(d));
}
