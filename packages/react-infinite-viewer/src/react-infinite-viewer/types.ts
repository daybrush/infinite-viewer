import { InfiniteViewerEvents, InfiniteViewerOptions } from "infinite-viewer";

export interface ReactInfiniteViewerEventNames {
    onScroll: "scroll";
}
export type InfiniteViewerEventProps = {
    [key in keyof ReactInfiniteViewerEventNames]: (e: InfiniteViewerEvents[ReactInfiniteViewerEventNames[key]]) => any;
};
export type InfiniteViewerProps = InfiniteViewerOptions & InfiniteViewerEventProps & {
    viewport: any;
    [key: string]: any;
};
