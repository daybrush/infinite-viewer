import { MethodInterface } from "framework-utils";
import VanillaInfiniteViewer, { InfiniteViewerProperties, InfiniteViewerMethods } from "infinite-viewer";

interface InfiniteViewerInterface
    extends InfiniteViewerProperties,
    MethodInterface<
    InfiniteViewerMethods,
    VanillaInfiniteViewer,
    InfiniteViewerInterface
    > { }
declare const InfiniteViewer: InfiniteViewerInterface;
type InfiniteViewer = InfiniteViewerInterface;

export default InfiniteViewer;
