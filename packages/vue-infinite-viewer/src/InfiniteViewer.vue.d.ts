import { MethodInterface } from "framework-utils";
import VanillaInfiniteViewer, { InfiniteViewerProperties, InfiniteViewerMethods } from "infinite-viewer";

interface InfiniteViewerInterface
    extends InfiniteViewerProperties,
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
