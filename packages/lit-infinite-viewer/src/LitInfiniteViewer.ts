import { LitElement, html, customElement, property } from "lit-element";
import VanillaInfiniteViewer, {
    InfiniteViewerProperties, OPTION_TYPES,
    EVENTS, PROPERTIES, InfiniteViewerMethods, METHODS
} from "infinite-viewer";
import { Properties, withMethods, MethodInterface } from "framework-utils";
import { camelize } from "@daybrush/utils";

@Properties(PROPERTIES as any, (prototype, name) => {
    property({ type: OPTION_TYPES[name] })(prototype, name);
})
@customElement("lit-infinite-viewer")
export class LitInfiniteViewer extends LitElement {
    @withMethods(METHODS as any, { click: "clickInfiniteViewer" })
    private infiniteViewer!: VanillaInfiniteViewer;
    public firstUpdated() {
        const options: Partial<InfiniteViewerProperties> = {};

        PROPERTIES.forEach(name => {
            if (typeof this[name] !== "undefined") {
                options[name as any] = this[name];
            }
        });
        const viewport = this.children[0] as HTMLElement;
        const scrollArea = this.shadowRoot.querySelector("div") as HTMLElement;

        this.infiniteViewer = new VanillaInfiniteViewer(
            this,
            viewport,
            {
                ...options,
                scrollArea,
            }
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
        return html`<div></div><slot></slot>`;
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
export interface LitInfiniteViewer extends InfiniteViewerProperties,
    MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, LitInfiniteViewer, {
        "scrollTo": "scrollToViewer",
        "scrollBy": "scrollByViewer",
    }> { }

declare global {
    interface HTMLElementTagNameMap {
        "lit-infinite-viewer": LitInfiniteViewer;
    }
}
