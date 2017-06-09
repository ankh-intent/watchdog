export interface WatchdogOptions {
}
export interface WatchMatcher {
    pattern: string | RegExp;
}
export interface WatchItem {
    uid: number;
    matcher: WatchMatcher;
    detach(): boolean;
}
export declare class Watchdog {
    private uid;
    private options;
    private watches;
    constructor(options?: WatchdogOptions);
    watch(matcher: WatchMatcher): WatchItem;
}
