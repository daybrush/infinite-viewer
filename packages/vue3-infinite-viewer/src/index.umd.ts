import InfiniteViewer, * as modules from './index';

for (const name in modules) {
    (InfiniteViewer as any)[name] = (modules as any)[name];
}
export default InfiniteViewer;
