import { useContext, useEffect, useRef } from "react";
import { LadderContext } from "../ladder/context";
import { Wrapper } from "components/chat/styles";
import { ParticipantsWrapper } from "./styles";

const MAX_HEIGHT = 12;

const Game = () => {
  const { participants } = useContext(LadderContext);
  const ladderWrapper = useRef<HTMLDivElement>(null);
  const ladder = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ladderWrapper.current || !ladder.current) {
      return () => {};
    }
    console.log(ladder.current);
  }, []);

  const style = {
    width: (participants - 1) * 100 + 6,
    height: (MAX_HEIGHT - 1) * 25 + 6,
  };

  return (
    <Wrapper>
      <ParticipantsWrapper>{participants}</ParticipantsWrapper>
      <div
        ref={ladderWrapper}
        style={{ ...style, backgroundColor: "lightgray" }}
      >
        <canvas ref={ladder} style={style} />
      </div>
    </Wrapper>
  );
};

export default Game;
