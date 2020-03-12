import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInfiniteViewerComponent } from './ngx-infinite-viewer.component';

describe('NgxInfiniteViewerComponent', () => {
  let component: NgxInfiniteViewerComponent;
  let fixture: ComponentFixture<NgxInfiniteViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxInfiniteViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInfiniteViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
