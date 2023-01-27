import EventEmitter from "@scena/event-emitter";
import Gesto from "gesto";
import { InjectResult } from "css-styled";
import { Properties } from "framework-utils";
import { camelize, IObject, addEvent, removeEvent, addClass, convertUnitSize, between, isObject, isArray } from "@daybrush/utils";
import { InfiniteViewerOptions, InfiniteViewerProperties, InfiniteViewerEvents, OnPinch, AnimationOptions, ScrollOptions, ZoomOptions, GetScollPosOptions } from "./types";
import {
    PROPERTIES, injector, CLASS_NAME, TINY_NUM,
    DEFAULT_OPTIONS,
    WRAPPER_CLASS_NAME, SCROLL_AREA_CLASS_NAME,
    HORIZONTAL_SCROLL_BAR_CLASS_NAME, VERTICAL_SCROLL_BAR_CLASS_NAME, NAMES, DEFAULT_EASING
} from "./consts";
import { measureSpeed, getDuration, getDestPos, abs, getRange, checkDefault, startAnimation } from "./utils";
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
class InfiniteViewer extends EventEmitter<InfiniteViewerEvents> {
    public options: InfiniteViewerOptions;
    private injectResult!: InjectResult;
    private wrapperElement!: HTMLElement;
    private scrollAreaElement!: HTMLElement;
    private horizontalScrollbar: ScrollBar;
    private verticalScrollbar: ScrollBar;
    private gesto!: Gesto;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private containerWidth: number = 0;
    private containerHeight: number = 0;
    private viewportWidth: number = 0;
    private viewportHeight: number = 0;
    private scrollLeft: number = 0;
    private scrollTop: number = 0;
    private _scrollTimer = 0;
    private _zoomTimer = 0;

    private dragFlag: boolean = false;
    private isLoop: boolean = false;
    private _tempScale: number[] = [1, 1];
    private _tempRect: { top: number, left: number, width: number, height: number } | null = null;
    private _tempRectTimer: number | null = null;
    private _onDestroys: Array<() => void> = [];
    private _asLeft = 0;
    private _asTop = 0;
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
     * Get Scroll Area Element
     */
    public geScrollArea(): HTMLElement {
        return this.scrollAreaElement;
    }
    /**
     * Destroy elements, properties, and events.
     */
    public destroy(): void {
        this.off();
        this.gesto.unset();
        this.verticalScrollbar.destroy();
        this.horizontalScrollbar.destroy();
        this.injectResult.destroy();
        const containerElement = this.containerElement;

        this._onDestroys.forEach(callback => {
            callback();
        });
        removeEvent(this.wrapperElement, "scroll", this._onScroll);
        removeEvent(containerElement, "wheel", this.onWheel);
        removeEvent(containerElement, "gesturestart", this.onGestureStart);
        removeEvent(containerElement, "gesturechange", this.onGestureChange);
        removeEvent(containerElement, "gesturesend", this.onGestureEnd);

        this.gesto = null;
        this.injectResult = null;
        this.containerElement = null;
        this.viewportElement = null;
        this.options = null;
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     */
    public getScrollTop(options: GetScollPosOptions | boolean = {}) {
        let range = false;
        let absolute = false;

        if (isObject(options)) {
            range = options.range;
            absolute = options.absolute;
        } else {
            range = options;
        }
        const zoom = this.zoomY;
        const pos = this.scrollTop / zoom + this.offsetY
            + (range ? abs(this.getRangeY()[0]) : 0);

        return absolute ? pos * zoom : pos;
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     */
    public getScrollLeft(options: GetScollPosOptions | boolean = {}) {
        let range = false;
        let absolute = false;

        if (isObject(options)) {
            range = options.range;
            absolute = options.absolute;
        } else {
            range = options;
        }
        const zoom = this.zoomX;
        const pos = this.scrollLeft / zoom + this.offsetX
            + (range ? abs(this.getRangeX()[0]) : 0);

        return absolute ? pos * zoom : pos;
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
    public scrollCenter(options?: ScrollOptions) {
        this.resize();

        const zoomX = this.zoomX;
        const zoomY = this.zoomY;

        let left = -(this.containerWidth / zoomX - this.viewportWidth) / 2;
        let top = -(this.containerHeight / zoomY - this.viewportHeight) / 2;

        if (options?.absolute) {
            left *= zoomX;
            top *= zoomY;
        }


        return this.scrollTo(left, top, options);
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

        this.render();
        this._scrollBy(0, 0);
    }
    /**
     * Scrolls the container by the given amount.
     */
    public scrollBy(deltaX: number, deltaY: number, options?: ScrollOptions) {
        this._pauseScrollAnimation();
        if (!options || !options.duration) {
            let scrollLeft = this.getScrollLeft();
            let scrollTop = this.getScrollTop();

            if (options?.absolute) {
                scrollLeft *= this.zoomX;
                scrollTop *= this.zoomY;
            }
            return this._scrollTo(scrollLeft + deltaX, scrollTop + deltaY, options);
        } else {
            this._startScrollAnimation([deltaX, deltaY], options);
            return true;
        }
    }
    /**
     * Scrolls the container to set of coordinates.
     * @param scrollLeft
     * @param scrollTop
     */
    public scrollTo(x: number, y: number, options?: ScrollOptions) {
        this._pauseScrollAnimation();
        if (!options || !options.duration) {
            return this._scrollTo(x, y, options);
        } else {
            let scrollLeft = this.getScrollLeft();
            let scrollTop = this.getScrollTop();

            if (options?.absolute) {
                scrollLeft *= this.zoomX;
                scrollTop *= this.zoomY;
            }
            return this.scrollBy(x - scrollLeft, y - scrollTop, options);
        }
    }
    /**
     * Set viewer zoom by the given amount
     */
    public zoomBy(deltaZoom: number | number[], options?: ZoomOptions) {
        this._pauseZoomAnimation();
        const [deltaX, deltaY] = isArray(deltaZoom)
        ? deltaZoom
        : [deltaZoom, deltaZoom];

        if (!options || !options.duration) {

            this._setZoom([
                this.zoomX + deltaX,
                this.zoomY + deltaY,
            ]);
        } else {
            this._startZoomAnimation([deltaX, deltaY], options);
        }
    }
    /**
     * Set viewer zoom
     */
    public setZoom(zoom: number | number[], options?: AnimationOptions) {
        this._pauseZoomAnimation();

        if (!options || !options.duration) {
            this._setZoom(zoom);
        } else {
            const [zoomX, zoomY] = isArray(zoom)
            ? zoom
            : [zoom, zoom];
            this._startZoomAnimation([
                zoomX - this.zoomX,
                zoomY - this.zoomY,
            ], options);
        }
    }
    /**
     * Get viewer zoom
     */
    public getZoom() {
        return (this.zoomX + this.zoomY) / 2;
    }
    /**
     * Get viewer zoomX
     * @since 0.20.0
     */
    public getZoomX() {
        return this.zoomX;
    }
    /**
     * Get viewer zoom
     * @since 0.20.0
     */
    public getZoomY() {
        return this.zoomY;
    }
    /**
     * get x ranges
     */
    public getRangeX(isZoom?: boolean, isReal?: boolean) {
        return this._getRangeCoord("horizontal", isZoom, isReal);
    }
    /**
     * get y ranges
     */
    public getRangeY(isZoom?: boolean, isReal?: boolean) {
        return this._getRangeCoord("vertical", isZoom, isReal);
    }

    private init() {
        // infinite-viewer(container)
        // viewport
        // children
        const containerElement = this.containerElement;
        const options = this.options;

        // vanilla
        let wrapperElement = options.wrapperElement
            || containerElement.querySelector(`.${WRAPPER_CLASS_NAME}`);
        let scrollAreaElement = options.scrollAreaElement
            || containerElement.querySelector(`.${SCROLL_AREA_CLASS_NAME}`);
        const horizontalScrollElement = options.horizontalScrollElement
            || containerElement.querySelector(`.${HORIZONTAL_SCROLL_BAR_CLASS_NAME}`);
        const verticalScrollElement = options.verticalScrollElement
            || containerElement.querySelector(`.${VERTICAL_SCROLL_BAR_CLASS_NAME}`);

        if (wrapperElement) {
            this.wrapperElement = wrapperElement;
        } else {
            wrapperElement = document.createElement("div");
            wrapperElement.insertBefore(this.viewportElement, null);
            containerElement.insertBefore(wrapperElement, null);

            this.wrapperElement = wrapperElement;
        }

        if (scrollAreaElement) {
            this.scrollAreaElement = scrollAreaElement;
        } else {
            scrollAreaElement = document.createElement("div");

            wrapperElement.insertBefore(scrollAreaElement, wrapperElement.firstChild);

            this.scrollAreaElement = scrollAreaElement;
        }
        addClass(containerElement, CLASS_NAME);
        addClass(wrapperElement, WRAPPER_CLASS_NAME);
        addClass(scrollAreaElement, SCROLL_AREA_CLASS_NAME);

        this.horizontalScrollbar = new ScrollBar("horizontal", horizontalScrollElement);
        this.verticalScrollbar = new ScrollBar("vertical", verticalScrollElement);

        this.horizontalScrollbar.on("scroll", e => {
            this.scrollBy(e.delta / this.zoomX, 0);
        });

        this.verticalScrollbar.on("scroll", e => {
            this.scrollBy(0, e.delta / this.zoomY);
        });

        if (this.horizontalScrollbar.isAppend) {
            containerElement.insertBefore(this.horizontalScrollbar.barElement, null);
        }
        if (this.verticalScrollbar.isAppend) {
            containerElement.insertBefore(this.verticalScrollbar.barElement, null);
        }
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
         * The pinchStart and abortPinch events do not occur when pinching through the wheel.
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
            events: ["touch", "mouse"],
        }).on("dragStart", ({ inputEvent, datas, stop, isMouseEvent }) => {
            if (!this.useMouseDrag && isMouseEvent) {
                stop();
                return;
            }
            this._pauseScrollAnimation();
            this.dragFlag = false;
            const result = this.trigger("dragStart", {
                inputEvent,
            });
            if (result === false) {
                stop();
                return;
            }

            inputEvent.preventDefault();

            datas.startEvent = inputEvent;
        }).on("drag", e => {
            if (!this.options.usePinch || e.isPinch || (this.useMouseDrag && e.isMouseEvent)) {
                this.trigger("drag", {
                    ...e,
                    inputEvent: e.inputEvent,
                });
                measureSpeed(e);
                this.scrollBy(-e.deltaX / this.zoomX, -e.deltaY / this.zoomY);
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
            this._startScrollAnimationBySpeed(e.datas.speed);
        }).on("pinchStart", ({ inputEvent, datas, stop }) => {
            inputEvent.preventDefault();
            this._pauseScrollAnimation();
            datas.startZoom = [this.zoomX, this.zoomY];

            const result = this.trigger("pinchStart", {
                inputEvent,
            });
            if (result === false) {
                stop();
            }
            this._setClientRect();
        }).on("pinch", e => {
            const scale = e.scale;
            const pinchDirection = this.options.pinchDirection;

            this._triggerPinch({
                rotation: e.rotation,
                distance: e.distance,
                scale: e.scale,
                inputEvent: e.inputEvent,
                isWheel: false,
                zoom: e.datas.startZoom * scale,
                zoomX: this.zoomX * (pinchDirection === "vertical" ? 1 : scale),
                zoomY: this.zoomY * (pinchDirection === "horizontal" ? 1 : scale),
                clientX: e.clientX,
                clientY: e.clientY,
                ratioX: 0,
                ratioY: 0,
            });
        }).on("pinchEnd", () => {
            this._tempRect = null;
        });

        addEvent(wrapperElement, "scroll", this._onScroll);

        if (options.useResizeObserver) {
            const observer = new ResizeObserver(() => {
                this.resize();
            });

            observer.observe(this.viewportElement);
            observer.observe(this.containerElement);


            this._onDestroys.push(() => {
                observer.disconnect();
            });
        } else {
            addEvent(window, "resize", this.resize);

            this._onDestroys.push(() => {
                removeEvent(window, "resize", this.resize);
            })
        }

        if (options.useWheelPinch || options.useWheelScroll) {
            addEvent(containerElement, "wheel", this.onWheel, {
                passive: false,
            });
        }
        if (options.useGesture) {
            addEvent(containerElement, "gesturestart", this.onGestureStart, {
                passive: false,
            });
            addEvent(containerElement, "gesturechange", this.onGestureChange, {
                passive: false,
            });
        }
        this.resize();
    }
    private render() {
        const {
            offsetX,
            offsetY,
            zoomX = DEFAULT_OPTIONS.zoomX,
            zoomY = DEFAULT_OPTIONS.zoomY,
            translateZ = 0,
        } = this;
        const {
            useTransform = DEFAULT_OPTIONS.useTransform,
        } = this.options;
        const nextOffsetX = -offsetX * zoomX;
        const nextOffsetY = -offsetY * zoomY;

        this.scrollAreaElement.style.cssText
            = `width:calc(100% + ${this.getScrollAreaWidth()}px);`
            + `height:calc(100% + ${this.getScrollAreaHeight()}px);`;

        const viewportStyle = this.viewportElement.style;

        if (useTransform === false) {
            viewportStyle.cssText += `position: relative; top: ${nextOffsetY}px; left: ${nextOffsetX}px;`;
        } else {
            viewportStyle.cssText += `transform-origin: 0 0;transform:translate3d(${nextOffsetX}px, ${nextOffsetY}px, ${translateZ}px) scale(${zoomX}, ${zoomY});`;
        }
        this.renderScroll();
    }
    private renderScroll() {
        const {
            containerWidth,
            containerHeight,
            zoomX,
            zoomY,
        } = this;
        const scrollLeft = this.getScrollLeft({ range: true }) * zoomX;
        const scrollTop = this.getScrollTop({ range: true }) * zoomY;
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
    private _onScroll = () => {
        const { scrollLeft, scrollTop } = this.wrapperElement;
        const {
            zoom = DEFAULT_OPTIONS.zoom,
        } = this;
        const deltaX = scrollLeft - this.scrollLeft;
        const deltaY = scrollTop - this.scrollTop;
        const viewerScrollLeft = this.getScrollLeft();
        const viewerScrollTop = this.getScrollTop();

        if (this.isLoop) {
            this.isLoop = false;
        }
        this.scrollLeft = scrollLeft;
        this.scrollTop = scrollTop;
        this.scrollTo(
            viewerScrollLeft + deltaX / zoom,
            viewerScrollTop + deltaY / zoom,
        );
    }
    private onWheel = (e: WheelEvent) => {
        const options = this.options;
        const pinchDirection = options.pinchDirection;
        const maxPinchWheel = options.maxPinchWheel || Infinity;

        const isKeydown = e[`${this.wheelPinchKey}Key`] || e.ctrlKey;

        if (options.useWheelPinch && isKeydown) {
            let deltaY = e.deltaY;
            const sign = deltaY >= 0 ? 1 : -1;
            const distance = Math.min(maxPinchWheel, Math.abs(deltaY));


            deltaY = sign * distance;
            const delta = -deltaY;
            const scale = Math.max(1 + delta * (options.wheelScale || 0.01), TINY_NUM);

            clearTimeout(this._tempRectTimer);
            this._tempRectTimer = window.setTimeout(() => {
                this._tempRect = null;
            }, 100);
            this._triggerPinch({
                distance,
                scale,
                rotation: 0,
                zoom: this.zoom * scale,
                zoomX: this.zoomX * (pinchDirection === "vertical" ? 1 : scale),
                zoomY: this.zoomY * (pinchDirection === "horizontal" ? 1 : scale),
                inputEvent: e,
                isWheel: true,
                clientX: e.clientX,
                clientY: e.clientY,
                ratioX: 0,
                ratioY: 0,
            });
        } else if (options.useWheelScroll) {
            let deltaX = e.deltaX;
            let deltaY = e.deltaY;

            if (e.shiftKey && !deltaX) {
                deltaX = deltaY;
                deltaY = 0;
            }
            this.scrollBy(deltaX / this.zoomX, deltaY / this.zoomY);
        } else {
            return;
        }
        e.preventDefault();
    }
    private onGestureStart = (e: any) => {
        this._tempScale = [this.zoomX, this.zoomY];
        this._setClientRect();
        e.preventDefault();
    }
    private onGestureChange = (e: any) => {
        e.preventDefault();
        if (this.gesto.isFlag() || !this._tempScale) {
            this._tempScale =  [1, 1];
            return;
        }
        const scale = e.scale;
        const zoomX = this._tempScale[0];
        const zoomY = this._tempScale[1];
        const pinchDirection = this.options.pinchDirection;

        this._triggerPinch({
            distance: 0,
            scale,
            rotation: e.rotation,
            inputEvent: e,
            isWheel: true,
            zoom: (zoomX + zoomY) * scale / 2,
            zoomX: zoomX * (pinchDirection === "vertical" ? 1 : scale),
            zoomY: zoomY * (pinchDirection === "horizontal" ? 1 : scale),
            clientX: e.clientX,
            clientY: e.clientY,
            ratioX: 0,
            ratioY: 0,
        });
    }
    private onGestureEnd = () => {

    }
    private _startZoomAnimation(dest: number[], options: ZoomOptions) {
        if (!dest) {
            return;
        }
        const duration = options.duration;
        const easing = options.easing || DEFAULT_EASING;

        startAnimation(
            distRatio => this._setZoom(
                [
                    this.zoomX + dest[0] * distRatio,
                    this.zoomY + dest[1] * distRatio,
                ],
                options.zoomBase,
            ),
            next => {
                this._zoomTimer = requestAnimationFrame(next);
            },
            {
                easing,
                duration,
            },
        );
    }
    private _startScrollAnimation(dest: number[], options: AnimationOptions) {
        if (!dest[0] && !dest[1]) {
            return;
        }
        const duration = options.duration;
        const easing = options.easing || DEFAULT_EASING;

        startAnimation(
            distRatio => this._scrollBy(
                dest[0] * distRatio,
                dest[1] * distRatio,
                options,
            ),
            next => {
                this._scrollTimer = requestAnimationFrame(next);
            },
            {
                easing,
                duration,
            },
        );
    }
    private _startScrollAnimationBySpeed(speed: number[]) {
        if (!speed || (!speed[0] && !speed[1])) {
            return;
        }
        const a = -0.0006;
        const duration = getDuration(speed, a);
        const destPos = getDestPos(speed, a);

        return this._startScrollAnimation(destPos, {
            duration,
        })

    }
    private _pauseScrollAnimation() {
        cancelAnimationFrame(this._scrollTimer);
        this._scrollTimer = 0;
    }
    private _pauseZoomAnimation() {
        cancelAnimationFrame(this._zoomTimer);
        this._zoomTimer = 0;
    }
    private getScrollAreaWidth() {
        const [min, max] = this.getRangeX(true);
        return min || max ? this.margin * 2 : 0;
    }
    private getScrollAreaHeight() {
        const [min, max] = this.getRangeY(true);
        return min || max ? this.margin * 2 : 0;
    }
    private _triggerPinch(event: OnPinch) {
        const {
            clientX,
            clientY,
            zoomX,
            zoomY,
        } = event;
        if (this.useAutoZoom) {
            this._zoomByClient([zoomX, zoomY], clientX, clientY);
        }
        if (!this._tempRect) {
            this._setClientRect();
        }
        const zoomRange = this.zoomRange;
        const {
            left,
            top,
            width,
            height,
        } = this._tempRect;
        const ratioX = (clientX - left) / width * 100;
        const ratioY = (clientY - top) / height * 100;

        this.trigger("pinch", {
            ...event,
            zoom: between((zoomX + zoomY) / 2, zoomRange[0], zoomRange[1]),
            zoomX: between(zoomX, zoomRange[0], zoomRange[1]),
            zoomY: between(zoomY, zoomRange[0], zoomRange[1]),
            ratioX,
            ratioY,
        });
    }
    private _setClientRect() {
        const rect = this.getContainer().getBoundingClientRect();
        this._tempRect = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
        };
    }
    private _zoomByClient(zoom: number[], clientX: number, clientY: number) {
        if (!this._tempRect) {
            this._setClientRect();
        }
        const {
            left,
            top,
            width,
            height,
        } = this._tempRect;
        const options = this.options;;

        const originalZoomOffsetX = options.zoomOffsetX;
        const originalZoomOffsetY = options.zoomOffsetY;

        options.zoomOffsetX = `${(clientX - left) / width * 100}%`;
        options.zoomOffsetY = `${(clientY - top) / height * 100}%`;

        this._setZoom(zoom, "screen");

        options.zoomOffsetX = originalZoomOffsetX;
        options.zoomOffsetY = originalZoomOffsetY;
    }
    private _setZoom(
        zoom: number | number[],
        zoomBase?: "screen" | "viewport",
    ) {
        const {
            containerWidth,
            containerHeight,
            zoomX: prevZoomX,
            zoomY: prevZoomY,
            zoomRange
        } = this;
        let {
            zoomOffsetX = DEFAULT_OPTIONS.zoomOffsetX,
            zoomOffsetY = DEFAULT_OPTIONS.zoomOffsetY,
        } = this;


        const scrollLeft = this.getScrollLeft();
        const scrollTop = this.getScrollTop();

        const [zoomX, zoomY] = isArray(zoom) ? zoom : [zoom, zoom];
        const nextZoomX = between(zoomX, zoomRange[0], zoomRange[1]);
        const nextZoomY = between(zoomY, zoomRange[0], zoomRange[1]);
        const options = this.options;

        options.zoomX = nextZoomX;
        options.zoomY = nextZoomY;
        options.zoom = (nextZoomX + nextZoomY) / 2;

        const nextScrollLeft = this.getScrollLeft();
        const nextScrollTop = this.getScrollTop();


        let zoomXPos = 0;
        let zoomYPos = 0;

        if (zoomBase === "viewport") {
            zoomXPos = (-scrollLeft + convertUnitSize(`${zoomOffsetX}`, this.viewportWidth)) * prevZoomX;
            zoomYPos = (-scrollTop + convertUnitSize(`${zoomOffsetY}`, this.viewportHeight)) * prevZoomY;
        } else {
            zoomXPos = convertUnitSize(`${zoomOffsetX}`, containerWidth);
            zoomYPos = convertUnitSize(`${zoomOffsetY}`, containerHeight);
        }

        const centerX = scrollLeft + zoomXPos / prevZoomX;
        const centerY = scrollTop + zoomYPos / prevZoomY;

        const nextCenterX = nextScrollLeft + zoomXPos / nextZoomX;
        const nextCenterY = nextScrollTop + zoomYPos / nextZoomY;

        this._scrollBy(centerX - nextCenterX, centerY - nextCenterY);
        this.render();
    }
    private _scrollBy(deltaX: number, deltaY: number, options?: ScrollOptions) {
        let scrollLeft = this.getScrollLeft();
        let scrollTop = this.getScrollTop();

        if (options?.absolute) {
            scrollLeft *= this.zoomX;
            scrollTop *= this.zoomY;
        }
        return this._scrollTo(scrollLeft + deltaX, scrollTop + deltaY, options);
    }
    private _scrollTo(x: number, y: number, options?: ScrollOptions) {
        const {
            scrollLeft: prevScrollLeft,
            scrollTop: prevScrollTop,
        } = this;

        const isAbsolute = options?.absolute;
        this._scrollToType("horizontal", x, isAbsolute);
        this._scrollToType("vertical", y, isAbsolute);

        const scrollLeft = this.scrollLeft;
        const scrollTop = this.scrollTop;
        this.render();
        const nextScrollAbsoluteLeft = this.getScrollLeft();
        const nextScrollAbsoluteTop = this.getScrollTop();

        this._emitScrollEvent(nextScrollAbsoluteLeft, nextScrollAbsoluteTop);

        if (Math.round(prevScrollLeft) !== scrollLeft || Math.round(prevScrollTop) !== scrollTop) {
            this.isLoop = true;
            this.move(scrollLeft, scrollTop);
            requestAnimationFrame(() => {
                if (!this.isLoop) {
                    return;
                }
                this.isLoop = false;
                const {
                    scrollLeft: requestScrollLeft,
                    scrollTop: requestScrollTop,
                } = this.wrapperElement;

                this.scrollLeft = requestScrollLeft;
                this.scrollTop = requestScrollTop;

                if (
                    scrollLeft !== Math.round(requestScrollLeft)
                    || scrollTop !== Math.round(requestScrollTop)
                ) {
                    this._scrollTo(nextScrollAbsoluteLeft, nextScrollAbsoluteTop);
                }
            });
            return false;
        }
        return true;
    }
    private _scrollToType(type: "horizontal" | "vertical", coord: number, isAbsolute?: boolean) {
        const names = NAMES[type];
        const {
            margin = DEFAULT_OPTIONS.margin,
            threshold = DEFAULT_OPTIONS.threshold,
        } = this;
        const prevScrollPos = this[`scroll${names.pos}`];
        const [minCoord, maxCoord] = this[`getRange${names.coord}`](true, true);

        let scrollPos = Math.round(prevScrollPos);

        const scrollAreaSize = this[`getScrollArea${names.size}`]();
        const zoom = this[`zoom${names.coord}`];

        if (isAbsolute) {
            coord = coord / zoom;
        }
        const zoomCoord = coord * zoom;

        if (minCoord === maxCoord) {
            scrollPos = minCoord;
            coord = minCoord / zoom;
        } else if (zoomCoord - threshold <= minCoord) {
            const minThreshold = Math.max(0, zoomCoord - minCoord);

            scrollPos = minThreshold;
            coord = (minCoord + minThreshold) / zoom;
        } else if (zoomCoord + threshold >= maxCoord) {
            const maxThreshold = Math.max(0, maxCoord - zoomCoord);

            scrollPos = scrollAreaSize - maxThreshold;
            coord = (maxCoord - maxThreshold) / zoom;
        } else if (scrollPos < threshold) {
            scrollPos += margin;
        } else if (scrollPos > scrollAreaSize - threshold) {
            scrollPos -= margin;
        }

        scrollPos = Math.round(scrollPos);

        this[`scroll${names.pos}`] = scrollPos;
        this[`offset${names.coord}`] = coord - scrollPos / zoom;
    }
    private _getRangeCoord(type: "vertical" | "horizontal", isZoom?: boolean, isReal?: boolean) {
        const {
            margin = DEFAULT_OPTIONS.margin,
            threshold,
        } = this;

        const names = NAMES[type];
        const rangeCoord = checkDefault(this[`range${names.coord}`], DEFAULT_OPTIONS[`range${names.coord}`]);
        const rangeOffsetCoord = checkDefault(this[`rangeOffset${names.coord}`], DEFAULT_OPTIONS[`rangeOffset${names.coord}`]);
        const zoom = this[`zoom${names.coord}`];
        const range = getRange(
            this[`getScroll${names.pos}`](),
            margin,
            rangeCoord,
            threshold,
            isReal,
        );

        if (!isZoom) {
            return [range[0] + rangeOffsetCoord[0], range[1] + rangeOffsetCoord[1]];
        }
        return [
            range[0] * zoom + rangeOffsetCoord[0],
            Math.max(this[`viewport${names.size}`] * zoom - this[`container${names.size}`], range[1] * zoom + rangeOffsetCoord[1]),
        ];
    }
    private _emitScrollEvent(scrollLeft: number, scrollTop: number) {
        const prevScrollLeft = this._asLeft;
        const prevScrollTop = this._asTop;

        if (prevScrollLeft === scrollLeft && prevScrollTop === scrollTop) {
            return;
        }
        this._asLeft = scrollLeft;
        this._asTop = scrollTop;

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
            scrollLeft,
            scrollTop,
        });
    }
}

interface InfiniteViewer extends InfiniteViewerProperties { }

export default InfiniteViewer;
