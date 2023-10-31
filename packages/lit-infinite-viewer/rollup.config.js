const buildHelper = require("@daybrush/builder");

const defaultOptions = {
  input: "./src/index.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/infinite-viewer.esm.js",
    exports: "named",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/infinite-viewer.cjs.js",
    exports: "named",
  },
]);
