import { TestBed } from '@angular/core/testing';

import { NgxInfiniteViewerService } from './ngx-infinite-viewer.service';

describe('NgxInfiniteViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxInfiniteViewerService = TestBed.get(NgxInfiniteViewerService);
    expect(service).toBeTruthy();
  });
});
