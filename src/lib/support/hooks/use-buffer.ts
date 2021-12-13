import { RefObject, useState } from "react";

export function useBuffer(initial: string, ref: RefObject<HTMLSpanElement>) {
  const [inputBuffer, setInputBuffer] = useState<ReadonlyArray<string>>(
    initial.split("\n")
  );

  const appendToBuffer = (input: string | Array<string>) => {
    const split = Array.isArray(input)
      ? input.flatMap((str) => str.split("\n"))
      : input.split("\n");
    setInputBuffer((state) => state.concat(split));
  };

  const clearBuffer = () => {
    setInputBuffer([]);
  };

  const readInput = (): Array<string> => {
    if (!ref.current) return [];

    const read = ref.current.innerText;
    ref.current.innerText = "";
    return read.trim().split(" ");
  };

  return { inputBuffer, appendToBuffer, clearBuffer, readInput };
}
