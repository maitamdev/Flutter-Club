export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T & { cancel: () => void } {
  let timer: NodeJS.Timeout;
  const debounced = (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  debounced.cancel = () => clearTimeout(timer);
  return debounced as T & { cancel: () => void };
}
