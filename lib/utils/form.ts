// Form utilities
export function getFormData(form: HTMLFormElement): Record<string, string> { const data: Record<string, string> = {}; const formData = new FormData(form); formData.forEach((value, key) => { data[key] = value.toString(); }); return data; }
export function resetForm(form: HTMLFormElement): void { form.reset(); }
export function focusFirstError(form: HTMLFormElement): void { const invalid = form.querySelector<HTMLElement>('[aria-invalid="true"], .error, :invalid'); invalid?.focus(); }
export function isFormDirty(original: Record<string, unknown>, current: Record<string, unknown>): boolean { return JSON.stringify(original) !== JSON.stringify(current); }
