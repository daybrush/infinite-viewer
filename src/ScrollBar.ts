import Gesto from "gesto";
import {
    SCROLL_BAR_CLASS_NAME, SCROLL_THUMB_CLASS_NAME,
    HORIZONTAL_SCROLL_BAR_CLASS_NAME, VERTICAL_SCROLL_BAR_CLASS_NAME
} from "./consts";
import { addClass, removeEvent, addEvent } from "@daybrush/utils";
import Component from "@egjs/component";

export default class ScrollBar extends Component {
    public isAppend: boolean = false;
    public thumbElement!: HTMLElement;
    private gesto!: Gesto;
    private pos: number = 0;
    private size: number = 0;
    private scrollSize: number = 0;
    private isHorizontal = false;
    constructor(
        private type: "horizontal" | "vertical",
        public barElement?: HTMLElement,
    ) {
        super();
        const isHorizontal = type === "horizontal";

        this.isHorizontal = isHorizontal;
        if (!barElement) {
            barElement = document.createElement("div");
            const thumbElement = document.createElement("div");

            addClass(
                barElement,
                isHorizontal ? HORIZONTAL_SCROLL_BAR_CLASS_NAME
                    : VERTICAL_SCROLL_BAR_CLASS_NAME,
            );
            addClass(barElement, SCROLL_BAR_CLASS_NAME);
            addClass(thumbElement, SCROLL_THUMB_CLASS_NAME);

            barElement.insertBefore(thumbElement, null);

            this.barElement = barElement;
            this.thumbElement = thumbElement;
            this.isAppend = true;
        } else {
            this.thumbElement = barElement.querySelector(`.${SCROLL_THUMB_CLASS_NAME}`);
        }
        this.gesto = new Gesto(this.barElement, {
            container: window,
        }).on("dragStart", e => {
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
        }).on("drag", e => {
            if (!e.datas.isThumb) {
                return;
            }
            this.scrollBy(this.isHorizontal ? e.deltaX : e.deltaY);
        });
        addEvent(this.barElement, "wheel", this.onWheel, {
            passive: false,
        });
    }
    public scrollBy(delta: number) {
        const ratio = delta / this.size;

        this.trigger("scroll", {
            delta: this.scrollSize * ratio,
        });
    }
    public render(isDisplay: boolean, pos: number, size: number, scrollSize: number) {
        this.pos = pos;
        this.size = size;
        this.scrollSize = scrollSize;

        const display = isDisplay && (scrollSize > size) ? "block" : "none";
        const [dirName1, sizeName] = this.isHorizontal ? ["X", "width"] : ["Y", "height"];

        this.barElement.style.cssText = `display: ${display};`;
        this.thumbElement.style.cssText
            += `${sizeName}: ${size * size / scrollSize}px;`
            + `transform: translate${dirName1}(${pos / scrollSize * size}px)`;
    }
    public destroy() {
        removeEvent(this.barElement, "wheel", this.onWheel);
        this.gesto.off();
        this.off();
    }
    private onWheel = (e: WheelEvent) => {
        const delta = this.isHorizontal ? e.deltaX : e.deltaY;

        if (delta) {
            e.preventDefault();
        }
        this.trigger("scroll", {
            delta,
        });
    }
}
