import { useEffect, useRef } from "react";

export function usePrompt(autoFocus: boolean) {
  const promptRef = useRef<HTMLSpanElement>(null);

  const focus = () => {
    promptRef.current?.focus();
  };

  useEffect(() => {
    if (autoFocus) {
      focus();
    }
  }, [autoFocus, focus]);

  return { promptRef, focus };
}
