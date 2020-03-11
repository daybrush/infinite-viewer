import { InfiniteViewerProps } from "react-infinite-viewer/declaration/types";
import Preact, { Component } from "preact";
import VanillaInfiniteViewer, { InfiniteViewerMethods } from "infinite-viewer";
import { MethodInterface } from "framework-utils";

export default class PreactInfiniteViewer extends Component<Partial<InfiniteViewerProps>> {
    public render(): any;
}
export default interface PreactInfiniteViewer extends MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, PreactInfiniteViewer> {} {}
