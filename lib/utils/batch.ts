export async function batchProcess<T, R>(items: T[], batchSize: number, processor: (batch: T[]) => Promise<R[]>): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await processor(batch);
    results.push(...batchResults);
  }
  return results;
}
export async function parallelLimit<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = []; const executing: Promise<void>[] = [];
  for (const task of tasks) {
    const p = task().then(r => { results.push(r); });
    executing.push(p);
    if (executing.length >= limit) { await Promise.race(executing); executing.splice(executing.indexOf(p), 1); }
  }
  await Promise.all(executing); return results;
}
