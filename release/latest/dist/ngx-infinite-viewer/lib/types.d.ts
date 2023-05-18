import { EventEmitter } from '@angular/core';
import { InfiniteViewerEvents } from 'infinite-viewer';
export declare type NgxInfiniteViewerEvents = {
    [key in keyof InfiniteViewerEvents]: EventEmitter<InfiniteViewerEvents[key]>;
};
