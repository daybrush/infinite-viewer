import Gesto, { OnDragStart } from "gesto";
import {
    SCROLL_BAR_CLASS_NAME, SCROLL_THUMB_CLASS_NAME,
    HORIZONTAL_SCROLL_BAR_CLASS_NAME, VERTICAL_SCROLL_BAR_CLASS_NAME
} from "./consts";
import { addClass, removeEvent, addEvent } from "@daybrush/utils";
import EventEmitter from "@scena/event-emitter";
import ScrollBar from "./ScrollBar";

export default class BounceScrollBar extends ScrollBar {
    public renderBounce(
        isDisplay: boolean,
        pos: number,
        size: number,
        scrollSize: number,
    ) {
        this.size = size;
        this.scrollSize = scrollSize;

        const display = isDisplay && (scrollSize > size) ? "block" : "none";
        const [dirName1, sizeName] = this.isHorizontal ? ["X", "width"] : ["Y", "height"];

        this.barElement.style.cssText = `display: ${display};`;
        this.thumbElement.style.cssText
            += `${sizeName}: ${size * size / scrollSize}px;opacity: 1;`
            + `transform: translate${dirName1}(${pos / scrollSize * size}px)`;
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
}
