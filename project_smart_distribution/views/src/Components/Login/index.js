import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function app(){
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}
export default app;
