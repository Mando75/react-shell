import {IReactShellStrings} from "../../react-shell";
import {useCallback} from "react";

export interface BufferOptions {
  buffer: ReadonlyArray<string>;
  append: (input: string | Array<string>) => void;
  clear: () => void;
}

export type CommandFn = (
  args: Array<string>,
  bufferOptions: BufferOptions
) => void;

export interface ICommands {
  [key: string]: CommandFn;
}

interface IUserCommandProps {
  commands: ICommands;
  bufferOptions: BufferOptions;
  strings: IReactShellStrings;
  setAllowInput: (allow: boolean) => void;
}

export function useCommands({
  commands,
  bufferOptions,
  strings,
  setAllowInput,
}: IUserCommandProps) {
  const executeCommand = useCallback(
    async (commandName: string, args: Array<string>) => {
      const command = commands[commandName];
      if (!command) {
        return bufferOptions.append(strings.INVALID_COMMAND);
      }
      try {
        setAllowInput(false);
        await command(args, bufferOptions);
      } catch (e) {
        bufferOptions.append(strings.ERROR_PREFACE);
        if (e instanceof Error) {
          bufferOptions.append(e.message);
        }
      } finally {
        setAllowInput(true);
      }
    },
    [commands, bufferOptions, strings]
  );

  return { executeCommand };
}
