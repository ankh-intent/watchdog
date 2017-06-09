export interface WatchdogOptions {
    aggregation?: number;
}
export interface UnitMatcher {
    pattern: string | RegExp;
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
    constructor(options?: WatchdogOptions);
    debounce(delay: number): void;
    watch(matcher: UnitMatcher): WatchItem;
}
