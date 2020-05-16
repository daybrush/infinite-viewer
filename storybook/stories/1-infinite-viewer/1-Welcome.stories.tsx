import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withPreview, DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";
import Selecto from "react-selecto";
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/react-guides";
import MoveableHelper from "moveable-helper";
import "../welcome.css";

const story = storiesOf("Selecto", module).addDecorator(withPreview);
story.add("Welcome", () => {
    const viewerRef = React.useRef<InfiniteViewer>(null);

    React.useEffect(() => {
        viewerRef.current!.scrollCenter();
    }, []);
    return <div className="app welcome">
        <div className="reset"></div>
        <Guides className="guides horizontal" />
        <div className="guides vertical"></div>
        <InfiniteViewer className="viewer" ref={viewerRef}>
            <div className="viewport">
                <p className="logo"><img src="https://daybrush.com/infinite-viewer/images/logo.png" data-moveable /></p>
                <h2 data-moveable>Infinite Viewer</h2>
                <p className="description" data-moveable>Infinite Viewer is Document Viewer Component with infinite scrolling.</p>
                <div className="buttons">
                    <a href="https://github.com/daybrush/infinite-viewer" className="button">Download</a>
                    <a href="https://daybrush.com/infinite-viewer/release/latest/doc" className="button">API</a>
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
    </div>;
});
