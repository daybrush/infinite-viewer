import { InfiniteViewerEvents, InfiniteViewerProperties } from "infinite-viewer";

export interface InfiniteViewerEventNames {
    onScroll: "scroll";
    onDragStart: "dragStart";
    onDrag: "drag";
    onDragEnd: "dragEnd";
    onPinch: "pinch";
    onAbortPinch: "abortPinch";
}
export type InfiniteViewerEventProps = {
    [key in keyof InfiniteViewerEventNames]: (e: InfiniteViewerEvents[InfiniteViewerEventNames[key]]) => any;
};
export type InfiniteViewerProps = InfiniteViewerProperties & InfiniteViewerEventProps & {
    [key: string]: any;
};
