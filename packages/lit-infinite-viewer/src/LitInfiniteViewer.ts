import { LitElement, html } from "lit";
import {customElement, property} from 'lit/decorators.js';
import VanillaInfiniteViewer, {
    InfiniteViewerOptions,
    EVENTS, PROPERTIES, InfiniteViewerMethods, METHODS, OPTIONS
} from "infinite-viewer";
import { Properties, withMethods, MethodInterface } from "framework-utils";
import { camelize } from "@daybrush/utils";

@Properties(PROPERTIES as any, (prototype, name) => {
    property({ type: Object })(prototype, name);
})
@customElement("lit-infinite-viewer")
export class LitInfiniteViewer extends LitElement {
    @withMethods(METHODS as any, {
        click: "clickViewer",
        scrollTo: "scrollToViewer",
        scrollBy: "scrollByViewer",
    })
    private infiniteViewer!: VanillaInfiniteViewer;
    public firstUpdated() {
        const options: Partial<InfiniteViewerOptions> = {};

        OPTIONS.forEach(name => {
            if (typeof this[name] !== "undefined") {
                options[name as any] = this[name];
            }
        });
        const viewport = this.children[0] as HTMLElement;

        this.infiniteViewer = new VanillaInfiniteViewer(
            this,
            viewport,
            {
                ...options,
            },
        );

        const infiniteViewer = this.infiniteViewer;

        EVENTS.forEach((name, i) => {
            infiniteViewer.on(name, e => {
                const result = this.dispatchEvent(new CustomEvent(camelize(`lit ${name}`), {
                    detail: { ...e },
                }));

                if (result === false) {
                    (e as any).stop();
                }
            });
        });
    }
    public render() {
        return html`<div class="infinite-viewer-wrapper">
        <div class="infinite-viewer-scroll-area"></div>
        <slot></slot>
      </div>
      <div class="infinite-viewer-scroll-bar infinite-viewer-horizontal-scroll-bar">
        <div class="infinite-viewer-scroll-thumb"></div>
      </div>
      <div class="infinite-viewer-scroll-bar infinite-viewer-vertical-scroll-bar">
        <div class="infinite-viewer-scroll-thumb"></div>
      </div>`;
    }
    public updated(changedProperties) {
        const infiniteViewer = this.infiniteViewer;
        changedProperties.forEach((oldValue, propName) => {
            if (PROPERTIES.indexOf(propName)) {
                infiniteViewer[propName] = this[propName];
            }
        });
    }
    public disconnectedCallback() {
        super.disconnectedCallback();
        this.infiniteViewer.destroy();
    }
}
export interface LitInfiniteViewer extends InfiniteViewerOptions,
    MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, LitInfiniteViewer, {
        "click": "clickViewer",
        "scrollTo": "scrollToViewer",
        "scrollBy": "scrollByViewer",
    }> { }

declare global {
    interface HTMLElementTagNameMap {
        "lit-infinite-viewer": LitInfiniteViewer;
    }
}
