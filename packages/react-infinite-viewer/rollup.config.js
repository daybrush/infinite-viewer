import builder from "@daybrush/builder";

const defaultOptions = {
    tsconfig: "tsconfig.build.json",
};

export default builder([
    {
        ...defaultOptions,
        input: "src/react-infinite-viewer/index.ts",
        output: "./dist/infinite-viewer.esm.js",
        format: "es",
        exports: "named",
    },
    {
        ...defaultOptions,
        input: "src/react-infinite-viewer/index.umd.ts",
        output: "./dist/infinite-viewer.cjs.js",
        format: "cjs",
        exports: "default",
    },
]);
