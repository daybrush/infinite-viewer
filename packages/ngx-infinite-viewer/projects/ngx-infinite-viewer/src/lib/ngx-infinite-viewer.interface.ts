import VanillaInfiniteViewer, { METHODS, InfiniteViewerMethods } from 'infinite-viewer';
import { withMethods, MethodInterface } from 'framework-utils';
import { NgxInfiniteViewerComponent } from './ngx-infinite-viewer.component';

export class NgxInfiniteViewerInterface {
  @withMethods(METHODS as any)
  protected infiniteViewer!: VanillaInfiniteViewer;
}
export default interface InfiniteViewer extends MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, NgxInfiniteViewerComponent> {}
