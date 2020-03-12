import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxInfiniteViewerModule } from 'projects/ngx-infinite-viewer/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NgxInfiniteViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
