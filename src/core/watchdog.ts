
export interface WatchdogOptions {

}

export interface WatchMatcher {
	pattern: string|RegExp;

}

export interface WatchItem {
	uid: number;
	matcher: WatchMatcher;

	detach(): boolean;
}

export class Watchdog {
	private uid: number = 0;
	private options: WatchdogOptions;
	private watches: {[index: number]: WatchItem};

	public constructor(options: WatchdogOptions = {}) {
		this.options = options;
	}

	public watch(matcher: WatchMatcher): WatchItem {
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
