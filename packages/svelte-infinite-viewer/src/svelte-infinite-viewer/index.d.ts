/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { InfiniteViewerMethods, InfiniteViewerOptions, InfiniteViewerEvents } from "infinite-viewer";

export type SvelteInfiniteViewerEvents = {
    [key in keyof InfiniteViewerEvents]: CustomEvent<InfiniteViewerEvents[key]>;
}
export interface SvelteInfiniteViewerProps extends Partial<InfiniteViewerOptions> {
    className?: string;
}
export default class InfiniteViewerComponent extends SvelteComponentTyped<
    SvelteInfiniteViewerProps,
    SvelteInfiniteViewerEvents
> { }

export default interface InfiniteViewerComponent extends InfiniteViewerMethods {
}
export * from "infinite-viewer";
