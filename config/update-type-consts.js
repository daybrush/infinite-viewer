const path = require("path");
const { convertProperties } = require("@daybrush/release/angular");
const { PROPERTIES, EVENTS } = require("../packages/infinite-viewer/dist/infinite-viewer.cjs.js");

convertProperties(
    {
        ANGULAR_INFINITE_VIEWER_INPUTS: PROPERTIES,
        ANGULAR_INFINITE_VIEWER_OUTPUTS: EVENTS,
    },
    [
        path.resolve(__dirname, "../packages/ngx-infinite-viewer/projects/ngx-infinite-viewer/src/public-api.ts"),
    ],
);
