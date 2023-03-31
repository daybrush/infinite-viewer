import { SvelteComponentDev } from "svelte/internal";
import VanillaInfiniteViewer, {
    InfiniteViewerOptions,
    InfiniteViewerMethods,
} from "infinite-viewer";
import { MethodInterface } from "framework-utils";

export default class InfiniteViewerComponent<T={}> extends SvelteComponentDev {
    $$prop_def: InfiniteViewerOptions & T;
    getInstance(): VanillaInfiniteViewer;
}
export default interface InfiniteViewerComponent extends MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, InfiniteViewerComponent> {
}

export * from "infinite-viewer";
