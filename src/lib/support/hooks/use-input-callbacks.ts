import {
  KeyboardEventHandler,
  Ref,
  RefObject,
  useCallback,
  useState,
} from "react";
import { IWebShellProps } from "~/web-shell";

export function useInputCallbacks(
  props: IWebShellProps,
  ref: RefObject<HTMLSpanElement>,
  appendToBuffer: (str: string) => void
) {
  const handleEnter = useCallback(() => {
    if (!ref.current) return;
    const userInput = ref.current.innerText ?? "";
    const commandName = ref.current.innerText.trim().split(" ").at(0);
    ref.current.innerText = "";
    console.log(commandName);
    appendToBuffer(userInput);
  }, [ref, appendToBuffer]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
      }
    },
    [handleEnter]
  );

  return { handleKeyDown };
}
