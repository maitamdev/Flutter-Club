interface RetryOptions { maxAttempts?: number; baseDelay?: number; maxDelay?: number; onRetry?: (error: Error, attempt: number) => void; }
export async function retryWithBackoff<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { maxAttempts = 3, baseDelay = 1000, maxDelay = 10000, onRetry } = options;
  let lastError: Error;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try { return await fn(); }
    catch (err) { lastError = err as Error; if (attempt === maxAttempts) throw lastError;
      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      onRetry?.(lastError, attempt); await new Promise(r => setTimeout(r, delay));
    }
  }
  throw lastError!;
}
