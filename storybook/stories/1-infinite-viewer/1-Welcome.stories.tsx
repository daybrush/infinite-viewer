import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withPreview, DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";
import Selecto from "react-selecto";
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/react-guides";
import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";
import keycon from "keycon";
import "../welcome.css";

const story = storiesOf("Infinite Viewer", module).addDecorator(withPreview);
story.add("Welcome", () => {
    const viewerRef = React.useRef<InfiniteViewer>(null);
    const horizontalGuidesRef = React.useRef<Guides>(null);
    const verticalGuidesRef = React.useRef<Guides>(null);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);

    const [helper] = React.useState<MoveableHelper>(() => new MoveableHelper());
    const [targets, setTargets] = React.useState<HTMLElement[]>([]);
    const [zoom, setZoom] = React.useState<number>(1);
    const [scrollOptions, setScrollOptions] = React.useState<any>();
    const [verticalGuidelines, setVerticalGuidelines] = React.useState<number[]>([]);
    const [horizontalGuidelines, setHorizontalGuidelines] = React.useState<number[]>([]);

    React.useEffect(() => {
        requestAnimationFrame(() => {
            viewerRef.current!.scrollCenter();
        });

        window.addEventListener("resize", () => {
            horizontalGuidesRef.current!.resize();
            verticalGuidesRef.current!.resize();
        });
        keycon.global;
        window.addEventListener("wheel", e => {
            if (keycon.global.altKey) {
                setZoom(Math.max(0.1, zoom + e.deltaY / 300));
                e.preventDefault();
            }
        }, {
            passive: false,
        });
        const viewer = viewerRef.current!;
        setScrollOptions({
            container: viewer.getContainer(),
            threshold: 30,
            throttleTime: 30,
            getScrollPosition: () => {
                return [
                    viewer.getScrollLeft(),
                    viewer.getScrollTop(),
                ];
            },
        });
    }, []);
    return <div className="app welcome">
        <div className="reset" onClick={() => {
            viewerRef.current!.scrollCenter();
        }}></div>
        <Selecto
            ref={selectoRef}
            dragContainer={".viewer"}
            hitRate={0}
            selectableTargets={["[data-moveable]"]}
            toggleContinueSelect={["shift"]}
            scrollOptions={scrollOptions}
            onDragStart={e => {
                const inputEvent = e.inputEvent;
                const target = inputEvent.target;

                if (
                    target.nodeName === "A"
                    || inputEvent.type === "touchstart"
                    || moveableRef.current!.isMoveableElement(target)
                    || targets.some(t => t === target || t.contains(target))
                ) {
                    e.stop();
                }
            }}
            onSelectEnd={e => {
                setTargets(e.selected as HTMLElement[]);

                if (e.isDragStart) {
                    e.inputEvent.preventDefault();

                    setTimeout(() => {
                        moveableRef.current!.dragStart(e.inputEvent);
                    });
                }
            }}
            onScroll={e => {
                viewerRef.current!.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
            }}
        ></Selecto>
        <Guides
            className="guides horizontal"
            ref={horizontalGuidesRef}
            displayDragPos={true}
            snaps={[0]}
            zoom={zoom}
            style={{
                left: "30px",
                width: "calc(100% - 30px)",
                height: "30px",
            }}
            onChangeGuides={e => {
                setHorizontalGuidelines(e.guides);
            }}
            />
        <Guides className="guides vertical"
            ref={verticalGuidesRef}
            displayDragPos={true}
            type="vertical"
            snaps={[0, 200, 400]}
            zoom={zoom}
            style={{
                top: "30px",
                height: "calc(100% - 30px)",
                width: "30px",
            }}
            onChangeGuides={e => {
                setVerticalGuidelines(e.guides);
            }}
            />
        <div className="guides vertical"></div>
        <InfiniteViewer
            className="viewer" ref={viewerRef}
            usePinch={true}
            pinchThreshold={50}
            zoom={zoom}
            onDragStart={e => {
                const target = e.inputEvent.target;
                if (
                    target.nodeName === "A"
                    || moveableRef.current!.isMoveableElement(target)
                    || targets.some(t => t === target || t.contains(target))
                ) {
                    (e as any).stop();
                }
            }}
            onScroll={e => {
                horizontalGuidesRef.current!.scroll(e.scrollLeft);
                horizontalGuidesRef.current!.scrollGuides(e.scrollTop);
                verticalGuidesRef.current!.scroll(e.scrollTop);
                verticalGuidesRef.current!.scrollGuides(e.scrollLeft);
            }}
            onAbortPinch={e => {
                selectoRef.current!.triggerDragStart(e.inputEvent);
            }}
            onPinch={e => {
                setZoom(zoom);
            }}
        >
            <div className="viewport">
                <Moveable
                    ref={moveableRef}
                    target={targets}
                    draggable={true}
                    scalable={true}
                    rotatable={true}
                    snappable={true}
                    verticalGuidelines={verticalGuidelines}
                    horizontalGuidelines={horizontalGuidelines}
                    onDragStart={helper.onDragStart}
                    onDrag={helper.onDrag}
                    onDragGroupStart={helper.onDragGroupStart}
                    onDragGroup={helper.onDragGroup}
                    onScaleStart={helper.onScaleStart}
                    onScale={helper.onScale}
                    onScaleGroupStart={helper.onScaleGroupStart}
                    onRotateStart={helper.onRotateStart}
                    onRotate={helper.onRotate}
                    onRotateGroupStart={helper.onRotateGroupStart}
                    onRotateGroup={helper.onRotateGroup}
                    onClickGroup={e => {
                        selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
                    }}
                ></Moveable>
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
    </div>;
});
