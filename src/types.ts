import { PROPERTIES, METHODS } from "./consts";
import InfiniteViewer from "./InfiniteViewer";

/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface InfiniteViewerOptions {
    margin: number;
    threshold: number;
    zoom: number;
    scrollArea: HTMLElement;
    rangeX: number[];
    rangeY: number[];
}

export interface InfiniteViewerEvents {
    scroll: {};
}
export type InfiniteViewerProperties = { [P in typeof PROPERTIES[number]]: InfiniteViewerOptions[P] };
export type InfiniteViewerMethods = { [P in typeof METHODS[number]]: InfiniteViewer[P] };
