// Pipe utility for function composition
export function pipe<T>(...fns: ((value: T) => T)[]): (value: T) => T { return (value: T) => fns.reduce((acc, fn) => fn(acc), value); }
export function pipeAsync<T>(...fns: ((value: T) => Promise<T>)[]): (value: T) => Promise<T> { return (value: T) => fns.reduce(async (acc, fn) => fn(await acc), Promise.resolve(value)); }
export function compose<T>(...fns: ((value: T) => T)[]): (value: T) => T { return pipe(...fns.reverse()); }
