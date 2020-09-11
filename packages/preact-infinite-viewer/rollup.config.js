import builder from "@daybrush/builder";
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    tsconfig: "tsconfig.build.json",
    external: {
        "@daybrush/utils": "utils",
        "gesto": "Gesto",
        "preact": "Preact",
        "preact/compat": "preact/compat",
        "preact-compat": "preact-compat",
        "css-styled": "css-styled",
        "preact-ruler": "preact-ruler",
        "framework-utils": "framework-utils",
        "infinite-viewer": "infinite-viewer",
        "@egjs/agent": "eg.Agent",
        "@egjs/children-differ": "eg.ChildrenDiffer",
    },
    exports: "named",
    plugins: [
        preact({
            noPropTypes: false,
            noEnv: false,
            noReactIs: false,
            usePreactX: true,
            aliasModules: {
                "react-ruler": "preact-ruler",
            },
        }),
    ],
    sourcemap: false,
};

export default builder([
    {
        ...defaultOptions,
        input: "src/preact-infinite-viewer/index.esm.ts",
        output: "./dist/infinite-viewer.esm.js",
        format: "es",
    },
    {
        ...defaultOptions,
        input: "src/preact-infinite-viewer/index.umd.ts",
        output: "./dist/infinite-viewer.cjs.js",
        format: "cjs",
        exports: "default",
    },
]);
