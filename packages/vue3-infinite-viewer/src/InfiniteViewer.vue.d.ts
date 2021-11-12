import { MethodInterface } from "framework-utils";
import VanillaInfiniteViewer, { InfiniteViewerProperties, InfiniteViewerMethods } from "infinite-viewer";

export default class InfiniteViewer {}
export default interface InfiniteViewer
    extends InfiniteViewerProperties,
        MethodInterface<
            InfiniteViewerMethods,
            VanillaInfiniteViewer,
            InfiniteViewer
        > {}
