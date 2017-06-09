
export interface WatchdogOptions {
	aggregation?: number;
}

export interface UnitMatcher {
	pattern: string|RegExp;

}

export interface WatchItem {
	uid: number;
	matcher: UnitMatcher;

	detach(): boolean;
}

export class Watchdog {
	private uid: number = 0;
	private options: WatchdogOptions;
	private watches: {[index: number]: WatchItem};

	public constructor(options: WatchdogOptions = {}) {
		this.watches = {};
		this.options = options;
	}

	public debounce(delay: number) {

	}

	public watch(matcher: UnitMatcher): WatchItem {
		let self = this;
		let item = <WatchItem>{
			uid: ++this.uid,
			matcher: matcher,
			detach(): boolean {
				return delete self.watches[this.uid];
			},
		};

		this.watches[item.uid] = item;

		return item;
	}
}
