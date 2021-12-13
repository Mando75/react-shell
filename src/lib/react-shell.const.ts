import {IReactShellProps, IReactShellStrings} from "./react-shell";
import {ICommands} from "./support/hooks/use-commands";

export const DEFAULT_STRINGS: IReactShellStrings = {
  ERROR_PREFACE: "An error occurred",
  INVALID_COMMAND: "Unrecognized Command",
  WELCOME: "Welcome to react-shell",
};

export const DEFAULT_COMMANDS: ICommands = {
  help: (_args, bufferOptions) => {
    bufferOptions.append(`Type a command and any arguments. 
      Hit enter on your keyboard to submit and execute the command.`);
  },
};

interface IReactShellOptions extends IReactShellProps {
  commands: ICommands;
  className: string;
  autoFocus: boolean;
  prompt: string;
  strings: IReactShellStrings;
}

export const DEFAULT_PROPS: IReactShellOptions = {
  commands: DEFAULT_COMMANDS,
  className: "",
  autoFocus: true,
  prompt: "~ ",
  strings: DEFAULT_STRINGS,
};
