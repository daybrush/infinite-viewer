import { html } from "lit-element";
import { render } from "lit-html";
import "../src/LitInfiniteViewer";

render(html`
<lit-infinite-viewer class="viewer">
    <div class="viewport"></div>
</lit-infinite-viewer>`, document.body);
