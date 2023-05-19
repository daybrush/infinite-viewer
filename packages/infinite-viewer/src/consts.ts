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
    scrollbar-width: none;
    top: 0;
    left: 0;
    will-change: scroll-position;
}
.restrict-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
    width: calc(100% - 20px);
    right: 10px;
    height: 14px;
}
.vertical-scroll-bar {
    height: calc(100% - 20px);
    bottom: 10px;
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
    opacity: 0;
}
.scroll-bar:hover .scroll-thumb {
    border-radius: 5px;
    opacity: 1;
}
.horizontal-scroll-bar .scroll-thumb {
    margin: 4px 0px;
    transition-property: opacity, margin, height, border-radius;
}
.vertical-scroll-bar .scroll-thumb {
    margin: 0px 4px;
    transition-property: opacity, margin, width, border-radius;
}
.horizontal-scroll-bar:hover .scroll-thumb {
    height: 10px;
    margin: 2px 0px;
}
.vertical-scroll-bar:hover .scroll-thumb {
    width: 10px;
    margin: 0px 2px;
}
`));

export const DEFAULT_OPTIONS = {
    margin: 500,
    threshold: 100,
    zoom: 1,
    zoomX: 1,
    zoomY: 1,
    rangeX: [-Infinity, Infinity],
    rangeY: [-Infinity, Infinity],
    rangeOffsetX: [0, 0],
    rangeOffsetY: [0, 0],
    wrapperElement: null,
    scrollAreaElement: null,
    horizontalScrollElement: null,
    verticalScrollElement: null,
    usePinch: false,
    useAutoZoom: false,
    useMouseDrag: false,
    pinchThreshold: 30,
    cspNonce: "",
    maxPinchWheel: Infinity,
    wheelScale: 0.01,
    displayHorizontalScroll: true,
    displayVerticalScroll: true,
    useTransform: true,
    useWheelPinch: true,
    zoomRange: [0.001, Infinity],
    wheelPinchKey: "ctrl" as const,
    useWheelScroll: IS_SAFARI,
    zoomOffsetX: "50%",
    zoomOffsetY: "50%",
    translateZ: 0,
    useGesture: true,
    useResizeObserver: false,
    pinchDirection: "all" as const,
    preventWheelClick: true,
};

export const DEFAULT_EASING = (x: number) => 1 - Math.pow(1 - x, 3);
export const NAMES = {
    horizontal: {
        pos: "Left",
        coord: "X",
        size: "Width",
    },
    vertical: {
        pos: "Top",
        coord: "Y",
        size: "Height",
    },
} as const;
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
    "zoomOffsetX",
    "zoomOffsetY",
    "zoom",
    "zoomX",
    "zoomY",
    "rangeX",
    "rangeY",
    "rangeOffsetX",
    "rangeOffsetY",
    "usePinch",
    "useMouseDrag",
    "pinchThreshold",
    "maxPinchWheel",
    "wheelScale",
    "displayVerticalScroll",
    "displayHorizontalScroll",
    "translateZ",
    "useAutoZoom",
    "wheelPinchKey",
    "zoomRange",
    "pinchDirection",
] as const;

/**
 * @memberof InfiniteViewer
 */
export const OPTIONS = [
    // ignore target, container,
    ...PROPERTIES,
    "preventWheelClick",
    "useWheelPinch",
    "useWheelScroll",
    "useGesture",
    "cspNonce",
    "wrapperElement",
    "scrollAreaElement",
    "verticalScrollElement",
    "horizontalScrollElement",
    "useResizeObserver",
    "wheelContainer",
] as const;

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
    "getContainerWidth",
    "getContainerHeight",
    "getViewportWidth",
    "getViewportHeight",
    "getViewportScrollWidth",
    "getViewportScrollHeight",
    "scrollTo",
    "scrollBy",
    "zoomBy",
    "scrollCenter",
    "getContainer",
    "getViewport",
    "getWrapper",
    "setZoom",
    "getRangeX",
    "getRangeY",
    "resize",
    "getZoom",
    "getZoomX",
    "getZoomY",
    "getWheelContainer",
    "setTo",
    "setBy",
] as const;

export const TINY_NUM = 0.000001;
