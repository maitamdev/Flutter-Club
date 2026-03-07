export function slugify(text: string): string {
  return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '');
}
export function unslugify(slug: string): string { return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); }
export function isValidSlug(slug: string): boolean { return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug); }
