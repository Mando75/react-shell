import { IReactShellProps, IReactShellStrings } from "./react-shell";
import { ICommands } from "./support/hooks/use-commands";

export const DEFAULT_STRINGS: IReactShellStrings = {
  ERROR_PREFACE: "An error occurred",
  INVALID_COMMAND: "Unrecognized Command",
  WELCOME: "Welcome to react-shell",
};

interface IReactShellOptions extends IReactShellProps {
  commands: ICommands;
  className: string;
  autoFocus: boolean;
  prompt: string;
  strings: IReactShellStrings;
  maxBufferSize: number;
}

export const DEFAULT_PROPS: IReactShellOptions = {
  commands: {},
  className: "",
  autoFocus: true,
  prompt: "~ ",
  strings: DEFAULT_STRINGS,
  maxBufferSize: 1000,
};
