import {
  Component, ElementRef,
  AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, Input, Output, OnInit, EventEmitter,
} from '@angular/core';
import VanillaInfiniteViewer, {
  PROPERTIES, EVENTS, InfiniteViewerProperties, InfiniteViewerOptions, OPTIONS,
} from 'infinite-viewer';
import { NgxInfiniteViewerInterface } from './ngx-infinite-viewer.interface';
import { ANGULAR_INFINITE_VIEWER_INPUTS, ANGULAR_INFINITE_VIEWER_OUTPUTS } from './consts';


@Component({
  selector: 'ngx-infinite-viewer, [NgxInfiniteViewer]',
  template: `
  <div class="infinite-viewer-wrapper" #wrapperElement>
    <div class="infinite-viewer-scroll-area" #scrollAreaElement></div>
    <ng-content></ng-content>
  </div>
  <div class="infinite-viewer-scroll-bar infinite-viewer-horizontal-scroll-bar" #horizontalScrollElement>
    <div class="infinite-viewer-scroll-thumb"></div>
  </div>
  <div class="infinite-viewer-scroll-bar infinite-viewer-vertical-scroll-bar" #verticalScrollElement>
    <div class="infinite-viewer-scroll-thumb"></div>
  </div>

  `,
  styles: [],
  inputs: ANGULAR_INFINITE_VIEWER_INPUTS,
  outputs: ANGULAR_INFINITE_VIEWER_OUTPUTS,
})
export class NgxInfiniteViewerComponent
  extends NgxInfiniteViewerInterface
  implements OnDestroy, AfterViewInit, OnChanges, InfiniteViewerOptions {
  @ViewChild('scrollAreaElement', { static: false }) scrollAreaElementRef!: ElementRef;
  @ViewChild('wrapperElement', { static: false }) wrapperElementRef!: ElementRef;
  @ViewChild('horizontalScrollElement', { static: false }) horizontalScrollElementRef!: ElementRef;
  @ViewChild('verticalScrollElement', { static: false }) verticalScrollElementRef!: ElementRef;

  constructor(public containerElementRef: ElementRef) {
    super();
    EVENTS.forEach(name => {
      (this as any)[name] = new EventEmitter();
    });
  }

  ngAfterViewInit(): void {
    const options: Partial<InfiniteViewerProperties> = {};
    OPTIONS.forEach((name) => {
      if (name in this && typeof this[name] !== 'undefined') {
        (options as any)[name] = this[name];
      }
    });
    this.infiniteViewer = new VanillaInfiniteViewer(
      this.containerElementRef.nativeElement,
      this.scrollAreaElementRef.nativeElement.nextElementSibling as HTMLElement,
      {
        ...options,
        wrapperElement: this.wrapperElementRef.nativeElement,
        scrollAreaElement: this.scrollAreaElementRef.nativeElement,
        horizontalScrollElement: this.horizontalScrollElementRef.nativeElement,
        verticalScrollElement: this.verticalScrollElementRef.nativeElement,
      },
    );


    const infiniteViewer = this.infiniteViewer;

    EVENTS.forEach(name => {
      infiniteViewer.on(name, e => {
        this[name].emit(e as any);
      });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const infiniteViewer = this.infiniteViewer;

    if (!infiniteViewer) {
      return;
    }
    for (const name in changes) {
      if (PROPERTIES.indexOf(name as any) < -1) {
        continue;
      }
      const { previousValue, currentValue } = changes[name];

      if (previousValue === currentValue) {
        continue;
      }
      (infiniteViewer as any)[name] = currentValue;
    }
  }
  ngOnDestroy() {
    this.infiniteViewer.destroy();
  }
}
