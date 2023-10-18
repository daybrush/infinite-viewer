import { html, render } from "lit";
import "../src/LitInfiniteViewer";

render(html`
<lit-infinite-viewer class="viewer">
    <div class="viewport"></div>
</lit-infinite-viewer>`, document.body);
