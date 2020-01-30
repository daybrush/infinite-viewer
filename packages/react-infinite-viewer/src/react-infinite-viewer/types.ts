import { InfiniteViewerEvents, InfiniteViewerOptions } from "infinite-viewer";

export interface InfiniteViewerEventNames {
    onScroll: "scroll";
}
export type InfiniteViewerEventProps = {
    [key in keyof InfiniteViewerEventNames]: (e: InfiniteViewerEvents[InfiniteViewerEventNames[key]]) => any;
};
export type InfiniteViewerProps = InfiniteViewerOptions & InfiniteViewerEventProps & {
    viewport: any;
    [key: string]: any;
};
