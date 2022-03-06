import { RefObject, useReducer } from "react";

export interface BufferState {
  buffer: ReadonlyArray<string>;
  options: {
    maxBufferSize: number;
  };
}

interface AppendAction {
  type: "append";
  payload: string | Array<string>;
}

interface ClearAction {
  type: "clear";
}

type BufferAction = AppendAction | ClearAction;

function bufferReducer(state: BufferState, action: BufferAction): BufferState {
  switch (action.type) {
    case "append":
      return appendHandler(state, action);
    case "clear":
      return { ...state, buffer: [] };
    default:
      return state;
  }
}

function appendHandler(
  state: BufferState,
  { payload }: AppendAction
): BufferState {
  const split = Array.isArray(payload)
    ? payload.flatMap((str) => str.split("\n"))
    : payload.split("\n");
  const newLength = split.length + state.buffer.length;
  const diff = newLength - state.options.maxBufferSize;
  const start = diff > 0 ? diff : 0;

  const buffer = state.buffer.concat(split).slice(start);
  return { ...state, buffer };
}

export function useBuffer(
  initial: string,
  ref: RefObject<HTMLSpanElement>,
  options: BufferState["options"]
) {
  const defaultState: BufferState = {
    buffer: initial.split("\n"),
    options,
  };
  const [{ buffer }, dispatch] = useReducer(bufferReducer, defaultState);

  const readInput = (): Array<string> => {
    if (!ref.current) return [];

    const read = ref.current.innerText;
    ref.current.innerText = "";
    return read.trim().split(" ");
  };

  const appendToBuffer = (payload: string | Array<string>) =>
    dispatch({ type: "append", payload });

  const clearBuffer = () => dispatch({ type: "clear" });

  return { readInput, buffer, appendToBuffer, clearBuffer };
}
