import { useState } from "react";

import { LadderContext, LadderState } from "./context";
import { PreparePage } from "../prepare-page";

const Ladder = () => {
  const [state, setState] = useState<LadderState>({
    isStart: false,
    participants: 6,
  });

  return (
    <LadderContext.Provider value={{ ...state, setState }}>
      {state.isStart ? (
        <div>Ladder Participants: {state.participants}</div>
      ) : (
        <PreparePage />
      )}
    </LadderContext.Provider>
  );
};

export default Ladder;
