import Component from "@egjs/component";
import Dragger from "@daybrush/drag";
import { InjectResult } from "css-styled";
import { Properties } from "framework-utils";
import { camelize, IObject, addEvent, removeEvent, addClass } from "@daybrush/utils";
import { InfiniteViewerOptions, InfiniteViewerProperties, InfiniteViewerEvents } from "./types";
import { PROPERTIES, injector, CLASS_NAME } from "./consts";
import { measureSpeed, getDuration, getDestPos, minmax } from "./utils";

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
        attributes.set = function(value) {
            this[setter](value);
        };
    } else {
        attributes.set = function(value) {
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
    private scrollArea!: HTMLElement;
    private dragger!: Dragger;
    private loopX = 0;
    private loopY = 0;
    private offsetX = 0;
    private offsetY = 0;
    private scrollLeft = 0;
    private scrollTop = 0;
    private timer = 0;
    private dragFlag = false;
    /**
     * @sort 1
     */
    constructor(
        private container: HTMLElement,
        private viewport: HTMLElement,
        options: Partial<InfiniteViewerOptions> = {},
    ) {
        super();
        this.options = {
            margin: 500,
            threshold: 100,
            zoom: 1,
            rangeX: [-Infinity, Infinity],
            rangeY: [-Infinity, Infinity],
            scrollArea: null,
            usePinch: false,
            pinchThreshold: 30,
            cspNonce: "",
            ...options,
        };
        this.scrollArea = this.options.scrollArea;
        this.init();
    }
    /**
     * Get Container Element
     */
    public getContainer(): HTMLElement {
        return this.container;
    }
    /**
     * Get Viewport Element
     */
    public getViewport(): HTMLElement {
        return this.viewport;
    }
    /**
     * Destroy elements, properties, and events.
     */
    public destroy(): void {
        this.off();
        this.dragger.unset();
        this.injectResult.destroy();
        removeEvent(this.container, "scroll", this.onScroll);

        this.dragger = null;
        this.injectResult = null;
        this.container = null;
        this.options = null;
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     * @param - Get absolute top position
     */
    public getScrollTop(isAbsolute?: boolean) {
        return (this.scrollTop + (this.loopY - 1) * this.margin - this.offsetY
            + (isAbsolute ? (-this.rangeY[0] + 1) * this.margin : 0)) / this.zoom;
    }
    /**
     * Gets the number of pixels that an element's content is scrolled vertically.
     * @param - Get absolute left position
     */
    public getScrollLeft(isAbsolute?: boolean) {
        return (this.scrollLeft + (this.loopX - 1) * this.margin - this.offsetX
            + (isAbsolute ? (-this.rangeX[0] + 1) * this.margin : 0)) / this.zoom;
    }
    /**
     * Gets measurement of the width of an element's content with overflow
     */
    public getScrollWidth() {
        return this.container.offsetWidth + this.margin * (this.rangeX[1] - this.rangeX[0] + 2);
    }
    /**
     * Gets measurement of the height of an element's content with overflow
     */
    public getScrollHeight() {
        return this.container.offsetHeight + this.margin * (this.rangeY[1] - this.rangeY[0] + 2);
    }

    /**
     * Scroll the element to the center
     */
    public scrollCenter() {
        const {
            offsetWidth: containerWidth,
            offsetHeight: containerHeight,
        } = this.container;
        const {
            offsetWidth: viewportWidth,
            offsetHeight: viewportHeight,
        } = this.viewport;
        const zoom = this.zoom;
        const left = -(containerWidth - viewportWidth * zoom) / 2;
        const top = -(containerHeight - viewportHeight * zoom) / 2;

        return this.scrollTo(left, top);
    }
    /**
     * Scrolls the container by the given amount.
     * @param deltaX
     * @param deltaY
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
            rangeX = [0, 0],
            rangeY = [0, 0],
            margin = 0,
        } = this;

        this.loopX = minmax(Math.floor((margin + scrollLeft) / margin), rangeX[0], rangeX[1]);
        this.loopY = minmax(Math.floor((margin + scrollTop) / margin), rangeY[0], rangeY[1]);
        this.offsetX = (this.loopX - 1) * margin - scrollLeft + this.scrollLeft;
        this.offsetY = (this.loopY - 1) * margin - scrollTop + this.scrollTop;

        this.render();
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
        const viewport = this.viewport;
        const offsetWidth = viewport.offsetWidth;
        const offsetHeight = viewport.offsetHeight;
        const offsetZoom = (zoom - this.zoom);

        this.options.zoom = zoom;

        this.scrollBy(offsetWidth * offsetZoom / 2, offsetHeight * offsetZoom / 2);
        this.render();
    }
    private init() {
        // infinite-viewer(container)
        // viewport
        // children
        const container = this.container;

        addClass(container, CLASS_NAME);

        // vanilla
        if (!this.scrollArea) {
            this.scrollArea = document.createElement("div");

            const scrollArea = this.scrollArea;

            scrollArea.style.cssText += `position:absolute;top:0;left:0;`;
            container.insertBefore(scrollArea, container.firstChild);
        }
        this.injectResult = injector.inject(container, {
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
        this.dragger = new Dragger(container, {
            container: document.body,
            events: ["touch"],
            dragstart: ({ inputEvent, datas }) => {
                inputEvent.preventDefault();
                this.pauseAnimation();
                this.dragFlag = false;

                datas.startEvent = inputEvent;
                return this.trigger("dragStart", {
                    inputEvent,
                });
            },
            drag: e => {
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
            },
            dragend: e => {
                this.trigger("dragEnd", {
                    isDrag: e.isDrag,
                    isDouble: e.isDouble,
                    inputEvent: e.inputEvent,
                });
                this.startAnimation(e.datas.speed);
            },
            pinchstart: ({ inputEvent, datas }) => {
                inputEvent.preventDefault();
                this.pauseAnimation();
                datas.startZoom = this.zoom;
            },
            pinch: e => {
                // e.distance;
                // e.scale
                this.trigger("pinch", {
                    distance: e.distance,
                    scale: e.scale,
                    zoom: e.datas.startZoom * e.scale,
                    inputEvent: e.inputEvent,
                });
            },
        });
        const margin = this.margin;

        addEvent(container, "scroll", this.onScroll);
        this.render();
        this.move(margin, margin);
    }
    private render() {
        const {
            margin = 0,
            loopX,
            loopY,
            offsetX,
            offsetY,
            zoom = 1,
        } = this;
        const size = `calc(100% + ${margin * 2}px)`;
        const nextOffsetX = (1 - loopX) * margin + offsetX;
        const nextOffsetY = (1 - loopY) * margin + offsetY;

        this.scrollArea.style.cssText += `position:absolute;top:0;left:0;width:${size};height:${size};`;
        this.viewport.style.cssText = `transform-origin: 0 0;transform:translate(${nextOffsetX}px, ${nextOffsetY}px) scale(${zoom});`;
    }
    private move(scrollLeft: number, scrollTop: number) {
        const container = this.container;

        container.scrollLeft = scrollLeft;
        container.scrollTop = scrollTop;
    }
    private onScroll = () => {
        const container = this.container;
        const { scrollLeft, scrollTop } = container;
        const {
            margin = 0,
            threshold = 0,
            loopX,
            loopY,
            rangeX = [0, 0],
            rangeY = [0, 0],
        } = this;
        const endThreshold = margin * 2 - threshold;
        let nextLoopX = loopX;
        let nextLoopY = loopY;

        let nextScrollLeft = scrollLeft;
        let nextScrollTop = scrollTop;

        if (scrollLeft < threshold) {
            if (nextLoopX > rangeX[0]) {
                nextScrollLeft = scrollLeft + margin;
                --nextLoopX;
            }
        } else if (scrollLeft > endThreshold) {
            if (nextLoopX < rangeX[1]) {
                nextScrollLeft = scrollLeft - margin;
                ++nextLoopX;
            }
        }
        if (scrollTop < threshold) {
            if (nextLoopY > rangeY[0]) {
                nextScrollTop = scrollTop + margin;
                --nextLoopY;
            }
        } else if (scrollTop > endThreshold) {
            if (nextLoopY < rangeY[1]) {
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
