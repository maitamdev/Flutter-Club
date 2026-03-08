// Strategy pattern
export interface Strategy<TInput, TOutput> { execute(input: TInput): TOutput; }
export class StrategyContext<TInput, TOutput> { private strategy: Strategy<TInput, TOutput>; constructor(strategy: Strategy<TInput, TOutput>) { this.strategy = strategy; } setStrategy(strategy: Strategy<TInput, TOutput>): void { this.strategy = strategy; } execute(input: TInput): TOutput { return this.strategy.execute(input); } }
