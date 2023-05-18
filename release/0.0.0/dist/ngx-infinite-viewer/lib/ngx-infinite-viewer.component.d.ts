import { ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgxInfiniteViewerInterface } from './ngx-infinite-viewer.interface';
import * as i0 from "@angular/core";
export declare class NgxInfiniteViewerComponent extends NgxInfiniteViewerInterface implements OnDestroy, AfterViewInit, OnChanges {
    containerElementRef: ElementRef;
    scrollAreaElementRef: ElementRef;
    wrapperElementRef: ElementRef;
    horizontalScrollElementRef: ElementRef;
    verticalScrollElementRef: ElementRef;
    constructor(containerElementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxInfiniteViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxInfiniteViewerComponent, "ngx-infinite-viewer, [NgxInfiniteViewer]", never, {}, {}, never, ["*"]>;
}
