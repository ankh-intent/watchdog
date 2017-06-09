
import chokidar from 'chokidar';
import { Aggregator } from './aggregator';

export interface WatchdogOptions {
	aggregation?: number;
}

export interface UnitMatcher {
	pattern: string|RegExp;

	event: string;
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
	private aggregator: Aggregator<any>;

	public constructor(options: WatchdogOptions = {}) {
		this.watches = {};
		this.options = options;
	}

	public debounce(delay: number) {

	}

	public start() {
		for (let index in this.watches) {
			let { pattern, event } = this.watches[index].matcher;

			let watcher = chokidar.watch(pattern, {
				ignored: /[\/\\]\./,
				persistent: true
			};

			watcher.on(event, (path: string, stats?: any) => {
				this.handle(event, path, stats);
			});
		}
	}

	protected handle(event: string, path: string, stats?: any) {
		console.log('changes:', event, path, stats);

		if (this.aggregator) {
			this.aggregator.aggregate({
				event, path, stats
			});
		} else {
			console.log(' > emit');
		}
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
