import VanillaInfiniteViewer, { METHODS, InfiniteViewerMethods, InfiniteViewerOptions } from 'infinite-viewer';
import { withMethods, MethodInterface } from 'framework-utils';
import { NgxInfiniteViewerComponent } from './ngx-infinite-viewer.component';
import { NgxInfiniteViewerEvents } from './types';

export class NgxInfiniteViewerInterface {
  @withMethods(METHODS as any)
  protected infiniteViewer!: VanillaInfiniteViewer;
}
export interface NgxInfiniteViewerInterface
  extends MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, NgxInfiniteViewerComponent>,
  InfiniteViewerOptions, NgxInfiniteViewerEvents { }
