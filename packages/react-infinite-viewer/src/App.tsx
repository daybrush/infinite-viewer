import React from "react";
import InfiniteViewer from "./react-infinite-viewer/InfiniteViewer";
import "./App.css";

function App() {
    const [visible, setVisible] = React.useState(true);

    return (
      <InfiniteViewer
        className="infinite-react"
        displayHorizontalScroll={visible}
        displayVerticalScroll={visible}
      >
        <div className="wrap">
          <p style={{ fontSize: "100px", color: "#000" }}>text</p>
          <button onClick={() => setVisible(!visible)}>
            <p style={{ fontSize: "100px", color: "#000" }}>버튼</p>
          </button>
        </div>
      </InfiniteViewer>
    );
  }

  export default App;
