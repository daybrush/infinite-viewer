/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { InfiniteViewerMethods, InfiniteViewerOptions, InfiniteViewerEvents } from "infinite-viewer";

export type SvelteInfiniteViewerEvents = {
    [key in keyof InfiniteViewerEvents]: CustomEvent<InfiniteViewerEvents[key]>;
}
export default class InfiniteViewerComponent<T = {}> extends SvelteComponentTyped<
    InfiniteViewerOptions & T,
    SvelteInfiniteViewerEvents
> { }

export default interface InfiniteViewerComponent extends InfiniteViewerMethods {
}
export * from "infinite-viewer";
