import React from "react";
import ReactDOM from "react-dom";
import ReactShell, { ICommands, IReactShellStrings } from "../lib/react-shell";

const prompt = "λ ";

const commands: ICommands = {
  clear: (_args, { clear }) => clear(),
  echo: (args, { append }) => append([args.slice(1).join(" ")]),
};

const strings: Partial<IReactShellStrings> = {
  WELCOME: `Searching for  executable...
     Loading shared libraries...
     Package loaded successfully. Ritual ready to begin`,
};

ReactDOM.render(
  <React.StrictMode>
    <ReactShell commands={commands} strings={strings} prompt={prompt} />
  </React.StrictMode>,
  document.getElementById("root")
);
