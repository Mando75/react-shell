import { IWebShellProps, IWebShellStrings } from "./web-shell";
import { ICommands } from "~/support/hooks/use-commands";

export const DEFAULT_STRINGS: IWebShellStrings = {
  ERROR_PREFACE: "An error occurred",
  INVALID_COMMAND: "Unrecognized Command",
  WELCOME: "Welcome to web-shell",
};

export const DEFAULT_COMMANDS: ICommands = {
  help: (_args, bufferOptions) => {
    bufferOptions.append(`Type a command and any arguments. 
      Hit enter on your keyboard to submit and execute the command.`);
  },
};

interface IWebShellOptions extends IWebShellProps {
  commands: ICommands;
  className: string;
  autoFocus: boolean;
  prompt: string;
  strings: IWebShellStrings;
}

export const DEFAULT_PROPS: IWebShellOptions = {
  commands: DEFAULT_COMMANDS,
  className: "",
  autoFocus: true,
  prompt: "~ ",
  strings: DEFAULT_STRINGS,
};
