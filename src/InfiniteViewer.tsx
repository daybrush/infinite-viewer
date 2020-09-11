import Component from "@egjs/component";
import Gesto from "gesto";
import { InjectResult } from "css-styled";
import { Properties } from "framework-utils";
import { camelize, IObject, addEvent, removeEvent, addClass } from "@daybrush/utils";
import { InfiniteViewerOptions, InfiniteViewerProperties, InfiniteViewerEvents } from "./types";
import { PROPERTIES, injector, CLASS_NAME, TINY_NUM, IS_SAFARI, DEFAULT_OPTIONS, PREFIX } from "./consts";
import { measureSpeed, getDuration, getDestPos, minmax, abs } from "./utils";
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
    private loopX = 0;
    private loopY = 0;
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
        return (this.scrollTop + this.loopY * this.margin - this.offsetY
            + (isAbsolute ? abs(this.rangeY[0]) * this.margin : 0)) / this.zoom;
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     * @param - Get absolute left position
     */
    public getScrollLeft(isAbsolute?: boolean) {
        return (this.scrollLeft + this.loopX * this.margin - this.offsetX
            + (isAbsolute ? abs(this.rangeX[0]) * this.margin : 0)) / this.zoom;
    }
    /**
     * Gets measurement of the width of an element's content with overflow
     * scrollWidth = container width + margin * (abs(range[1]) + abs(range[0]))
     */
    public getScrollWidth() {
        return this.containerWidth + this.margin * (abs(this.rangeX[1]) + abs(this.rangeX[0]));
    }
    /**
     * Gets measurement of the height of an element's content with overflow
     * scrollHeight = container height + margin * (abs(range[1]) + abs(range[0]))
     */
    public getScrollHeight() {
        return this.containerHeight + this.margin * (abs(this.rangeY[1]) + abs(this.rangeY[0]));
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
        const zoom = this.zoom;
        return this.scrollTo(this.getScrollLeft() * zoom + deltaX, this.getScrollTop() * zoom + deltaY);
    }
    /**
     * Scrolls the container to set of coordinates.
     * @param scrollLeft
     * @param scrollTop
     */
    public scrollTo(scrollLeft: number, scrollTop: number) {
        const {
            rangeX = DEFAULT_OPTIONS.rangeX,
            rangeY = DEFAULT_OPTIONS.rangeY,
            margin = DEFAULT_OPTIONS.margin,
        } = this;

        this.loopX = minmax(Math.floor((margin + scrollLeft) / margin), rangeX[0], rangeX[1]);
        this.loopY = minmax(Math.floor((margin + scrollTop) / margin), rangeY[0], rangeY[1]);
        this.offsetX = this.loopX * margin - scrollLeft + this.scrollLeft;
        this.offsetY = this.loopY * margin - scrollTop + this.scrollTop;

        const limitX1 = this.rangeX[0] * margin;
        const limitX2 = this.rangeX[1] * margin;
        const limitY1 = this.rangeY[0] * margin;
        const limitY2 = this.rangeY[1] * margin;
        let moveX = 0;
        let moveY = 0;

        if (this.offsetX > -limitX1) {
            moveX = this.offsetX + limitX1;
            this.offsetX = -limitX1;
        } else if (this.offsetX < -limitX2) {
            moveX = this.offsetX + limitX2;
            this.offsetX = -limitX2;
        }
        if (this.offsetY > -limitY1) {
            moveY = this.offsetY + limitY1;
            this.offsetY = -limitY1;
        } else if (this.offsetY < -limitY2) {
            moveY = this.offsetY + limitY2;
            this.offsetY = -limitY2;
        }

        const marginX = (rangeX[0] ? 1 : 0) + (rangeX[1] ? 1 : 0);
        const marginY = (rangeY[0] ? 1 : 0) + (rangeY[1] ? 1 : 0);

        moveX = minmax(this.scrollLeft - moveX, 0, marginX * margin);
        moveY = minmax(this.scrollTop - moveY, 0, marginY * margin);
        if (moveX !== this.scrollLeft || moveY !== this.scrollTop) {
            this.move(moveX, moveY);
            return;
        } else {
            this.render();
        }
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
            scrollLeft: this.getScrollLeft(),
            scrollTop: this.getScrollTop(),
        });
        return this;
    }
    public setZoom(zoom: number) {
        const offsetWidth = this.viewportWidth;
        const offsetHeight = this.viewportHeight;
        const offsetZoom = (zoom - this.zoom);

        this.options.zoom = zoom;

        this.scrollBy(offsetWidth * offsetZoom / 2, offsetHeight * offsetZoom / 2);
        this.render();
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
            this.scrollBy(e.delta, 0);
        });

        this.verticalScrollbar.on("scroll", e => {
            this.scrollBy(0, e.delta);
        });

        if (this.horizontalScrollbar.isAppend) {
            containerElement.insertBefore(this.horizontalScrollbar.getBar(), null);
        }
        if (this.verticalScrollbar.isAppend) {
            containerElement.insertBefore(this.verticalScrollbar.getBar(), null);
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
                this.scrollBy(-e.deltaX, -e.deltaY);
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
            loopX,
            loopY,
            offsetX,
            offsetY,
            margin = DEFAULT_OPTIONS.margin,
            rangeX = DEFAULT_OPTIONS.rangeX,
            rangeY = DEFAULT_OPTIONS.rangeY,
            zoom = DEFAULT_OPTIONS.zoom,
        } = this;
        const marginX = (rangeX[0] ? 1 : 0) + (rangeX[1] ? 1 : 0);
        const marginY = (rangeY[0] ? 1 : 0) + (rangeY[1] ? 1 : 0);
        const nextOffsetX = -loopX * margin + offsetX;
        const nextOffsetY = -loopY * margin + offsetY;

        this.scrollAreaElement.style.cssText
            = `width:calc(100% + ${margin * marginX}px);height:calc(100% + ${margin * marginY}px);`;
        this.viewportElement.style.cssText += `transform-origin: 0 0;transform:translate(${nextOffsetX}px, ${nextOffsetY}px) scale(${zoom});`;
        this.renderScroll();
    }
    private renderScroll() {
        const {
            margin = DEFAULT_OPTIONS.margin,
            rangeX = DEFAULT_OPTIONS.rangeX,
            rangeY = DEFAULT_OPTIONS.rangeY,
            zoom = DEFAULT_OPTIONS.zoom,
            loopX,
            loopY,
            containerWidth,
            containerHeight,
        } = this;

        const minX = abs(isFinite(rangeX[0]) ? rangeX[0] : Math.min(loopX - 1, -1)) * margin;
        const minY = abs(isFinite(rangeY[0]) ? rangeY[0] : Math.min(loopY - 1, -1)) * margin;
        const maxX = Math.max(
            abs(isFinite(rangeX[1]) ? rangeX[1] : Math.max(loopX + 1, 1)) * margin,
            this.viewportWidth * zoom - containerWidth,
        );
        const maxY = Math.max(
            abs(isFinite(rangeY[1]) ? rangeY[1] : Math.max(loopY + 1, 1)) * margin,
            this.viewportHeight * zoom - containerHeight,
        );
        const scrollLeft = this.getScrollLeft();
        const scrollTop = this.getScrollTop();

        this.horizontalScrollbar.render(
            this.displayHorizontalScroll,
            scrollLeft * this.zoom, minX, maxX,
            containerWidth,
        );
        this.verticalScrollbar.render(
            this.displayVerticalScroll,
            scrollTop * this.zoom, minY, maxY,
            containerHeight,
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
            margin = 0,
            threshold = 0,
            loopX,
            loopY,
            rangeX = [0, 0],
            rangeY = [0, 0],
        } = this;
        const endThresholdX = ((rangeX[0] ? 1 : 0) + (rangeX[1] ? 1 : 0)) * margin - threshold;
        const endThresholdY = ((rangeY[0] ? 1 : 0) + (rangeY[1] ? 1 : 0)) * margin - threshold;
        let nextLoopX = loopX;
        let nextLoopY = loopY;

        let nextScrollLeft = scrollLeft;
        let nextScrollTop = scrollTop;

        if (scrollLeft < threshold && rangeX[0]) {
            if (nextLoopX > rangeX[0] + 1) {
                nextScrollLeft = scrollLeft + margin;
                --nextLoopX;
            }
        } else if (scrollLeft > endThresholdX && rangeX[1]) {
            if (nextLoopX < rangeX[1] - 1) {
                nextScrollLeft = scrollLeft - margin;
                ++nextLoopX;
            }
        }
        if (scrollTop < threshold && rangeY[0]) {
            if (nextLoopY > rangeY[0] + 1) {
                nextScrollTop = scrollTop + margin;
                --nextLoopY;
            }
        } else if (scrollTop > endThresholdY && rangeY[1]) {
            if (nextLoopY < rangeY[1] - 1) {
                nextScrollTop = scrollTop - margin;
                ++nextLoopY;
            }
        }
        const isChangeScroll = this.scrollLeft !== nextScrollLeft || this.scrollTop !== nextScrollTop;
        const isChangeLoop = loopX !== nextLoopX || loopY !== nextLoopY;

        this.scrollLeft = nextScrollLeft;
        this.scrollTop = nextScrollTop;
        this.loopX = nextLoopX;
        this.loopY = nextLoopY;

        this.render();

        if (isChangeLoop || isChangeScroll) {
            this.trigger("scroll", {
                scrollLeft: this.getScrollLeft(),
                scrollTop: this.getScrollTop(),
            });
        }

        if (isChangeScroll) {
            this.move(nextScrollLeft, nextScrollTop);
        }
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
            this.scrollBy(e.deltaX, e.deltaY);
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
}

interface InfiniteViewer extends Component, InfiniteViewerProperties {
    // tslint:disable-next-line: max-line-length
    on<T extends keyof InfiniteViewerEvents>(eventName: T, handlerToAttach: (event: InfiniteViewerEvents[T]) => any): this;
    on(eventName: string, handlerToAttach: (event: { [key: string]: any }) => any): this;
    on(events: { [key: string]: (event: { [key: string]: any }) => any }): this;
}

export default InfiniteViewer;
