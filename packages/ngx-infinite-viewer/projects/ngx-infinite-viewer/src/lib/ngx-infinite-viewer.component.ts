import {
  Component, ElementRef,
  AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, Input, Output, OnInit, EventEmitter,
} from '@angular/core';
import VanillaInfiniteViewer, {
  CLASS_NAME, OPTIONS, PROPERTIES, EVENTS, InfiniteViewerProperties,
} from 'infinite-viewer';
import { NgxInfiniteViewerInterface } from './ngx-infinite-viewer.interface';
import { NgxInfiniteViewerEvents } from './types';


@Component({
  selector: 'ngx-infinite-viewer, [NgxInfiniteViewer]',
  template: `
  <div #scrollArea></div>
  <ng-content></ng-content>
  `,
  styles: []
})
export class NgxInfiniteViewerComponent
  extends NgxInfiniteViewerInterface
  implements OnDestroy, AfterViewInit, OnChanges, InfiniteViewerProperties, NgxInfiniteViewerEvents {
  @ViewChild('scrollArea', { static: false }) scrollAreaRef: ElementRef;
  @Input() margin: InfiniteViewerProperties['margin'];
  @Input() threshold: InfiniteViewerProperties['threshold'];
  @Input() zoom: InfiniteViewerProperties['zoom'];
  @Input() rangeX: InfiniteViewerProperties['rangeX'];
  @Input() rangeY: InfiniteViewerProperties['rangeY'];
  @Output() scroll: NgxInfiniteViewerEvents['scroll'];

  constructor(public containerRef: ElementRef) {
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
      this.containerRef.nativeElement,
      this.scrollAreaRef.nativeElement.nextElementSibling as HTMLElement,
      {
        ...options,
        scrollArea: this.scrollAreaRef.nativeElement,
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
