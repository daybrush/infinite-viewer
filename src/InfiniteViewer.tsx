import Component from "@egjs/component";
import Dragger from "@daybrush/drag";
import { InjectResult } from "css-styled";
import { Properties } from "framework-utils";
import {  camelize, IObject, addEvent, removeEvent, addClass } from "@daybrush/utils";
import { InfiniteViewerOptions, InfiniteViewerProperties, InfiniteViewerEvents } from "./types";
import { PROPERTIES, injector, CLASS_NAME } from "./consts";
import { measureSpeed, getDuration, getDestPos } from "./utils";

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
    /**
     *
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
            scrollArea: null,
            ...options,
        };
        this.init();
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
    public getScrollTop() {
        return this.scrollTop + (this.loopY - 1) * this.margin - this.offsetY;
    }
    public getScrollLeft() {
        return this.scrollLeft + (this.loopX - 1) * this.margin - this.offsetX;
    }
    public scrollBy(deltaX: number, deltaY: number) {

        this.scrollTo(this.getScrollLeft() + deltaX, this.getScrollTop() + deltaY);
    }
    public scrollTo(scrollLeft: number, scrollTop: number) {
        const margin = this.margin;

        this.loopX = Math.floor((margin + scrollLeft) / margin);
        this.loopY = Math.floor((margin + scrollTop) / margin);
        this.offsetX = (this.loopX - 1) * margin - scrollLeft + this.scrollLeft;
        this.offsetY = (this.loopY - 1) * margin - scrollTop + this.scrollTop;

        this.render();
        this.trigger("scroll");
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

            scrollArea.style.cssText = `position:absolute;top:0;left:0;width:calc(100% + 400px);height:calc(100% + 400px);`;
            container.insertBefore(scrollArea, container.firstChild);
        }

        this.injectResult = injector.inject(container);

        this.dragger = new Dragger(container, {
            container: document.body,
            events: ["touch"],
            dragstart: ({ inputEvent }) => {
                inputEvent.preventDefault();
                this.pauseAnimation();
            },
            drag: e => {
                measureSpeed(e);
                this.scrollBy(-e.deltaX, -e.deltaY);
            },
            dragend: e => {
                this.startAnimation(e.datas.speed);
            },
        });
        const margin = this.margin;

        addEvent(container, "scroll", this.onScroll);
        this.render();
        this.move(margin, margin);
    }
    private render() {
        const {
            margin,
            loopX,
            loopY,
            offsetX,
            offsetY,
            zoom,
        } = this;
        const size = `calc(100% + ${margin * 2}px)`;
        const nextOffsetX = (1 - loopX) * margin + offsetX;
        const nextOffsetY = (1 - loopY) * margin + offsetY;

        this.scrollArea.style.cssText += `width:${size};height:${size};`;
        this.viewport.style.transform = `translate(${nextOffsetX}px, ${nextOffsetY}px) scale(${zoom})`;
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
            margin,
            threshold,
            loopX,
            loopY, } = this;
        const endThreshold = margin * 2 - threshold;
        let nextLoopX = loopX;
        let nextLoopY = loopY;

        let nextScrollLeft = scrollLeft;
        let nextScrollTop = scrollTop;

        if (scrollLeft < threshold) {
            nextScrollLeft = scrollLeft + margin;
            --nextLoopX;
        } else if (scrollLeft > endThreshold) {
            nextScrollLeft = scrollLeft - margin;
            ++nextLoopX;
        }
        if (scrollTop < threshold) {
            nextScrollTop = scrollTop + margin;
            --nextLoopY;
        } else if (scrollTop > endThreshold) {
            nextScrollTop = scrollTop - margin;
            ++nextLoopY;
        }
        this.scrollLeft = nextScrollLeft;
        this.scrollTop = nextScrollTop;
        this.loopX = nextLoopX;
        this.loopY = nextLoopY;

        this.render();
        this.trigger("scroll");

        if (scrollLeft !== nextScrollLeft || scrollTop !== nextScrollTop) {
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
