
import { Eventable } from "intent-utils";

export declare type AggregationHandler<A extends Aggregatable> = (aggregated: A[]) => any;

export class Aggregator<A extends Aggregatable> {
	private start: number;
	private aggregated: A[];
	private watch: number;

	public delay: number;

	public constructor(delay: number = 200) {
		this.delay = delay;
	}

	public stop() {
		if (this.watch) {
			clearInterval(this.watch);
		}
	}

	public debounce(): DebounceDescriptorInterface<A> {
		this.stop();

		let descriptor = new DebounceDescriptor<A>();
		this.start = +new Date();
		this.watch = setInterval(() => this.submit(descriptor.emit.bind(descriptor)), ~~Math.max(30, this.delay / 10));

		return descriptor;
	}

	public aggregate(item: A): number {
		return this.aggregated.push(item);
	}

	protected submit(callback: AggregationHandler<A>) {
		let now = +new Date();

		if ((now - this.start) < this.delay) {
			return;
		}

		let aggregated = this.aggregated;
		this.aggregated = [];
		this.start = now;

		callback(aggregated);
	}
}

export interface Aggregatable {

}

export interface DebounceDescriptorInterface<A extends Aggregatable> {
	and(handler: AggregationHandler<A>): number;
	once(handler: AggregationHandler<A>): number;
	off(uid?: number): void;
}

class DebounceDescriptor<A extends Aggregatable> implements DebounceDescriptorInterface<A> {
	private static EMIT = 'emit';

	private eventable: Eventable = new Eventable();

	public emit(aggregated: A[]): number {
		return this.eventable.emit(DebounceDescriptor.EMIT, aggregated);
	}

	public and(handler: AggregationHandler<A>): number {
		return this.eventable.on(DebounceDescriptor.EMIT, handler);
	}

	public once(handler: AggregationHandler<A>): number {
		return this.eventable.once(DebounceDescriptor.EMIT, handler);
	}

	public off(uid?: number): void {
		return this.eventable.off(DebounceDescriptor.EMIT, uid);
	}
}
