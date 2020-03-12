import { EventEmitter } from '@angular/core';
import { InfiniteViewerEvents } from 'infinite-viewer';

export type NgxInfiniteViewerEvents = {
  [key in keyof InfiniteViewerEvents]: EventEmitter<InfiniteViewerEvents[key]>
};
