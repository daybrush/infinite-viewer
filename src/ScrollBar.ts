import Gesto from "gesto";
import { PREFIX } from "./consts";
import { addClass } from "@daybrush/utils";
import Component from "@egjs/component";

export default class ScrollBar extends Component {
    public isAppend: boolean = false;
    private thumbElement!: HTMLElement;
    private barElement!: HTMLElement;
    private gesto!: Gesto;
    private pos: number = 0;
    private min: number = 0;
    private max: number = 0;
    private size: number = 0;
    private isHorizontal = false;
    private viewportSize = 0;
    constructor(
        private type: "horizontal" | "vertical",
        barElement?: HTMLElement,
    ) {
        super();
        this.isHorizontal = type === "horizontal";
        if (!barElement) {
            barElement = document.createElement("div");
            const thumbElement = document.createElement("div");

            addClass(barElement, `${PREFIX}${type}-scroll-bar`);
            addClass(barElement, `${PREFIX}scroll-bar`);
            addClass(thumbElement, `${PREFIX}scroll-thumb`);

            barElement.insertBefore(thumbElement, null);

            this.barElement = barElement;
            this.thumbElement = thumbElement;
            this.isAppend = true;
        } else {
            this.thumbElement = this.barElement.querySelector(`.${PREFIX}scroll-thumb`);
        }
        this.gesto = new Gesto(this.barElement, {
            container: window,
        }).on("dragStart", e => {
            const target = e.inputEvent.target;
            const datas = e.datas;
            const isHorizontal = this.isHorizontal;
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
                        const totalSize = this.getTotalsize();
                        const delta = size * size / totalSize;
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
    }
    public scrollBy(delta: number) {
        const totalSize = (this.min + this.max + this.size);
        const ratio = delta / this.size;

        this.trigger("scroll", {
            delta: totalSize * ratio,
        });
    }
    public getBar() {
        return this.barElement!;
    }
    public getTotalsize() {
        return this.min + this.max + this.size;
    }
    public render(isDisplay: boolean, pos: number, min: number, max: number, size: number) {
        this.pos = pos;
        this.min = min;
        this.max = max;
        this.size = size;

        const totalSize = this.getTotalsize();
        const translate = (min + pos) / totalSize * size;
        const display = isDisplay && (min + max) ? "block" : "none";
        const [dirName1, sizeName] = this.isHorizontal ? ["X", "width"] : ["Y", "height"];
        this.barElement.style.cssText = `display: ${display};`;
        this.thumbElement.style.cssText
            += `${sizeName}: ${size * size / totalSize}px;`
            + `transform: translate${dirName1}(${translate}px)`;
    }
    public unset() {
        this.gesto.off();
        this.off();
    }
}
