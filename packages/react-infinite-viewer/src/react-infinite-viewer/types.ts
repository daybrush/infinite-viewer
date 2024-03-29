import { InfiniteViewerEvents, InfiniteViewerOptions } from "infinite-viewer";

export interface InfiniteViewerEventNames {
    onScroll: "scroll";
    onDragStart: "dragStart";
    onDrag: "drag";
    onDragEnd: "dragEnd";
    onPinchStart: "pinchStart";
    onPinch: "pinch";
    onAbortPinch: "abortPinch";
}
export type InfiniteViewerEventProps = {
    [key in keyof InfiniteViewerEventNames]: (e: InfiniteViewerEvents[InfiniteViewerEventNames[key]]) => any;
};
export type InfiniteViewerProps = InfiniteViewerOptions & InfiniteViewerEventProps & {
    className?: string;
    [key: string]: any;
};
