import { useState } from "react";

export function useBuffer(initial: string) {
  const [inputBuffer, setInputBuffer] = useState<Array<string>>(
    initial.split("\n")
  );

  const appendToBuffer = (str: string) => {
    const split = str.split("\n");
    setInputBuffer(inputBuffer.concat(split));
  };

  return { inputBuffer, appendToBuffer };
}
