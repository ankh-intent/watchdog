export interface WatchdogOptions {
    aggregation?: number;
}
export interface UnitMatcher {
    pattern: string | RegExp;
    event: string;
}
export interface WatchItem {
    uid: number;
    matcher: UnitMatcher;
    detach(): boolean;
}
export declare class Watchdog {
    private uid;
    private options;
    private watches;
    private aggregator;
    constructor(options?: WatchdogOptions);
    debounce(delay: number): void;
    start(): void;
    protected handle(event: string, path: string, stats?: any): void;
    watch(matcher: UnitMatcher): WatchItem;
}
