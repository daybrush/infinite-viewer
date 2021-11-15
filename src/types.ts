import { PROPERTIES, METHODS } from "./consts";
import InfiniteViewer from "./InfiniteViewer";
import {
    OnDrag as OnParentDrag
} from "gesto";

/**
 * @typedef
 * @memberof InfiniteViewer
 * @property - viewer's zoom (default: 1)
 * @property - Horizontal scroll range [Left, Right] (default: [-Infinity, Infinity])
 * @property - Vertical scroll range [Top, Bottom] (default: [-Infinity, Infinity])
 * @property - Horizontal scroll range offset not affected by zoom [Left, Right] (default: [0, 0])
 * @property - Vertical scroll range offset not affected by zoom [Top, Bottom] (default: [0, 0])
 *
 * @property - Offset left position for zoom operation (default: "50%")
 * @property - Offset top position for zoom operation (default: "50%")
 * @property - Whether to pinch the scroll motion when the touch event is activated (default: false)
 * @property - Threshold at which pinch can be operated when the usePinch option is used (default: 50)
 * @property - The max value of the wheel. If the wheel weight is too large, it can be adjusted. (default: Infinity)
 * @property - Wheel of the delta scale (default: 0.01)
 * @property - add nonce property to style for CSP (default: "")
 * @property - Whether to show vertical scroll bar (default: true)
 * @property - Whether to show horizontal scroll bar (default: true)
 * @property - Whether to force use of the wheel event (Only use in safari as default) (default: false)
 *
 * @property - Margin to determine the scroll area. (default: 500)
 * @property - The size of the area to be infinite scrolled. (default: 100)
 * @property - Whether to use the transform property. If you don't use it, you can't use zoom. (default: true)
 * @property - Set translateZ transform. (default: 0)
 */
export interface InfiniteViewerOptions {
    zoom: number;
    rangeX: number[];
    rangeY: number[];
    rangeOffsetX: number[];
    rangeOffsetY: number[];

    zoomOffsetX: number | string;
    zoomOffsetY: number | string;
    usePinch: boolean;
    pinchThreshold: number;
    maxWheelDistance: number;
    wheelScale: number;
    cspNonce: string;
    displayVerticalScroll: boolean;
    displayHorizontalScroll: boolean;
    useForceWheel: boolean;

    margin: number;
    threshold: number;
    useTransform: boolean;
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
 * @extends Gesto.OnDrag
 */
export interface OnDrag extends OnParentDrag {
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
    isWheel: boolean;
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
