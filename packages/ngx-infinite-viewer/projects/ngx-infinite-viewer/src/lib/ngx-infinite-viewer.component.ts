import {
  Component, ElementRef,
  AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, Input, Output, OnInit, EventEmitter,
} from '@angular/core';
import VanillaInfiniteViewer, {
  PROPERTIES, EVENTS, InfiniteViewerProperties, InfiniteViewerOptions, OPTIONS,
} from 'infinite-viewer';
import { NgxInfiniteViewerInterface } from './ngx-infinite-viewer.interface';
import { NgxInfiniteViewerEvents } from './types';


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
  styles: []
})
export class NgxInfiniteViewerComponent
  extends NgxInfiniteViewerInterface
  implements OnDestroy, AfterViewInit, OnChanges, InfiniteViewerOptions, NgxInfiniteViewerEvents {
  @ViewChild('scrollAreaElement', { static: false }) scrollAreaElementRef: ElementRef;
  @ViewChild('wrapperElement', { static: false }) wrapperElementRef: ElementRef;
  @ViewChild('horizontalScrollElement', { static: false }) horizontalScrollElementRef: ElementRef;
  @ViewChild('verticalScrollElement', { static: false }) verticalScrollElementRef: ElementRef;
  @Input() margin: InfiniteViewerProperties['margin'];
  @Input() threshold: InfiniteViewerProperties['threshold'];
  @Input() zoom: InfiniteViewerProperties['zoom'];
  @Input() rangeX: InfiniteViewerProperties['rangeX'];
  @Input() rangeY: InfiniteViewerProperties['rangeY'];
  @Input() pinchThreshold: InfiniteViewerProperties['pinchThreshold'];
  @Input() usePinch: InfiniteViewerProperties['usePinch'];
  @Input() cspNonce: InfiniteViewerOptions['cspNonce'];
  @Input() wheelScale: InfiniteViewerOptions['wheelScale'];
  @Input() displayVerticalScroll: InfiniteViewerOptions['displayVerticalScroll'];
  @Input() displayHorizontalScroll: InfiniteViewerOptions['displayHorizontalScroll'];

  @Input() useWheelScroll: InfiniteViewerOptions['useWheelScroll'];
  @Input() useWheelPinch: InfiniteViewerOptions['useWheelPinch'];

  @Input() zoomOffsetX: InfiniteViewerOptions['zoomOffsetX'];
  @Input() zoomOffsetY: InfiniteViewerOptions['zoomOffsetY'];
  @Input() translateZ: InfiniteViewerOptions['translateZ'];
  @Input() rangeOffsetX: InfiniteViewerOptions['rangeOffsetX'];
  @Input() rangeOffsetY: InfiniteViewerOptions['rangeOffsetY'];
  @Input() maxPinchWheel: InfiniteViewerOptions['maxPinchWheel'];
  @Input() useGesture: InfiniteViewerOptions['useGesture'];
  @Input() useTransform: InfiniteViewerOptions['useTransform'];
  @Input() wrapperElement: InfiniteViewerOptions['wrapperElement'];
  @Input() scrollAreaElement: InfiniteViewerOptions['scrollAreaElement'];
  @Input() verticalScrollElement: InfiniteViewerOptions['verticalScrollElement'];
  @Input() horizontalScrollElement: InfiniteViewerOptions['horizontalScrollElement'];

  @Output() useMouseDrag: InfiniteViewerOptions['useMouseDrag'];
  @Output() useAutoZoom: InfiniteViewerOptions['useAutoZoom'];
  @Output() zoomRange: InfiniteViewerOptions['zoomRange'];
  @Output() wheelPinchKey: InfiniteViewerOptions['wheelPinchKey'];

  @Output() scroll: NgxInfiniteViewerEvents['scroll'];
  @Output() dragStart: NgxInfiniteViewerEvents['dragStart'];
  @Output() drag: NgxInfiniteViewerEvents['drag'];
  @Output() dragEnd: NgxInfiniteViewerEvents['dragEnd'];
  @Output() pinchStart: NgxInfiniteViewerEvents['pinchStart'];
  @Output() pinch: NgxInfiniteViewerEvents['pinch'];
  @Output() abortPinch: NgxInfiniteViewerEvents['abortPinch'];

  constructor(public containerElementRef: ElementRef) {
    super();
    EVENTS.forEach(name => {
      (this as any)[name] = new EventEmitter();
    });
  }

  ngAfterViewInit(): void {
    const options: Partial<InfiniteViewerProperties> = {};
    PROPERTIES.forEach((name) => {
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
      infiniteViewer[name] = currentValue;
    }
  }
  ngOnDestroy() {
    this.infiniteViewer.destroy();
  }
}
