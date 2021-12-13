import React from "react";
import ReactDOM from "react-dom";
import ReactShell, {IReactShellStrings} from "../lib/react-shell";

const prompt = "λ ";

const strings: Partial<IReactShellStrings> = {
  WELCOME: `Searching for  executable...
     Loading shared libraries...
     Package loaded successfully. Ritual ready to begin`,
};

ReactDOM.render(
  <React.StrictMode>
    <ReactShell commands={{}} strings={strings} prompt={prompt} />
  </React.StrictMode>,
  document.getElementById("root")
);
