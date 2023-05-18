
<p align="middle" ><img src="https://github.com/daybrush/infinite-viewer/raw/master/demo/images/logo.png" /></p>
<h2 align="middle">Angular Infinite Viewer</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/ngx-infinite-viewer" target="_blank"><img src="https://img.shields.io/npm/v/ngx-infinite-viewer.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://github.com/daybrush/infinite-viewer/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/daybrush/infinite-viewer.svg?style=flat-square&label=license&color=08CE5D"/></a>
<a href="https://github.com/daybrush/infinite-viewer/tree/master/packages/react-infinite-viewer" target="_blank"><img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&color=61daeb"></a>
<a href="https://github.com/daybrush/infinite-viewer/tree/master/packages/preact-infinite-viewer" target="_blank"><img alt="Preact" src="https://img.shields.io/static/v1.svg?label=&message=Preact&style=flat-square&color=673ab8"></a>
<a href="https://github.com/daybrush/infinite-viewer/tree/master/packages/ngx-infinite-viewer" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&color=C82B38"></a>
<a href="https://github.com/daybrush/infinite-viewer/tree/master/packages/vue-infinite-viewer" target="_blank"><img
    alt="Vue"
    src="https://img.shields.io/static/v1.svg?label=&message=Vue&style=flat-square&color=3fb984"></a>
<a href="https://github.com/daybrush/infinite-viewer/tree/master/packages/svelte-infinite-viewer" target="_blank"><img
    alt="Svelte"
    src="https://img.shields.io/static/v1.svg?label=&message=Svelte&style=flat-square&color=C82B38"></a>
<a href="https://github.com/daybrush/infinite-viewer/tree/master/packages/lit-infinite-viewer" target="_blank"><img
    alt="Lit"
    src="https://img.shields.io/static/v1.svg?label=&message=Lit&style=flat-square&color=4E8EE0"></a>
</p>
<p align="middle">Angular Infinite Viewer is Document Viewer Component with infinite scrolling.
</p>

<p align="middle">
    <a href="https://daybrush.com/infinite-viewer" target="_blank"><strong>Demo</strong></a> /
    <a href="https://daybrush.com/infinite-viewer/release/latest/doc/" target="_blank"><strong>API</strong></a> /
    <a href="https://github.com/daybrush/scena" target="_blank"><strong>Main Project</strong></a>
</p>

## ⚙️ Installation
### npm
```bash
$ npm install ngx-infinite-viewer
```

## 🚀 How to use
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgInfiniteViewerComponent, NgInfiniteViewerModule } from "ngx-infinite-viewer";

@NgModule({
  declarations: [
    AppComponent,
    NgInfiniteViewerComponent,
  ],
  imports: [
    BrowserModule,
    // NgInfiniteViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Template

```html
<ngx-infinite-viewer
  class="viewer"
  [margin]="0"
  [threshold]="0"
  [zoom]="1"
  [rangeX]="[0, 0]"
  [rangeY]="[0, 0]"
  (scroll)="onScroll()"
  >
  <div class="viewport">AA</div>
</ngx-infinite-viewer>
```


## ⚙️ Developments
### `npm run start`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## ⭐️ Show Your Support
Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute to `infinite-viewer` or other packages, please write the [issue](https://github.com/daybrush/infinite-viewer/issues) or give me a Pull Request freely.

## 🐞 Bug Report

If you find a bug, please report to us opening a new [Issue](https://github.com/daybrush/infinite-viewer/issues) on GitHub.


## 📝 License

This project is [MIT](https://github.com/daybrush/infinite-viewer/blob/master/LICENSE) licensed.

```
MIT License

Copyright (c) 2020 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
