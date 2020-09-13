import styled from "css-styled";
import { InfiniteViewerOptions } from "./types";
import getAgent from "@egjs/agent";
import { prefixCSS } from "framework-utils";

export const agent = getAgent();
export const IS_SAFARI = agent.browser.name === "safari";

export const PREFIX = "infinite-viewer-";

export const WRAPPER_CLASS_NAME = `${PREFIX}wrapper`;
export const SCROLL_AREA_CLASS_NAME = `${PREFIX}scroll-area`;

export const SCROLL_BAR_CLASS_NAME = `${PREFIX}scroll-bar`;
export const HORIZONTAL_SCROLL_BAR_CLASS_NAME = `${PREFIX}horizontal-scroll-bar`;
export const VERTICAL_SCROLL_BAR_CLASS_NAME = `${PREFIX}vertical-scroll-bar`;
export const SCROLL_THUMB_CLASS_NAME = `${PREFIX}scroll-thumb`;

export const injector = styled(prefixCSS(PREFIX, `
{
    position: relative;
    overscroll-behavior: none;
}
.wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    will-change: scroll-position;
}
.wrapper::-webkit-scrollbar {
    display: none;
}
.scroll-area {
    position:absolute;
    top:0;
    left:0;
    transform-origin: 0 0;
}
.scroll-bar {
    position:absolute;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
.horizontal-scroll-bar {
    width: 100%;
    height: 14px;
}
.vertical-scroll-bar {
    height: 100%;
    width: 14px;
}
.scroll-thumb {
    position:relative;
    opacity: 0.7;
    background: #333;
    border-radius: 3px;
    left: 0px;
    top: 0px;
    z-index: 10;
    width: 6px;
    height: 6px;
    transition: all ease 0.2s;
}
.horizontal-scroll-bar .scroll-thumb {
    margin: 4px 0px;
    transition-property: margin, height, border-radius;
}
.vertical-scroll-bar .scroll-thumb {
    margin: 0px 4px;
    transition-property: margin, width, border-radius;
}
.horizontal-scroll-bar:hover .scroll-thumb {
    height: 10px;
    margin: 2px 0px;
    border-radius: 5px;
}
.vertical-scroll-bar:hover .scroll-thumb {
    width: 10px;
    margin: 0px 2px;
    border-radius: 5px;
}
`));

export const DEFAULT_OPTIONS = {
    margin: 500,
    threshold: 100,
    zoom: 1,
    rangeX: [-Infinity, Infinity],
    rangeY: [-Infinity, Infinity],
    wrapperElement: null,
    scrollAreaElement: null,
    horizontalScrollElement: null,
    verticalScrollElement: null,
    usePinch: false,
    pinchThreshold: 30,
    cspNonce: "",
    wheelScale: 0.01,
    displayHorizontalScroll: true,
    displayVerticalScroll: true,
    useForceWheel: false,
};
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
    "displayVerticalScroll",
    "displayHorizontalScroll",
    "useForceWheel",
] as const;

/**
 * @memberof InfiniteViewer
 */
export const OPTIONS = [
    // ignore target, container,
    ...PROPERTIES,
    "cspNonce",
    "wrapperElement",
    "scrollAreaElement",
    "verticalScrollElement",
    "horizontalScrollElement",
] as const;
export const OPTION_TYPES: { [key in keyof InfiniteViewerOptions]: any } = {
    margin: Number,
    threshold: Number,
    zoom: Number,
    wrapperElement: Object,
    scrollAreaElement: Object,
    verticalScrollElement: Object,
    horizontalScrollElement: Object,
    rangeX: Array,
    rangeY: Array,
    pinchThreshold: Number,
    usePinch: Boolean,
    useForceWheel: Boolean,
    cspNonce: String,
    wheelScale: Number,
    displayHorizontalScroll: Boolean,
    displayVerticalScroll: Boolean,
};

/**
 * @memberof InfiniteViewer
 */
export const EVENTS = [
    "scroll",
    "abortPinch",
    "dragStart",
    "dragEnd",
    "pinchStart",
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
    "getWrapper",
    "setZoom",
    "getRangeX",
    "getRangeY",
] as const;

export const TINY_NUM = 0.000001;
