import Component from "@egjs/component";
import Gesto from "gesto";
import { InjectResult } from "css-styled";
import { Properties } from "framework-utils";
import { camelize, IObject, addEvent, removeEvent, addClass } from "@daybrush/utils";
import { InfiniteViewerOptions, InfiniteViewerProperties, InfiniteViewerEvents } from "./types";
import { PROPERTIES, injector, CLASS_NAME, TINY_NUM, IS_SAFARI, DEFAULT_OPTIONS, PREFIX } from "./consts";
import { measureSpeed, getDuration, getDestPos, abs, getRange } from "./utils";
import ScrollBar from "./ScrollBar";

@Properties(PROPERTIES as any, (prototype, property) => {
    const attributes: IObject<any> = {
        enumerable: true,
        configurable: true,
        get() {
            return this.options[property];
        },
    };
    const setter = camelize(`set ${property}`);
    if (prototype[setter]) {
        attributes.set = function (value) {
            this[setter](value);
        };
    } else {
        attributes.set = function (value) {
            this.options[property] = value;
        };
    }
    Object.defineProperty(prototype, property, attributes);
})
/**
 * @sort 1
 */
class InfiniteViewer extends Component {
    public options: InfiniteViewerOptions;
    private injectResult!: InjectResult;
    private wrapperElement!: HTMLElement;
    private scrollAreaElement!: HTMLElement;
    private horizontalScrollbar: ScrollBar;
    private verticalScrollbar: ScrollBar;
    private gesto!: Gesto;
    private offsetX = 0;
    private offsetY = 0;
    private containerWidth = 0;
    private containerHeight = 0;
    private viewportWidth = 0;
    private viewportHeight = 0;
    private scrollLeft = 0;
    private scrollTop = 0;
    private timer = 0;
    private dragFlag = false;
    private tempScale = 1;
    /**
     * @sort 1
     */
    constructor(
        private containerElement: HTMLElement,
        private viewportElement: HTMLElement,
        options: Partial<InfiniteViewerOptions> = {},
    ) {
        super();
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
        };
        this.wrapperElement = options.wrapperElement;
        this.scrollAreaElement = options.scrollAreaElement;
        this.init();
    }
    /**
     * Get Container Element
     */
    public getContainer(): HTMLElement {
        return this.containerElement;
    }
    /**
     * Get Viewport Element
     */
    public getViewport(): HTMLElement {
        return this.viewportElement;
    }
    /**
     * Get Wrapper Element
     */
    public getWrapper(): HTMLElement {
        return this.wrapperElement;
    }
    /**
     * Destroy elements, properties, and events.
     */
    public destroy(): void {
        this.off();
        this.gesto.unset();
        this.injectResult.destroy();
        const containerElement = this.containerElement;

        removeEvent(window, "resize", this.resize);
        removeEvent(containerElement, "scroll", this.onScroll);
        removeEvent(containerElement, "wheel", this.onWheel);
        removeEvent(containerElement, "tgesturestart", this.onGestureStart);
        removeEvent(containerElement, "gesturechange", this.onGestureChange);

        this.gesto = null;
        this.injectResult = null;
        this.containerElement = null;
        this.viewportElement = null;
        this.options = null;
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     * @param - Get absolute top position
     */
    public getScrollTop(isAbsolute?: boolean) {
        return this.scrollTop / this.zoom + this.offsetY
            + (isAbsolute ? abs(this.getRangeY()[0]) : 0);
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     * @param - Get absolute left position
     */
    public getScrollLeft(isAbsolute?: boolean) {
        return this.scrollLeft / this.zoom + this.offsetX
            + (isAbsolute ? abs(this.getRangeX()[0]) : 0);
    }
    /**
     * Gets measurement of the width of an element's content with overflow
     */
    public getScrollWidth(isZoom?: boolean) {
        const range = this.getRangeX(isZoom);

        return this.containerWidth + abs(range[0]) + abs(range[1]);
    }
    /**
     * Gets measurement of the height of an element's content with overflow
     */
    public getScrollHeight(isZoom?: boolean) {
        const range = this.getRangeY(isZoom);

        return this.containerHeight + abs(range[0]) + abs(range[1]);
    }

    /**
     * Scroll the element to the center
     */
    public scrollCenter() {
        this.resize();

        const zoom = this.zoom;
        const left = -(this.containerWidth - this.viewportWidth * zoom) / 2;
        const top = -(this.containerHeight - this.viewportHeight * zoom) / 2;

        return this.scrollTo(left, top);
    }
    /**
     * Update Viewer Sizes
     * @method
     */
    public resize = () => {
        const {
            offsetWidth: containerWidth,
            offsetHeight: containerHeight,
        } = this.containerElement;
        const {
            offsetWidth: viewportWidth,
            offsetHeight: viewportHeight,
        } = this.viewportElement;

        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
    }
    /**
     * Scrolls the container by the given amount.
     */
    public scrollBy(deltaX: number, deltaY: number) {
        return this.scrollTo(this.getScrollLeft() + deltaX, this.getScrollTop() + deltaY);
    }
    /**
     * Scrolls the container to set of coordinates.
     * @param scrollLeft
     * @param scrollTop
     */
    public scrollTo(x: number, y: number) {
        const {
            zoom = DEFAULT_OPTIONS.zoom,
            margin = DEFAULT_OPTIONS.margin,
            threshold = DEFAULT_OPTIONS.threshold,
            scrollLeft: prevScrollLeft,
            scrollTop: prevScrollTop,
        } = this;

        const [minX, maxX] = this.getRangeX(true, true);
        const [minY, maxY] = this.getRangeY(true, true);

        let scrollLeft = prevScrollLeft;
        let scrollTop = prevScrollTop;

        const scrollAreaWidth = this.getScrollAreaWidth();
        const scrollAreaHeight = this.getScrollAreaHeight();
        const zoomX = x * zoom;
        const zoomY = y * zoom;

        if (zoomX - threshold <= minX) {
            const minThreshold = Math.max(0, zoomX - minX);

            scrollLeft = minThreshold;
            x = (minX + minThreshold) / zoom;
        } else if (zoomX + threshold >= maxX) {
            const maxThreshold = Math.max(0, maxX - zoomX);

            scrollLeft = scrollAreaWidth - maxThreshold;
            x = (maxX - maxThreshold) / zoom;
        } else if (scrollLeft < threshold) {
            scrollLeft += margin;
        } else if (scrollLeft > scrollAreaWidth - threshold) {
            scrollLeft -= margin;
        }

        if (zoomY - threshold <= minY) {
            const minThreshold = Math.max(0, zoomY - minY);

            scrollTop = minThreshold;
            y = (minY + minThreshold) / zoom;
        } else if (zoomY + threshold >= maxY) {
            const maxThreshold = Math.max(0, maxY - zoomY);

            scrollTop = scrollAreaHeight - maxThreshold;
            y = (maxY - maxThreshold) / zoom;
        } else if (scrollTop < threshold) {
            scrollTop += margin;
        } else if (scrollTop > scrollAreaHeight - threshold) {
            scrollTop -= margin;
        }
        scrollLeft = Math.round(scrollLeft);
        scrollTop = Math.round(scrollTop);

        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;

        this.offsetX = x - scrollLeft / zoom;
        this.offsetY = y - scrollTop / zoom;

        this.render();
        const nextX = this.getScrollLeft();
        const nextY = this.getScrollTop();

        /**
         * The `scroll` event fires when the document view or an element has been scrolled.
         * @memberof InfiniteViewer
         * @event scroll
         * @param {InfiniteViewer.OnScroll} - Parameters for the scroll event
         * @example
         * import InfiniteViewer from "infinite-viewer";
         *
         * const viewer = new InfiniteViewer(
         *   document.querySelector(".container"),
         *   document.querySelector(".viewport"),
         * ).on("scroll", () => {
         *   console.log(viewer.getScrollLeft(), viewer.getScrollTop());
         * });
         */
        this.trigger("scroll", {
            scrollLeft: nextX,
            scrollTop: nextY,
        });
        if (prevScrollLeft !== Math.round(scrollLeft) || prevScrollTop !== scrollTop) {
            this.move(scrollLeft, scrollTop);
            return false;
        }
        return true;
    }
    /**
     * Set viewer zoom
     */
    public setZoom(zoom: number) {
        const {
            containerWidth,
            containerHeight,
            zoom: prevZoom,
        } = this;

        const scrollLeft = this.getScrollLeft();
        const scrollTop = this.getScrollTop();

        this.options.zoom = zoom;

        const nextScrollLeft = this.getScrollLeft();
        const nextScrollTop = this.getScrollTop();

        const centerX = scrollLeft + containerWidth / prevZoom / 2;
        const centerY = scrollTop + containerHeight / prevZoom / 2;

        const nextCenterX = nextScrollLeft + containerWidth / zoom / 2;
        const nextCenterY = nextScrollTop + containerHeight / zoom / 2;

        this.scrollBy(centerX - nextCenterX, centerY - nextCenterY);
        this.render();
    }
    public getRangeX(isZoom?: boolean, isReal?: boolean) {
        const {
            rangeX = DEFAULT_OPTIONS.rangeX,
            margin = DEFAULT_OPTIONS.margin,
            zoom = DEFAULT_OPTIONS.zoom,
            threshold,
        } = this;

        const range = getRange(
            this.getScrollLeft(),
            margin,
            rangeX,
            threshold,
            isReal,
        );

        if (!isZoom) {
            return range;
        }
        return [
            range[0] * zoom,
            Math.max(this.viewportWidth * zoom - this.containerWidth, range[1] * zoom),
        ];
    }
    public getRangeY(isZoom?: boolean, isReal?: boolean) {
        const {
            rangeY = DEFAULT_OPTIONS.rangeY,
            margin = DEFAULT_OPTIONS.margin,
            zoom = DEFAULT_OPTIONS.zoom,
            threshold,
        } = this;

        const range = getRange(
            this.getScrollTop(),
            margin,
            rangeY,
            threshold,
            isReal,
        );
        if (!isZoom) {
            return range;
        }
        return [
            range[0] * zoom,
            Math.max(this.viewportHeight * zoom - this.containerHeight, range[1] * zoom),
        ];
    }
    private init() {
        // infinite-viewer(container)
        // viewport
        // children
        const containerElement = this.containerElement;

        addClass(containerElement, CLASS_NAME);

        // vanilla
        let wrapperElement = this.wrapperElement;
        let scrollAreaElement = this.scrollAreaElement;
        if (!wrapperElement) {
            wrapperElement = document.createElement("div");

            addClass(wrapperElement, `${PREFIX}wrapper`);

            wrapperElement.insertBefore(this.viewportElement, null);
            containerElement.insertBefore(wrapperElement, null);

            this.wrapperElement = wrapperElement;
        }
        if (!scrollAreaElement) {
            scrollAreaElement = document.createElement("div");

            addClass(scrollAreaElement, `${PREFIX}scroll-area`);
            wrapperElement.insertBefore(scrollAreaElement, wrapperElement.firstChild);

            this.scrollAreaElement = scrollAreaElement;

        }
        this.horizontalScrollbar = new ScrollBar("horizontal", this.options.horizontalScrollElement);
        this.verticalScrollbar = new ScrollBar("vertical", this.options.verticalScrollElement);

        this.horizontalScrollbar.on("scroll", e => {
            this.scrollBy(e.delta / this.zoom, 0);
        });

        this.verticalScrollbar.on("scroll", e => {
            this.scrollBy(0, e.delta / this.zoom);
        });

        if (this.horizontalScrollbar.isAppend) {
            containerElement.insertBefore(this.horizontalScrollbar.barElement, null);
        }
        if (this.verticalScrollbar.isAppend) {
            containerElement.insertBefore(this.verticalScrollbar.barElement, null);
        }
        addClass(containerElement, CLASS_NAME);
        this.injectResult = injector.inject(containerElement, {
            nonce: this.options.cspNonce,
        });
        /**
         * the `dragStart` event fires when `touchstart` does occur.
         * @memberof InfiniteViewer
         * @event dragStart
         * @param {InfiniteViewer.OnDragStart} - Parameters for the `dragStart` event
         * @example
         * import InfiniteViewer from "infinite-viewer";
         *
         * const viewer = new InfiniteViewer(
         *   document.querySelector(".container"),
         *   document.querySelector(".viewport"),
         * ).on("dragStart", e => {
         *   console.log(e.inputEvent);
         * });
         */
        /**
         * the `drag` event fires when `touch` does occur.
         * @memberof InfiniteViewer
         * @event drag
         * @param {InfiniteViewer.OnDrag} - Parameters for the `drag` event
         * @example
         * import InfiniteViewer from "infinite-viewer";
         *
         * const viewer = new InfiniteViewer(
         *   document.querySelector(".container"),
         *   document.querySelector(".viewport"),
         * ).on("drag", e => {
         *   console.log(e.inputEvent);
         * });
         */
        /**
         * the `dragEnd` event fires when `touchend` does occur.
         * @memberof InfiniteViewer
         * @event dragEnd
         * @param {InfiniteViewer.OnDragEnd} - Parameters for the `dragEnd` event
         * @example
         * import InfiniteViewer from "infinite-viewer";
         *
         * const viewer = new InfiniteViewer(
         *   document.querySelector(".container"),
         *   document.querySelector(".viewport"),
         * ).on("dragEnd", e => {
         *   console.log(e.inputEvent);
         * });
         */
        /**
         * the `abortPinch` event fires when `pinch` event does not occur by dragging a certain area.
         * @memberof InfiniteViewer
         * @event abortPinch
         * @param {InfiniteViewer.OnAbortPinch} - Parameters for the abortPinch event
         * @example
         * import InfiniteViewer from "infinite-viewer";
         *
         * const viewer = new InfiniteViewer(
         *   document.querySelector(".container"),
         *   document.querySelector(".viewport"),
         *   {
         *     usePinch: true,
         *   }
         * ).on("abortPinch", e => {
         *   console.log(e.inputEvent);
         * });
         */
        /**
         * the `pinch` event fires when two points pinch the viewer
         * @memberof InfiniteViewer
         * @event pinch
         * @param {InfiniteViewer.OnPinch} - Parameters for the `pinch` event
         * @example
         * import InfiniteViewer from "infinite-viewer";
         *
         * const viewer = new InfiniteViewer(
         *   document.querySelector(".container"),
         *   document.querySelector(".viewport"),
         *   {
         *     usePinch: true,
         *   }
         * ).on("pinch", e => {
         *   console.log(e.zoom, e.inputEvent);
         * });
         */
        this.gesto = new Gesto(containerElement, {
            container: document.body,
            events: ["touch"],
        }).on("dragStart", ({ inputEvent, datas }) => {
            inputEvent.preventDefault();
            this.pauseAnimation();
            this.dragFlag = false;

            datas.startEvent = inputEvent;
            return this.trigger("dragStart", {
                inputEvent,
            });
        }).on("drag", e => {
            const options = this.options;
            if (!options.usePinch || e.isPinch) {
                this.trigger("drag", {
                    inputEvent: e.inputEvent,
                });
                measureSpeed(e);
                const zoom = this.zoom;
                this.scrollBy(-e.deltaX / zoom, -e.deltaY / zoom);
            } else if (!this.dragFlag && e.movement > options.pinchThreshold) {
                this.dragFlag = true;

                this.trigger("abortPinch", {
                    inputEvent: e.datas.startEvent || e.inputEvent,
                });
            }
        }).on("dragEnd", e => {
            this.trigger("dragEnd", {
                isDrag: e.isDrag,
                isDouble: e.isDouble,
                inputEvent: e.inputEvent,
            });
            this.startAnimation(e.datas.speed);
        }).on("ppinchStart", ({ inputEvent, datas }) => {
            inputEvent.preventDefault();
            this.pauseAnimation();
            datas.startZoom = this.zoom;
        }).on("pinch", e => {
            // e.distance;
            // e.scale
            this.trigger("pinch", {
                rotation: e.rotation,
                distance: e.distance,
                scale: e.scale,
                zoom: e.datas.startZoom * e.scale,
                inputEvent: e.inputEvent,
            });
        });
        const margin = this.margin;

        addEvent(wrapperElement, "scroll", this.onScroll);
        addEvent(window, "resize", this.resize);
        addEvent(containerElement, "wheel", this.onWheel, {
            passive: false,
        });

        addEvent(containerElement, "gesturestart", this.onGestureStart, {
            passive: false,
        });
        addEvent(containerElement, "gesturechange", this.onGestureChange, {
            passive: false,
        });
        this.resize();
        this.render();
        this.move(this.rangeX[0] ? margin : 0, this.rangeY[0] ? margin : 0);
    }
    private render() {
        const {
            offsetX,
            offsetY,
            zoom = DEFAULT_OPTIONS.zoom,
        } = this;
        const nextOffsetX = -offsetX * zoom;
        const nextOffsetY = -offsetY * zoom;

        this.scrollAreaElement.style.cssText
            = `width:calc(100% + ${this.getScrollAreaWidth()}px);`
            + `height:calc(100% + ${this.getScrollAreaHeight()}px);`;
        this.viewportElement.style.cssText += `transform-origin: 0 0;transform:translate(${nextOffsetX}px, ${nextOffsetY}px) scale(${zoom});`;
        this.renderScroll();
    }
    private renderScroll() {
        const {
            containerWidth,
            containerHeight,
            zoom,
        } = this;
        const scrollLeft = this.getScrollLeft(true) * zoom;
        const scrollTop = this.getScrollTop(true) * zoom;
        const scrollWidth = this.getScrollWidth(true);
        const scrollHeight = this.getScrollHeight(true);

        this.horizontalScrollbar.render(
            this.displayHorizontalScroll,
            scrollLeft,
            containerWidth,
            scrollWidth,
        );
        this.verticalScrollbar.render(
            this.displayVerticalScroll,
            scrollTop,
            containerHeight,
            scrollHeight,
        );
    }
    private move(scrollLeft: number, scrollTop: number) {
        const wrapperElement = this.wrapperElement;

        wrapperElement.scrollLeft = scrollLeft;
        wrapperElement.scrollTop = scrollTop;
    }
    private onScroll = () => {
        const { scrollLeft, scrollTop } = this.wrapperElement;
        const {
            zoom = DEFAULT_OPTIONS.zoom,
        } = this;
        const deltaX = scrollLeft - this.scrollLeft;
        const deltaY = scrollTop - this.scrollTop;
        const viewerScrollLeft = this.getScrollLeft();
        const viewerScrollTop = this.getScrollTop();

        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;
        this.scrollTo(
            viewerScrollLeft + deltaX / zoom,
            viewerScrollTop + deltaY / zoom,
        );
    }
    private onWheel = (e: WheelEvent) => {
        const ctrlKey = e.ctrlKey;

        if (ctrlKey) {
            const distance = -e.deltaY;
            const scale = Math.max(1 + distance * (this.options.wheelScale || 0.01), TINY_NUM);

            this.trigger("pinch", {
                distance,
                scale,
                rotation: 0,
                zoom: this.zoom * scale,
                inputEvent: e,
            });
        } else if (!IS_SAFARI) {
            return;
        } else {
            const zoom = this.zoom;
            this.scrollBy(e.deltaX / zoom, e.deltaY / zoom);
        }
        e.preventDefault();
    }
    private onGestureStart = (e: any) => {
        this.tempScale = this.zoom;
        e.preventDefault();
    }
    private onGestureChange = (e: any) => {
        e.preventDefault();
        if (this.gesto.isFlag() || !this.tempScale) {
            this.tempScale = 0;
            return;
        }
        const scale = e.scale;

        this.trigger("pinch", {
            distance: 0,
            scale,
            rotation: e.rotation,
            zoom: this.tempScale * scale,
            inputEvent: e,
        });
    }
    private startAnimation(speed: number[]) {
        if (!speed || (!speed[0] && !speed[1])) {
            return;
        }
        const a = -0.0006;
        const easing = x => 1 - Math.pow(1 - x, 3);
        const duration = getDuration(speed, a);
        const destPos = getDestPos(speed, a);
        const startTime = Date.now();
        let prevTime = startTime;

        const next = () => {
            const now = Date.now();
            let t = now - startTime;

            if (duration < t) {
                t = duration;
            }
            const ratio = easing(t / duration);
            const prevRatio = easing((prevTime - startTime) / duration);

            prevTime = now;

            this.scrollBy(
                -destPos[0] * (ratio - prevRatio),
                -destPos[1] * (ratio - prevRatio),
            );

            if (t >= duration) {
                return;
            }
            this.timer = requestAnimationFrame(next);
        };
        this.timer = requestAnimationFrame(next);
    }
    private pauseAnimation() {
        cancelAnimationFrame(this.timer);
    }
    private getScrollAreaWidth() {
        const [min, max] = this.getRangeX(true);
        return min || max ? this.margin * 2 : 0;
    }
    private getScrollAreaHeight() {
        const [min, max] = this.getRangeY(true);
        return min || max ? this.margin * 2 : 0;
    }
}

interface InfiniteViewer extends Component, InfiniteViewerProperties {
    // tslint:disable-next-line: max-line-length
    on<T extends keyof InfiniteViewerEvents>(eventName: T, handlerToAttach: (event: InfiniteViewerEvents[T]) => any): this;
    on(eventName: string, handlerToAttach: (event: { [key: string]: any }) => any): this;
    on(events: { [key: string]: (event: { [key: string]: any }) => any }): this;
}

export default InfiniteViewer;
