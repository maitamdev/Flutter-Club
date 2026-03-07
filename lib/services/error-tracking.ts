interface ErrorEntry { message: string; stack?: string; componentName?: string; userId?: string; url: string; timestamp: Date; severity: 'low' | 'medium' | 'high' | 'critical'; }
class ErrorTrackingService {
  private errors: ErrorEntry[] = [];
  captureError(error: Error, context?: Partial<ErrorEntry>): void {
    const entry: ErrorEntry = { message: error.message, stack: error.stack, url: typeof window !== 'undefined' ? window.location.href : '', timestamp: new Date(), severity: 'medium', ...context };
    this.errors.push(entry); console.error('[ErrorTracking]', entry.message);
  }
  captureMessage(message: string, severity: ErrorEntry['severity'] = 'low'): void { this.captureError(new Error(message), { severity }); }
  getErrors(severity?: ErrorEntry['severity']): ErrorEntry[] { return severity ? this.errors.filter(e => e.severity === severity) : this.errors; }
  clearErrors(): void { this.errors = []; }
}
export const errorTracking = new ErrorTrackingService();
