// Form state types
export interface FormState<T> { values: T; errors: Partial<Record<keyof T, string>>; touched: Partial<Record<keyof T, boolean>>; isSubmitting: boolean; isValid: boolean; isDirty: boolean; }
export type FormAction<T> = | { type: 'SET_VALUE'; field: keyof T; value: T[keyof T] } | { type: 'SET_ERROR'; field: keyof T; error: string } | { type: 'SET_TOUCHED'; field: keyof T } | { type: 'SUBMIT_START' } | { type: 'SUBMIT_SUCCESS' } | { type: 'SUBMIT_ERROR' } | { type: 'RESET'; initialValues: T };
