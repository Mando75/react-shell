import { IWebShellProps, IWebShellStrings } from "./web-shell";

export const DEFAULT_STRINGS: IWebShellStrings = {
  WELCOME: "Welcome to web-shell",
  INVALID_COMMAND: "Unrecognized Command",
};

export const DEFAULT_PROPS: IWebShellProps = {
  autoFocus: true,
  prompt: "~ ",
  strings: DEFAULT_STRINGS,
};
