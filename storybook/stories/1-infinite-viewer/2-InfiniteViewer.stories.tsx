import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs, boolean, object } from "@storybook/addon-knobs";
import { withPreview, DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";
import Selecto from "react-selecto";
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/react-guides";
import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";
import keycon from "keycon";
import "../index.css";

const story = storiesOf("Infinite Viewer", module).addDecorator(withKnobs).addDecorator(withPreview);
story.add("Initialize", () => {
    const viewerRef = React.useRef<InfiniteViewer>(null);

    React.useEffect(() => {
        (window as any).v = viewerRef.current!;
    }, []);
    return <div className="app story">
        <InfiniteViewer
            className="viewer" ref={viewerRef}
            usePinch={boolean("usePinch", true)}
            threshold={number("threshold", 100)}
            margin={number("margin", 500)}
            rangeX={boolean("Use rangeX as Infinity.", true) ? [-Infinity, Infinity] : object("rangeX", [-1, 1])}
            rangeY={boolean("Use rangeY as Infinity.", true) ? [-Infinity, Infinity] : object("rangeY", [-1, 1])}
            pinchThreshold={50}
            zoom={number("zoom", 1)}
        >
            <div className="viewport">
            <p className="logo"><img src="https://daybrush.com/infinite-viewer/images/logo.png" data-moveable /></p>
            <h2 data-moveable>Infinite Viewer</h2>
            <p className="description" data-moveable>Infinite Viewer is Document Viewer Component with infinite scrolling.</p>
            <div className="buttons">
                <a href="https://github.com/daybrush/infinite-viewer" target="_blank" className="button">Download</a>
                <a href="https://daybrush.com/infinite-viewer/release/latest/doc" target="_blank" className="button">API</a>
            </div>
            <p className="description" data-moveable>&nbsp;This component can scroll up and down, left and right in the
            negative direction and in the positive direction. &nbsp;It can also be used in combination with
                moveable, selecto, guides.</p>
            <div className="component" data-moveable>
                <p className="logo"><img src="https://daybrush.com/moveable/images/256x256.png" alt="Logo" /></p>
                <p><a href="https://github.com/daybrush/moveable" target="_blank">Moveable</a></p>
            </div>
            <div className="component" data-moveable>
                <p className="logo"><img src="https://daybrush.com/selecto/images/256x256.png" alt="Logo" style={{ padding: "10px" }} /></p>
                <p><a href="https://github.com/daybrush/selecto" target="_blank">Selecto</a></p>
            </div>
            <div className="component" data-moveable>
                <p className="logo"><img src="https://daybrush.com/guides/images/guides.png" alt="Logo" /></p>
                <p><a href="https://github.com/daybrush/guides" target="_blank">Guides</a></p>
            </div>
            <div className="component" data-moveable>
                <p className="logo"><img src="https://daybrush.com/scenejs/images/clapperboard.png" alt="Logo" /></p>
                <p><a href="https://github.com/daybrush/scenejs" target="_blank">Scene.js</a></p>
            </div>
            </div>
        </InfiniteViewer>
    </div >;
});
