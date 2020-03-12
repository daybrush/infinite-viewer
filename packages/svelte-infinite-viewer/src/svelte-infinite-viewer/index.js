import InfiniteViewer from "./InfiniteViewer.svelte";
import { METHODS } from "infinite-viewer";

export default /*#__PURE__*/ (() => {
    const prototype = InfiniteViewer.prototype;

    METHODS.forEach(name => {
        prototype[name] = function (...args) {
            const self = this.getInstance();
            const result = self[name](...args);

            if (result === self) {
                return this;
            } else {
                return result;
            }
        };
    });
    return InfiniteViewer;
})();
