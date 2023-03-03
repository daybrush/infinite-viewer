import React from "react";
import InfiniteViewer from "./react-infinite-viewer/InfiniteViewer";
import "./App.css";

class App extends React.Component {
    public render() {
        return (
            <InfiniteViewer className="viewer">
                <div className="viewport">AA</div>
            </InfiniteViewer>
        );
    }
}

export default App;
