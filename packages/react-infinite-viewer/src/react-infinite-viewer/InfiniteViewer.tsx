import * as React from "react";
import VanillaInfiniteViewer, {
    CLASS_NAME,
    OPTIONS,
    InfiniteViewerOptions,
    PROPERTIES,
    InfiniteViewerProperties,
    EVENTS,
    InfiniteViewerMethods,
    METHODS,
} from "infinite-viewer";
import { ref, MethodInterface, withMethods } from "framework-utils";
import { InfiniteViewerProps } from "./types";
import { REACT_EVENTS } from "./consts";

export default class InfiniteViewer extends React.PureComponent<Partial<InfiniteViewerProps>> {
    @withMethods(METHODS as any)
    private infiniteViewer!: VanillaInfiniteViewer;
    private container!: HTMLElement;
    private scrollArea!: HTMLElement;
    public render() {
        const className = this.props.className;

        return <div className={`${className || ""} ${CLASS_NAME}`} ref={ref(this, "container")}>
            <div ref={ref(this, "scrollArea")}></div>
            {this.props.children}
        </div>;
    }
    public componentDidMount() {
        const props = this.props;
        const options: Partial<InfiniteViewerOptions> = {};

        OPTIONS.forEach(name => {
            if (name in props) {
                (options as any)[name] = props[name];
            }
        });
        this.infiniteViewer = new VanillaInfiniteViewer(
            this.container,
            this.scrollArea.nextElementSibling as HTMLElement,
            {
                ...options,
                scrollArea: this.scrollArea,
            },
        );

        EVENTS.forEach((name, i) => {
            this.infiniteViewer.on(name, (e: any) => {
                const selfProps = this.props as any;
                const result = selfProps[REACT_EVENTS[i]] && selfProps[REACT_EVENTS[i]](e);

                if (result === false) {
                    e.stop();
                }
            });
        });
    }
    public componentDidUpdate(prevProps: Partial<InfiniteViewerProperties>) {
        const props = this.props;
        const infiniteViewer = this.infiniteViewer;

        PROPERTIES.forEach(name => {
            if (prevProps[name] !== props[name]) {
                (infiniteViewer as any)[name] = props[name];
            }
        });
    }
    public componentWillUnmount() {
        this.infiniteViewer.destroy();
    }
    public getElement() {
        return this.container;
    }
}
// tslint:disable-next-line: max-line-length
export default interface InfiniteViewer extends MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, InfiniteViewer> {}
