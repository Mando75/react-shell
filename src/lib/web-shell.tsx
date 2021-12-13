import React, { KeyboardEventHandler, useCallback, useState } from "react";
import {
  DEFAULT_COMMANDS,
  DEFAULT_PROPS,
  DEFAULT_STRINGS,
} from "~/web-shell.const";
import { usePrompt } from "~/support/hooks/use-prompt";
import { useBuffer } from "~/support/hooks/use-buffer";
import "./web-shell.css";
import { ICommands, useCommands } from "~/support/hooks/use-commands";

export interface IWebShellProps {
  commands: ICommands;
  className?: string;
  autoFocus?: boolean;
  prompt?: string;
  strings?: Partial<IWebShellStrings>;
}

export interface IWebShellStrings {
  ERROR_PREFACE: string;
  INVALID_COMMAND: string;
  WELCOME: string;
}

function WebShell(props: IWebShellProps) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const { prompt, autoFocus, ...rest } = mergedProps;
  const strings = { ...DEFAULT_STRINGS, ...rest.strings };
  const commands = { ...DEFAULT_COMMANDS, ...rest.commands };

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
    <div className={`web-shell ${rest.className}`} onClick={focus}>
      {inputBuffer.map((str, index) => (
        <p key={index} className="buffer-item">
          {str}
        </p>
      ))}
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

export default WebShell;
