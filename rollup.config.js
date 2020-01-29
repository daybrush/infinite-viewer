
import builder from "@daybrush/builder";

export default builder([
    {
        name: "InfiniteViewer",
        input: "src/index.umd.ts",
        output: "./dist/infinite-viewer.js",
    },
    {
        name: "InfiniteViewer",
        input: "src/index.umd.ts",
        output: "./dist/infinite-viewer.min.js",
        uglify: true,

    },
    {
        name: "InfiniteViewer",
        input: "src/index.umd.ts",
        output: "./dist/infinite-viewer.pkgd.js",
        resolve: true,
    },
    {
        name: "InfiniteViewer",
        input: "src/index.umd.ts",
        output: "./dist/infinite-viewer.pkgd.min.js",
        resolve: true,
        uglify: true,
    },
    {
        input: "src/index.ts",
        output: "./dist/infinite-viewer.esm.js",
        exports: "named",
        format: "es",
    },
    {
        input: "src/index.umd.ts",
        output: "./dist/infinite-viewer.cjs.js",
        exports: "default",
        format: "cjs",
    },
]);
