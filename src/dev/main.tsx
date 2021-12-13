import React from "react";
import ReactDOM from "react-dom";
import WebShell, { IWebShellStrings } from "../lib/web-shell";

const prompt = "λ ";

const strings: Partial<IWebShellStrings> = {
  WELCOME: `Searching for  executable...
     Loading shared libraries...
     Package loaded successfully. Ritual ready to begin`,
};

ReactDOM.render(
  <React.StrictMode>
    <WebShell commands={{}} strings={strings} prompt={prompt} />
  </React.StrictMode>,
  document.getElementById("root")
);
