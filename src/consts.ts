import styled from "css-styled";
import { InfiniteViewerOptions } from "./types";

export const injector = styled(`
{
    position: relative;
    display: block;
    overflow: auto;
}
:host::-webkit-scrollbar {
    display: none;
}
`);

/**
 * @memberof InfiniteViewer
 */
export const CLASS_NAME = injector.className;

/**
 * @memberof InfiniteViewer
 */
export const PROPERTIES = [
    "margin",
    "threshold",
    "zoom",
    "rangeX",
    "rangeY",
    "usePinch",
    "pinchThreshold",
    "wheelScale",
] as const;

/**
 * @memberof InfiniteViewer
 */
export const OPTIONS = [
    // ignore target, container,
    ...PROPERTIES,
    "cspNonce",
    "scrollArea",
] as const;

export const OPTION_TYPES: { [key in keyof InfiniteViewerOptions]: any } = {
    margin: Number,
    threshold: Number,
    zoom: Number,
    scrollArea: Object,
    rangeX: Array,
    rangeY: Array,
    pinchThreshold: Number,
    usePinch: Boolean,
    cspNonce: String,
    wheelScale: Number,
};

/**
 * @memberof InfiniteViewer
 */
export const EVENTS = [
    "scroll",
    "abortPinch",
    "dragStart",
    "dragEnd",
    "pinch",
] as const;

/**
 * @memberof InfiniteViewer
 */
export const METHODS = [
    "getScrollLeft",
    "getScrollTop",
    "getScrollWidth",
    "getScrollHeight",
    "scrollTo",
    "scrollBy",
    "scrollCenter",
    "getContainer",
    "getViewport",
] as const;

export const TINY_NUM = 0.000001;
