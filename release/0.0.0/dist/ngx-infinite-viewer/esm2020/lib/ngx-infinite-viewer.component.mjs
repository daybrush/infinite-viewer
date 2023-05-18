import { Component, ViewChild, EventEmitter, } from '@angular/core';
import VanillaInfiniteViewer, { PROPERTIES, EVENTS, } from 'infinite-viewer';
import { NgxInfiniteViewerInterface } from './ngx-infinite-viewer.interface';
import * as i0 from "@angular/core";
export class NgxInfiniteViewerComponent extends NgxInfiniteViewerInterface {
    // @Input() margin!: InfiniteViewerProperties['margin'];
    // @Input() threshold: InfiniteViewerProperties['threshold'];
    // @Input() zoom: InfiniteViewerProperties['zoom'];
    // @Input() rangeX: InfiniteViewerProperties['rangeX'];
    // @Input() rangeY: InfiniteViewerProperties['rangeY'];
    // @Input() pinchThreshold: InfiniteViewerProperties['pinchThreshold'];
    // @Input() usePinch: InfiniteViewerProperties['usePinch'];
    // @Input() cspNonce: InfiniteViewerOptions['cspNonce'];
    // @Input() wheelScale: InfiniteViewerOptions['wheelScale'];
    // @Input() displayVerticalScroll: InfiniteViewerOptions['displayVerticalScroll'];
    // @Input() displayHorizontalScroll: InfiniteViewerOptions['displayHorizontalScroll'];
    // @Input() useWheelScroll: InfiniteViewerOptions['useWheelScroll'];
    // @Input() useWheelPinch: InfiniteViewerOptions['useWheelPinch'];
    // @Input() zoomOffsetX: InfiniteViewerOptions['zoomOffsetX'];
    // @Input() zoomOffsetY: InfiniteViewerOptions['zoomOffsetY'];
    // @Input() translateZ: InfiniteViewerOptions['translateZ'];
    // @Input() rangeOffsetX: InfiniteViewerOptions['rangeOffsetX'];
    // @Input() rangeOffsetY: InfiniteViewerOptions['rangeOffsetY'];
    // @Input() maxPinchWheel: InfiniteViewerOptions['maxPinchWheel'];
    // @Input() useGesture: InfiniteViewerOptions['useGesture'];
    // @Input() useTransform: InfiniteViewerOptions['useTransform'];
    // @Input() wrapperElement: InfiniteViewerOptions['wrapperElement'];
    // @Input() scrollAreaElement: InfiniteViewerOptions['scrollAreaElement'];
    // @Input() verticalScrollElement: InfiniteViewerOptions['verticalScrollElement'];
    // @Input() useResizeObserver: InfiniteViewerOptions['useResizeObserver'];
    // @Input() horizontalScrollElement: InfiniteViewerOptions['horizontalScrollElement'];
    // @Output() useMouseDrag: InfiniteViewerOptions['useMouseDrag'];
    // @Output() useAutoZoom: InfiniteViewerOptions['useAutoZoom'];
    // @Output() zoomRange: InfiniteViewerOptions['zoomRange'];
    // @Output() wheelPinchKey: InfiniteViewerOptions['wheelPinchKey'];
    // @Output() scroll: NgxInfiniteViewerEvents['scroll'];
    // @Output() dragStart: NgxInfiniteViewerEvents['dragStart'];
    // @Output() drag: NgxInfiniteViewerEvents['drag'];
    // @Output() dragEnd: NgxInfiniteViewerEvents['dragEnd'];
    // @Output() pinchStart: NgxInfiniteViewerEvents['pinchStart'];
    // @Output() pinch: NgxInfiniteViewerEvents['pinch'];
    // @Output() abortPinch: NgxInfiniteViewerEvents['abortPinch'];
    constructor(containerElementRef) {
        super();
        this.containerElementRef = containerElementRef;
        EVENTS.forEach(name => {
            this[name] = new EventEmitter();
        });
    }
    ngAfterViewInit() {
        const options = {};
        PROPERTIES.forEach((name) => {
            if (name in this && typeof this[name] !== 'undefined') {
                options[name] = this[name];
            }
        });
        this.infiniteViewer = new VanillaInfiniteViewer(this.containerElementRef.nativeElement, this.scrollAreaElementRef.nativeElement.nextElementSibling, {
            ...options,
            wrapperElement: this.wrapperElementRef.nativeElement,
            scrollAreaElement: this.scrollAreaElementRef.nativeElement,
            horizontalScrollElement: this.horizontalScrollElementRef.nativeElement,
            verticalScrollElement: this.verticalScrollElementRef.nativeElement,
        });
        const infiniteViewer = this.infiniteViewer;
        EVENTS.forEach(name => {
            infiniteViewer.on(name, e => {
                this[name].emit(e);
            });
        });
    }
    ngOnChanges(changes) {
        const infiniteViewer = this.infiniteViewer;
        if (!infiniteViewer) {
            return;
        }
        for (const name in changes) {
            if (PROPERTIES.indexOf(name) < -1) {
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
NgxInfiniteViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NgxInfiniteViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NgxInfiniteViewerComponent, selector: "ngx-infinite-viewer, [NgxInfiniteViewer]", viewQueries: [{ propertyName: "scrollAreaElementRef", first: true, predicate: ["scrollAreaElement"], descendants: true }, { propertyName: "wrapperElementRef", first: true, predicate: ["wrapperElement"], descendants: true }, { propertyName: "horizontalScrollElementRef", first: true, predicate: ["horizontalScrollElement"], descendants: true }, { propertyName: "verticalScrollElementRef", first: true, predicate: ["verticalScrollElement"], descendants: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
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

  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerComponent, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { scrollAreaElementRef: [{
                type: ViewChild,
                args: ['scrollAreaElement', { static: false }]
            }], wrapperElementRef: [{
                type: ViewChild,
                args: ['wrapperElement', { static: false }]
            }], horizontalScrollElementRef: [{
                type: ViewChild,
                args: ['horizontalScrollElement', { static: false }]
            }], verticalScrollElementRef: [{
                type: ViewChild,
                args: ['verticalScrollElement', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZmluaXRlLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW5maW5pdGUtdmlld2VyL3NyYy9saWIvbmd4LWluZmluaXRlLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDMkMsU0FBUyxFQUF5QixZQUFZLEdBQ25HLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8scUJBQXFCLEVBQUUsRUFDNUIsVUFBVSxFQUFFLE1BQU0sR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFxQjdFLE1BQU0sT0FBTywwQkFDWCxTQUFRLDBCQUEwQjtJQU1sQyx3REFBd0Q7SUFDeEQsNkRBQTZEO0lBQzdELG1EQUFtRDtJQUNuRCx1REFBdUQ7SUFDdkQsdURBQXVEO0lBQ3ZELHVFQUF1RTtJQUN2RSwyREFBMkQ7SUFDM0Qsd0RBQXdEO0lBQ3hELDREQUE0RDtJQUM1RCxrRkFBa0Y7SUFDbEYsc0ZBQXNGO0lBRXRGLG9FQUFvRTtJQUNwRSxrRUFBa0U7SUFFbEUsOERBQThEO0lBQzlELDhEQUE4RDtJQUM5RCw0REFBNEQ7SUFDNUQsZ0VBQWdFO0lBQ2hFLGdFQUFnRTtJQUNoRSxrRUFBa0U7SUFDbEUsNERBQTREO0lBQzVELGdFQUFnRTtJQUNoRSxvRUFBb0U7SUFDcEUsMEVBQTBFO0lBQzFFLGtGQUFrRjtJQUNsRiwwRUFBMEU7SUFFMUUsc0ZBQXNGO0lBRXRGLGlFQUFpRTtJQUNqRSwrREFBK0Q7SUFDL0QsMkRBQTJEO0lBQzNELG1FQUFtRTtJQUVuRSx1REFBdUQ7SUFDdkQsNkRBQTZEO0lBQzdELG1EQUFtRDtJQUNuRCx5REFBeUQ7SUFDekQsK0RBQStEO0lBQy9ELHFEQUFxRDtJQUNyRCwrREFBK0Q7SUFFL0QsWUFBbUIsbUJBQStC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LEVBQUU7Z0JBQ0Esd0JBQXdCO3NCQUE5RSxTQUFTO3VCQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFZhbmlsbGFJbmZpbml0ZVZpZXdlciwge1xuICBQUk9QRVJUSUVTLCBFVkVOVFMsIEluZmluaXRlVmlld2VyUHJvcGVydGllcywgSW5maW5pdGVWaWV3ZXJPcHRpb25zLCBPUFRJT05TLFxufSBmcm9tICdpbmZpbml0ZS12aWV3ZXInO1xuaW1wb3J0IHsgTmd4SW5maW5pdGVWaWV3ZXJJbnRlcmZhY2UgfSBmcm9tICcuL25neC1pbmZpbml0ZS12aWV3ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IE5neEluZmluaXRlVmlld2VyRXZlbnRzIH0gZnJvbSAnLi90eXBlcyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWluZmluaXRlLXZpZXdlciwgW05neEluZmluaXRlVmlld2VyXScsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJpbmZpbml0ZS12aWV3ZXItd3JhcHBlclwiICN3cmFwcGVyRWxlbWVudD5cbiAgICA8ZGl2IGNsYXNzPVwiaW5maW5pdGUtdmlld2VyLXNjcm9sbC1hcmVhXCIgI3Njcm9sbEFyZWFFbGVtZW50PjwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJpbmZpbml0ZS12aWV3ZXItc2Nyb2xsLWJhciBpbmZpbml0ZS12aWV3ZXItaG9yaXpvbnRhbC1zY3JvbGwtYmFyXCIgI2hvcml6b250YWxTY3JvbGxFbGVtZW50PlxuICAgIDxkaXYgY2xhc3M9XCJpbmZpbml0ZS12aWV3ZXItc2Nyb2xsLXRodW1iXCI+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiaW5maW5pdGUtdmlld2VyLXNjcm9sbC1iYXIgaW5maW5pdGUtdmlld2VyLXZlcnRpY2FsLXNjcm9sbC1iYXJcIiAjdmVydGljYWxTY3JvbGxFbGVtZW50PlxuICAgIDxkaXYgY2xhc3M9XCJpbmZpbml0ZS12aWV3ZXItc2Nyb2xsLXRodW1iXCI+PC9kaXY+XG4gIDwvZGl2PlxuXG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4SW5maW5pdGVWaWV3ZXJDb21wb25lbnRcbiAgZXh0ZW5kcyBOZ3hJbmZpbml0ZVZpZXdlckludGVyZmFjZVxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnc2Nyb2xsQXJlYUVsZW1lbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2Nyb2xsQXJlYUVsZW1lbnRSZWYhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd3cmFwcGVyRWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSB3cmFwcGVyRWxlbWVudFJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2hvcml6b250YWxTY3JvbGxFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGhvcml6b250YWxTY3JvbGxFbGVtZW50UmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndmVydGljYWxTY3JvbGxFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIHZlcnRpY2FsU2Nyb2xsRWxlbWVudFJlZiE6IEVsZW1lbnRSZWY7XG4gIC8vIEBJbnB1dCgpIG1hcmdpbiE6IEluZmluaXRlVmlld2VyUHJvcGVydGllc1snbWFyZ2luJ107XG4gIC8vIEBJbnB1dCgpIHRocmVzaG9sZDogSW5maW5pdGVWaWV3ZXJQcm9wZXJ0aWVzWyd0aHJlc2hvbGQnXTtcbiAgLy8gQElucHV0KCkgem9vbTogSW5maW5pdGVWaWV3ZXJQcm9wZXJ0aWVzWyd6b29tJ107XG4gIC8vIEBJbnB1dCgpIHJhbmdlWDogSW5maW5pdGVWaWV3ZXJQcm9wZXJ0aWVzWydyYW5nZVgnXTtcbiAgLy8gQElucHV0KCkgcmFuZ2VZOiBJbmZpbml0ZVZpZXdlclByb3BlcnRpZXNbJ3JhbmdlWSddO1xuICAvLyBASW5wdXQoKSBwaW5jaFRocmVzaG9sZDogSW5maW5pdGVWaWV3ZXJQcm9wZXJ0aWVzWydwaW5jaFRocmVzaG9sZCddO1xuICAvLyBASW5wdXQoKSB1c2VQaW5jaDogSW5maW5pdGVWaWV3ZXJQcm9wZXJ0aWVzWyd1c2VQaW5jaCddO1xuICAvLyBASW5wdXQoKSBjc3BOb25jZTogSW5maW5pdGVWaWV3ZXJPcHRpb25zWydjc3BOb25jZSddO1xuICAvLyBASW5wdXQoKSB3aGVlbFNjYWxlOiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3doZWVsU2NhbGUnXTtcbiAgLy8gQElucHV0KCkgZGlzcGxheVZlcnRpY2FsU2Nyb2xsOiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ2Rpc3BsYXlWZXJ0aWNhbFNjcm9sbCddO1xuICAvLyBASW5wdXQoKSBkaXNwbGF5SG9yaXpvbnRhbFNjcm9sbDogSW5maW5pdGVWaWV3ZXJPcHRpb25zWydkaXNwbGF5SG9yaXpvbnRhbFNjcm9sbCddO1xuXG4gIC8vIEBJbnB1dCgpIHVzZVdoZWVsU2Nyb2xsOiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3VzZVdoZWVsU2Nyb2xsJ107XG4gIC8vIEBJbnB1dCgpIHVzZVdoZWVsUGluY2g6IEluZmluaXRlVmlld2VyT3B0aW9uc1sndXNlV2hlZWxQaW5jaCddO1xuXG4gIC8vIEBJbnB1dCgpIHpvb21PZmZzZXRYOiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3pvb21PZmZzZXRYJ107XG4gIC8vIEBJbnB1dCgpIHpvb21PZmZzZXRZOiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3pvb21PZmZzZXRZJ107XG4gIC8vIEBJbnB1dCgpIHRyYW5zbGF0ZVo6IEluZmluaXRlVmlld2VyT3B0aW9uc1sndHJhbnNsYXRlWiddO1xuICAvLyBASW5wdXQoKSByYW5nZU9mZnNldFg6IEluZmluaXRlVmlld2VyT3B0aW9uc1sncmFuZ2VPZmZzZXRYJ107XG4gIC8vIEBJbnB1dCgpIHJhbmdlT2Zmc2V0WTogSW5maW5pdGVWaWV3ZXJPcHRpb25zWydyYW5nZU9mZnNldFknXTtcbiAgLy8gQElucHV0KCkgbWF4UGluY2hXaGVlbDogSW5maW5pdGVWaWV3ZXJPcHRpb25zWydtYXhQaW5jaFdoZWVsJ107XG4gIC8vIEBJbnB1dCgpIHVzZUdlc3R1cmU6IEluZmluaXRlVmlld2VyT3B0aW9uc1sndXNlR2VzdHVyZSddO1xuICAvLyBASW5wdXQoKSB1c2VUcmFuc2Zvcm06IEluZmluaXRlVmlld2VyT3B0aW9uc1sndXNlVHJhbnNmb3JtJ107XG4gIC8vIEBJbnB1dCgpIHdyYXBwZXJFbGVtZW50OiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3dyYXBwZXJFbGVtZW50J107XG4gIC8vIEBJbnB1dCgpIHNjcm9sbEFyZWFFbGVtZW50OiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3Njcm9sbEFyZWFFbGVtZW50J107XG4gIC8vIEBJbnB1dCgpIHZlcnRpY2FsU2Nyb2xsRWxlbWVudDogSW5maW5pdGVWaWV3ZXJPcHRpb25zWyd2ZXJ0aWNhbFNjcm9sbEVsZW1lbnQnXTtcbiAgLy8gQElucHV0KCkgdXNlUmVzaXplT2JzZXJ2ZXI6IEluZmluaXRlVmlld2VyT3B0aW9uc1sndXNlUmVzaXplT2JzZXJ2ZXInXTtcblxuICAvLyBASW5wdXQoKSBob3Jpem9udGFsU2Nyb2xsRWxlbWVudDogSW5maW5pdGVWaWV3ZXJPcHRpb25zWydob3Jpem9udGFsU2Nyb2xsRWxlbWVudCddO1xuXG4gIC8vIEBPdXRwdXQoKSB1c2VNb3VzZURyYWc6IEluZmluaXRlVmlld2VyT3B0aW9uc1sndXNlTW91c2VEcmFnJ107XG4gIC8vIEBPdXRwdXQoKSB1c2VBdXRvWm9vbTogSW5maW5pdGVWaWV3ZXJPcHRpb25zWyd1c2VBdXRvWm9vbSddO1xuICAvLyBAT3V0cHV0KCkgem9vbVJhbmdlOiBJbmZpbml0ZVZpZXdlck9wdGlvbnNbJ3pvb21SYW5nZSddO1xuICAvLyBAT3V0cHV0KCkgd2hlZWxQaW5jaEtleTogSW5maW5pdGVWaWV3ZXJPcHRpb25zWyd3aGVlbFBpbmNoS2V5J107XG5cbiAgLy8gQE91dHB1dCgpIHNjcm9sbDogTmd4SW5maW5pdGVWaWV3ZXJFdmVudHNbJ3Njcm9sbCddO1xuICAvLyBAT3V0cHV0KCkgZHJhZ1N0YXJ0OiBOZ3hJbmZpbml0ZVZpZXdlckV2ZW50c1snZHJhZ1N0YXJ0J107XG4gIC8vIEBPdXRwdXQoKSBkcmFnOiBOZ3hJbmZpbml0ZVZpZXdlckV2ZW50c1snZHJhZyddO1xuICAvLyBAT3V0cHV0KCkgZHJhZ0VuZDogTmd4SW5maW5pdGVWaWV3ZXJFdmVudHNbJ2RyYWdFbmQnXTtcbiAgLy8gQE91dHB1dCgpIHBpbmNoU3RhcnQ6IE5neEluZmluaXRlVmlld2VyRXZlbnRzWydwaW5jaFN0YXJ0J107XG4gIC8vIEBPdXRwdXQoKSBwaW5jaDogTmd4SW5maW5pdGVWaWV3ZXJFdmVudHNbJ3BpbmNoJ107XG4gIC8vIEBPdXRwdXQoKSBhYm9ydFBpbmNoOiBOZ3hJbmZpbml0ZVZpZXdlckV2ZW50c1snYWJvcnRQaW5jaCddO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250YWluZXJFbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgICBFVkVOVFMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICh0aGlzIGFzIGFueSlbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9uczogUGFydGlhbDxJbmZpbml0ZVZpZXdlclByb3BlcnRpZXM+ID0ge307XG4gICAgUFJPUEVSVElFUy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBpZiAobmFtZSBpbiB0aGlzICYmIHR5cGVvZiB0aGlzW25hbWVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAob3B0aW9ucyBhcyBhbnkpW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmluZmluaXRlVmlld2VyID0gbmV3IFZhbmlsbGFJbmZpbml0ZVZpZXdlcihcbiAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5zY3JvbGxBcmVhRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudCxcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgd3JhcHBlckVsZW1lbnQ6IHRoaXMud3JhcHBlckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgc2Nyb2xsQXJlYUVsZW1lbnQ6IHRoaXMuc2Nyb2xsQXJlYUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgaG9yaXpvbnRhbFNjcm9sbEVsZW1lbnQ6IHRoaXMuaG9yaXpvbnRhbFNjcm9sbEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdmVydGljYWxTY3JvbGxFbGVtZW50OiB0aGlzLnZlcnRpY2FsU2Nyb2xsRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgfSxcbiAgICApO1xuXG5cbiAgICBjb25zdCBpbmZpbml0ZVZpZXdlciA9IHRoaXMuaW5maW5pdGVWaWV3ZXI7XG5cbiAgICBFVkVOVFMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGluZmluaXRlVmlld2VyLm9uKG5hbWUsIGUgPT4ge1xuICAgICAgICB0aGlzW25hbWVdLmVtaXQoZSBhcyBhbnkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IGluZmluaXRlVmlld2VyID0gdGhpcy5pbmZpbml0ZVZpZXdlcjtcblxuICAgIGlmICghaW5maW5pdGVWaWV3ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBuYW1lIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmIChQUk9QRVJUSUVTLmluZGV4T2YobmFtZSBhcyBhbnkpIDwgLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gY2hhbmdlc1tuYW1lXTtcblxuICAgICAgaWYgKHByZXZpb3VzVmFsdWUgPT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIChpbmZpbml0ZVZpZXdlciBhcyBhbnkpW25hbWVdID0gY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmluZmluaXRlVmlld2VyLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19