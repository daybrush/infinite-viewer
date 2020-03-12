import buildHelper from "@daybrush/builder";
import svelte from 'rollup-plugin-svelte';

const defaultOptions = {
    tsconfig: "",
    input: './src/svelte-infinite-viewer/index.js',
    commonjs: true,
    external: {
        "svelte": "svelte",
    },
    plugins: [
        svelte(),
    ],
}
export default buildHelper([
    {
        ...defaultOptions,
        output: "dist/infinite-viewer.cjs.js",
        format: "cjs",
    },
    {
        ...defaultOptions,
        output: "dist/infinite-viewer.esm.js",
        format: "es",
    },
]);
