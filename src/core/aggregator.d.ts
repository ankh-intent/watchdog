export declare type AggregationHandler<A extends Aggregatable> = (aggregated: A[]) => any;
export declare class Aggregator<A extends Aggregatable> {
    private start;
    private aggregated;
    private watch;
    delay: number;
    constructor(handler: AggregationHandler<A>, delay?: number);
    stop(): void;
    debounce(): DebounceDescriptorInterface<A>;
    aggregate(item: A): number;
    protected submit(callback: AggregationHandler<A>): void;
}
export interface Aggregatable {
}
export interface DebounceDescriptorInterface<A extends Aggregatable> {
    and(handler: AggregationHandler<A>): number;
    once(handler: AggregationHandler<A>): number;
    off(uid?: number): void;
}
