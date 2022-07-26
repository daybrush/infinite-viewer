import { PROPERTIES, METHODS } from "./consts";
import InfiniteViewer from "./InfiniteViewer";
import {
    OnDrag as OnParentDrag
} from "gesto";

/**
 * @typedef
 * @memberof InfiniteViewer
 */
export interface InfiniteViewerOptions {
    /**
     * viewer's zoom
     * @default 1
     */
    zoom: number;
    /**
     * Horizontal scroll range [Left, Right]
     * @default [-Infinity, Infinity]
     */
    rangeX: number[];
    /**
     * Vertical scroll range [Top, Bottom]
     * @default [-Infinity, Infinity]
     */
    rangeY: number[];
    /**
     * Horizontal scroll range offset not affected by zoom [Left, Right]
     * @default [0, 0]
     */
    rangeOffsetX: number[];
    /**
     * Vertical scroll range offset not affected by zoom [Top, Bottom]
     * @default [0, 0]
     */
    rangeOffsetY: number[];
    /**
     * Offset left position for zoom operation
     * @default "50%"
     */
    zoomOffsetX: number | string;
    /**
     * Offset top position for zoom operation.
     * @default "50%"
     */
    zoomOffsetY: number | string;
    /**
     * Whether to pinch the scroll motion when the touch event is activated.
     * @default false
     */
    usePinch: boolean;
    /**
     * Whether to use mouse drag
     */
    useMouseDrag: boolean;
    /**
     * Threshold at which pinch can be operated when the usePinch option is used.
     * @default 50
     */
    pinchThreshold: number;
    /**
     * Whether zoom automatically updates when pinch occurs through wheel, gesture, or touch
     * @default false
     */
    useAutoZoom: boolean;
    /**
     * Set the zoom range.
     * @default [0.001, Infinity]
     */
    zoomRange: number[];
    /**
     * Whether to use wheel pinch. you can pinch using the ctrl key.
     * @default true
     */
    useWheelPinch: boolean;
    /**
     * Key to use wheel pinch
     * @default "ctrl"
     */
    wheelPinchKey: "ctrl" | "meta" | "alt" | "shift",
    /**
     * Whether to use wheel scroll. You can scroll smoothly by using the wheel.
     * @default IS_SAFARI
     */
    useWheelScroll: boolean;
    /**
     * Whether to use gestures using trackpad or magic mouse.
     * @default true
     */
    useGesture: boolean;
    /**
     * The max value of the wheel for pinch. If the wheel weight is too large, it can be adjusted.
     * @default Infinity
     */
    maxPinchWheel: number;
    /**
     * Wheel of the delta scale.
     * @default 0.01
     */
    wheelScale: number;
    /**
     * add nonce property to style for CSP
     * @default ""
     */
    cspNonce: string;
    /**
     * Whether to show vertical scroll bar
     * @default true
     */
    displayVerticalScroll: boolean;
    /**
     * Whether to show horizontal scroll bar
     * @default true
     */
    displayHorizontalScroll: boolean;

    /**
     * Margin to determine the scroll area.
     * @default 500
     */
    margin: number;
    /**
     * The size of the area to be infinite scrolled.
     * @default 100
     */
    threshold: number;
    /**
     * Whether to use the transform property. If you don't use it, you can't use zoom.
     * @default true
     */
    useTransform: boolean;
    /**
     * Set translateZ transform.
     * @default 0
     */
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
    clientX: number;
    clientY: number;
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
