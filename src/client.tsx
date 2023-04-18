import React, { FunctionComponent } from "react";
import { createRoot } from "react-dom/client";
import SearchContainer from "./components/SearchContainer/SearchContainer";

const Root: FunctionComponent = () => (
  <div>
    <SearchContainer />
  </div>
);

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<Root />);

// ReactDOM.render(<Root />, document.getElementById("root")); // with no server-side-rendering
