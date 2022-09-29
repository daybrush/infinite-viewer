import InfiniteViewer, * as modules from "./index";

for (const name in modules) {
    (InfiniteViewer as any)[name] = modules[name];
}

module.exports = InfiniteViewer;
export default InfiniteViewer;
export * from "./index";
