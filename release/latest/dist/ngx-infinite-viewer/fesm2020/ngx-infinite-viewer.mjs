import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ViewChild, NgModule } from '@angular/core';
import VanillaInfiniteViewer, { METHODS, EVENTS, PROPERTIES } from 'infinite-viewer';
import { __decorate } from 'tslib';
import { withMethods } from 'framework-utils';

class NgxInfiniteViewerService {
    constructor() { }
}
NgxInfiniteViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxInfiniteViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class NgxInfiniteViewerInterface {
}
__decorate([
    withMethods(METHODS)
], NgxInfiniteViewerInterface.prototype, "infiniteViewer", void 0);

class NgxInfiniteViewerComponent extends NgxInfiniteViewerInterface {
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

class NgxInfiniteViewerModule {
}
NgxInfiniteViewerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxInfiniteViewerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerModule, declarations: [NgxInfiniteViewerComponent], exports: [NgxInfiniteViewerComponent] });
NgxInfiniteViewerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxInfiniteViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxInfiniteViewerComponent],
                    imports: [],
                    exports: [NgxInfiniteViewerComponent]
                }]
        }] });

/*
 * Public API Surface of ngx-infinite-viewer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxInfiniteViewerComponent, NgxInfiniteViewerModule, NgxInfiniteViewerService };
//# sourceMappingURL=ngx-infinite-viewer.mjs.map
