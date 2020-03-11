const buildHelper = require("@daybrush/builder");


const defaultOptions = {
    sourcemap: true,
    input: "./src/index.ts",
    exports: "named",
};
export default buildHelper([
    {
        ...defaultOptions,
        format: "es",
        output: "./dist/infinite-viewer.esm.js",
    },
    {
        ...defaultOptions,
        format: "cjs",
        output: "./dist/infinite-viewer.cjs.js",
    },
]);
