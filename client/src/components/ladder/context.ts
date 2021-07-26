import { createContext, Dispatch, SetStateAction } from "react";

export interface LadderState {
  isStart: boolean;
  participants: number;
}

interface LadderContextType extends LadderState {
  isStart: boolean;
  participants: number;
  setState: Dispatch<SetStateAction<LadderState>>;
}

export const LadderContext = createContext<LadderContextType>({
  isStart: false,
  participants: 6,
  setState: () => {},
});
