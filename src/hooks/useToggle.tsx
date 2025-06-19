import { useState } from "react";

export default function useToggle(initialValue: boolean = false): [
  boolean,
  {
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
  }
] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = () => setState((prev) => !prev);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);

  return [state, { toggle, setTrue, setFalse }];
}
