// Toast and notification display types
export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'
export interface ToastConfig {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: { label: string; onClick: () => void }
}
export interface ConfirmConfig {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}
