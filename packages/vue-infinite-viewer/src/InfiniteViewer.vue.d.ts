import { MethodInterface } from "framework-utils";
import VanillaInfiniteViewer, { InfiniteViewerOptions, InfiniteViewerMethods } from "infinite-viewer";

interface InfiniteViewerInterface
    extends InfiniteViewerOptions,
    MethodInterface<
    InfiniteViewerMethods,
    VanillaInfiniteViewer,
    InfiniteViewerInterface
    > {
        name: string;
    }
declare const InfiniteViewer: InfiniteViewerInterface;
type InfiniteViewer = InfiniteViewerInterface;

export default InfiniteViewer;
