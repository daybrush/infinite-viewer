import { PROPERTIES, METHODS } from "./consts";
import InfiniteViewer from "./InfiniteViewer";

/**
 * @typedef
 * @memberof InfiniteViewer
 * @property - viewer's zoom (default: 1)
 * @property - Horizontal scroll range [Left, Right] (default: [-Infinity, Infinity])
 * @property - Vertical scroll range [Top, Bottom] (default: [-Infinity, Infinity])
 *
 * @property - Offset left position for zoom operation (default: "50%")
 * @property - Offset top position for zoom operation (default: "50%")
 * @property - Whether to pinch the scroll motion when the touch event is activated (default: false)
 * @property - Threshold at which pinch can be operated when the usePinch option is used (default: 50)
 * @property - Wheel of the delta scale (default: 0.01)
 * @property - add nonce property to style for CSP (default: "")
 * @property - Whether to show vertical scroll bar (default: true)
 * @property - Whether to show horizontal scroll bar (default: true)
 * @property - Whether to force use of the wheel event (Only use in safari as default) (default: false)
 *
 * @property - Margin to determine the scroll area. (default: 500)
 * @property - The size of the area to be infinite scrolled. (default: 100)
 * @property - Set translateZ transform. (default: 0)
 */
export interface InfiniteViewerOptions {
    zoom: number;
    rangeX: number[];
    rangeY: number[];

    zoomOffsetX: number | string;
    zoomOffsetY: number | string;
    usePinch: boolean;
    pinchThreshold: number;
    wheelScale: number;
    cspNonce: string;
    displayVerticalScroll: boolean;
    displayHorizontalScroll: boolean;
    useForceWheel: boolean;

    margin: number;
    threshold: number;
    translateZ: number;

    wrapperElement: HTMLElement;
    scrollAreaElement: HTMLElement;
    verticalScrollElement: HTMLElement;
    horizontalScrollElement: HTMLElement;
}

/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnScroll {
    scrollLeft: number;
    scrollTop: number;
}
/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnAbortPinch {
    inputEvent: any;
}
/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnDragStart {
    inputEvent: any;
    stop(): void;
}
/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnDrag {
    inputEvent: any;
}
/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnDragEnd {
    isDrag: boolean;
    isDouble: boolean;
    inputEvent: any;
}
/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnPinchStart {
    inputEvent: any;
    stop(): void;
}
/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface OnPinch {
    rotation: number;
    distance: number;
    scale: number;
    zoom: number;
    inputEvent: any;
}
export interface InfiniteViewerEvents {
    scroll: OnScroll;
    abortPinch: OnAbortPinch;
    dragStart: OnDragStart;
    drag: OnDrag;
    dragEnd: OnDragEnd;
    pinchStart: OnPinchStart;
    pinch: OnPinch;
}
export type InfiniteViewerProperties = { [P in typeof PROPERTIES[number]]: InfiniteViewerOptions[P] };
export type InfiniteViewerMethods = { [P in typeof METHODS[number]]: InfiniteViewer[P] };
