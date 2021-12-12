import React, {
  KeyboardEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_PROPS, DEFAULT_STRINGS } from "~/web-shell.const";
import { DeepPartial } from "~/support/util/deep-partial";
import { usePrompt } from "~/support/hooks/use-prompt";
import { useInputCallbacks } from "~/support/hooks/use-input-callbacks";
import { useBuffer } from "~/support/hooks/use-buffer";

export interface IWebShellProps {
  autoFocus: boolean;
  prompt: string;
  strings: IWebShellStrings;
}

export interface IWebShellStrings {
  INVALID_COMMAND: string;
  WELCOME: string;
}

function WebShell(props: DeepPartial<IWebShellProps> = {}) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const { prompt, autoFocus, ...rest } = mergedProps;
  const strings = { ...DEFAULT_STRINGS, ...rest.strings };

  const { inputBuffer, appendToBuffer } = useBuffer(strings.WELCOME);
  const [allowInput, setAllowInput] = useState(true);
  const { promptRef, focus } = usePrompt(autoFocus);

  const handleEnter = useCallback(() => {
    if (!promptRef.current) return;

    const userInput = promptRef.current.innerText ?? "";
    const commandName = userInput.trim().split(" ").at(0);
    appendToBuffer(prompt + userInput);
    promptRef.current.innerText = "";
    console.log(commandName);
  }, [promptRef, appendToBuffer]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
      }
    },
    [handleEnter]
  );

  return (
    <div className="web-shell" onClick={focus}>
      {inputBuffer.map((str, index) => (
        <p key={index}>{str}</p>
      ))}
      <div className="shell-prompt">
        <span>{prompt}</span>
        <span
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
