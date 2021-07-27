import { useState } from "react";

import { LadderContext, LadderState } from "./context";
import { PreparePage } from "../prepare-page";
import Game from "../game";

const Ladder = () => {
  const [state, setState] = useState<LadderState>({
    isStart: false,
    participants: 6,
  });

  return (
    <LadderContext.Provider value={{ ...state, setState }}>
      {state.isStart ? <Game /> : <PreparePage />}
    </LadderContext.Provider>
  );
};

export default Ladder;
