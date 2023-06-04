import Gesto, { OnDrag, OnDragStart } from "gesto";
import {
    SCROLL_BAR_CLASS_NAME, SCROLL_THUMB_CLASS_NAME,
    HORIZONTAL_SCROLL_BAR_CLASS_NAME, VERTICAL_SCROLL_BAR_CLASS_NAME
} from "./consts";
import { addClass, removeEvent, addEvent, throttle, getDocument, getWindow } from "@daybrush/utils";
import EventEmitter from "@scena/event-emitter";
import { abs } from "./utils";

export default class ScrollBar extends EventEmitter {
    public isAppend: boolean = false;
    public thumbElement!: HTMLElement;
    public barElement!: HTMLElement;
    protected gesto!: Gesto;
    protected size: number = 0;
    protected scrollSize: number = 0;
    protected isHorizontal = false;

    constructor(
        containerElement: HTMLElement,
        public type: "horizontal" | "vertical",
        container?: HTMLElement,
    ) {
        super();
        const isHorizontal = type === "horizontal";
        const doc = getDocument(containerElement);

        let thumbElement: HTMLElement;
        let barElement: HTMLElement = container;

        if (!container) {
            barElement = doc.createElement("div");
            thumbElement = doc.createElement("div");

            barElement.insertBefore(thumbElement, null);
            this.isAppend = true;
        } else {
            thumbElement = container.querySelector(`.${SCROLL_THUMB_CLASS_NAME}`);
        }
        addClass(
            barElement,
            isHorizontal ? HORIZONTAL_SCROLL_BAR_CLASS_NAME
                : VERTICAL_SCROLL_BAR_CLASS_NAME,
        );
        addClass(barElement, SCROLL_BAR_CLASS_NAME);
        addClass(thumbElement, SCROLL_THUMB_CLASS_NAME);

        this.thumbElement = thumbElement;
        this.barElement = barElement;
        this.isHorizontal = isHorizontal;
        this.gesto = new Gesto(barElement, {
            container: getWindow(doc),
        }).on(
            "dragStart",
            e => this._onDragStart(e),
        ).on(
            "drag",
            e => this._onDrag(e),
        );
        addEvent(this.barElement, "wheel", this._onWheel, {
            passive: false,
        });
    }
    public scrollBy(delta: number, isAbsolute?: boolean) {
        const ratio = delta / this.size;

        this.trigger("scroll", {
            delta: isAbsolute ? delta : this.scrollSize * ratio,
        });
    }
    public render(
        isDisplay: boolean,
        pos: number,
        size: number,
        scrollSize: number,
    ) {
        this.size = size;
        this.scrollSize = scrollSize;

        const opacity = isDisplay && (throttle(scrollSize - size, 0.001) > 0) ? 1 : 0;
        const [dirName1, sizeName] = this.isHorizontal ? ["X", "width"] : ["Y", "height"];
        const sizeP = size / scrollSize * 100;
        const posP = Math.max(0, pos) / scrollSize * 100;

        this.thumbElement.style.cssText
            += `${sizeName}: ${sizeP}%;opacity: ${opacity};`
            + `transform: translate${dirName1}(${100 / sizeP * posP}%)`;
    }
    public destroy() {
        removeEvent(this.barElement, "wheel", this._onWheel);
        this.gesto.off();
        this.off();
    }
    protected _onDragStart = (e: OnDragStart<Gesto>) => {
        const isHorizontal = this.isHorizontal;
        const target = e.inputEvent.target;
        const datas = e.datas;
        const isThumb = this.thumbElement === target;

        if (!isThumb) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    const thumbRect = this.thumbElement.getBoundingClientRect();
                    const pos1 = thumbRect[isHorizontal ? "left" : "top"];
                    const thumbSize = thumbRect[isHorizontal ? "width" : "height"];
                    const pos2 = pos1 + thumbSize;
                    const clientPos = e[isHorizontal ? "clientX" : "clientY"];

                    if (pos1 <= clientPos && clientPos <= pos2) {
                        return;
                    }
                    const size = this.size;
                    const delta = size * size / this.scrollSize;

                    this.scrollBy(pos1 < clientPos ? delta : -delta);
                });
            }, 100);
        }
        datas.isThumb = isThumb;
        e.inputEvent.stopPropagation();
        e.inputEvent.preventDefault();
    }
    protected _onDrag = (e: OnDrag) => {
        if (!e.datas.isThumb) {
            return;
        }
        this.scrollBy(this.isHorizontal ? e.deltaX : e.deltaY);
    };
    protected _onWheel = (e: WheelEvent) => {
        const delta = this.isHorizontal ? e.deltaX : e.deltaY;

        if (delta) {
            e.preventDefault();
        }
        this.trigger("scroll", {
            delta,
        });
    }
}
