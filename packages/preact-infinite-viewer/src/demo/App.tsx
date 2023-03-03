import { Component, h } from "preact";
import "./App.css";
import InfiniteViewer from "../preact-infinite-viewer/InfiniteViewer";

class App extends Component {
    public render() {
        return (
            <InfiniteViewer className="viewer">
                <div className="viewport">AA</div>
            </InfiniteViewer>
        );
    }
}

export default App;
