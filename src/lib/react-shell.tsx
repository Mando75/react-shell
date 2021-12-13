import React, { KeyboardEventHandler, useCallback, useState } from "react";
import { DEFAULT_PROPS, DEFAULT_STRINGS } from "./react-shell.const";
import { usePrompt } from "./support/hooks/use-prompt";
import { useBuffer } from "./support/hooks/use-buffer";
import "./react-shell.css";
import { ICommands, useCommands } from "./support/hooks/use-commands";

export type { ICommands, CommandFn } from "./support/hooks/use-commands";

export interface IReactShellProps {
  commands: ICommands;
  className?: string;
  autoFocus?: boolean;
  prompt?: string;
  strings?: Partial<IReactShellStrings>;
}

export interface IReactShellStrings {
  ERROR_PREFACE: string;
  INVALID_COMMAND: string;
  WELCOME: string;
}

function ReactShell(props: IReactShellProps) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const { prompt, autoFocus, commands, ...rest } = mergedProps;
  const strings = { ...DEFAULT_STRINGS, ...rest.strings };

  const [allowInput, setAllowInput] = useState(true);
  const { promptRef, focus } = usePrompt(autoFocus);
  const { inputBuffer, appendToBuffer, readInput, clearBuffer } = useBuffer(
    strings.WELCOME,
    promptRef
  );
  const { executeCommand } = useCommands({
    commands,
    bufferOptions: {
      clear: clearBuffer,
      buffer: inputBuffer,
      append: appendToBuffer,
    },
    strings,
    setAllowInput,
  });

  const handleEnter = useCallback(async () => {
    if (!promptRef.current) return;

    const userInput = readInput();
    const commandName = userInput.at(0);
    appendToBuffer(prompt + userInput.join(" "));
    await executeCommand(commandName ?? "", userInput);
  }, [promptRef, appendToBuffer]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
    async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await handleEnter();
      }
    },
    [handleEnter]
  );

  return (
    <div className={`react-shell ${rest.className}`} onClick={focus}>
      <div data-testid="buffer-wrapper">
        {inputBuffer.map((str, index) => (
          <p key={index} className="buffer-item">
            {str}
          </p>
        ))}
      </div>
      <div className="prompt-wrapper">
        <span className="shell-prompt">{prompt}</span>
        <span
          className="shell-input"
          role="textbox"
          spellCheck="false"
          contentEditable={allowInput}
          ref={promptRef}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default ReactShell;
