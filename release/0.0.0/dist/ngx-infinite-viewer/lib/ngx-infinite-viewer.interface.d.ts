import VanillaInfiniteViewer, { InfiniteViewerMethods, InfiniteViewerOptions } from 'infinite-viewer';
import { MethodInterface } from 'framework-utils';
import { NgxInfiniteViewerComponent } from './ngx-infinite-viewer.component';
import { NgxInfiniteViewerEvents } from './types';
export declare class NgxInfiniteViewerInterface {
    protected infiniteViewer: VanillaInfiniteViewer;
}
export interface NgxInfiniteViewerInterface extends MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, NgxInfiniteViewerComponent>, InfiniteViewerOptions, NgxInfiniteViewerEvents {
}
