import { useContext, useEffect, useRef } from "react";
import { LadderContext } from "../ladder/context";
import { Wrapper } from "components/chat/styles";
import { ParticipantsWrapper } from "./styles";
import _ from "lodash";

const MAX_HEIGHT = 12;

const Game = () => {
  const { participants } = useContext(LadderContext);
  const ladderWrapper = useRef<HTMLDivElement>(null);
  const ladder = useRef<HTMLCanvasElement>(null);
  const footPrint: any = {};
  const setRandomNode = () => {
    _.range(MAX_HEIGHT).forEach((row) => {
      _.range(participants).forEach((col) => {
        const node = `${col}-${row}`;
        const rand = Math.floor(Math.random() * 2);
        if (rand === 0) {
          footPrint[node] = { change: false, draw: false };
        } else {
          if (col === participants - 1) {
            footPrint[node] = { change: false, draw: false };
          } else {
            footPrint[node] = { change: true, draw: true };
            footPrint[`${col + 1}-${row}`] = { change: true, draw: false };
          }
        }
      });
    });
  };
  const setDefaultFootPrint = () => {
    _.range(MAX_HEIGHT).forEach((row) => {
      _.range(participants).forEach((col) => {
        const node = `${col}-${row}`;
        footPrint[node] = false;
      });
    });
  };

  const drawRowLine = () => {
    return _.range(MAX_HEIGHT).reduce((acc: any[], row) => {
      return acc.concat(
        _.range(participants).map((col) => {
          return (
            <div
              key={`${row}${col}`}
              style={{
                position: "absolute",
                left: col * 100,
                top: row * 25,
                width: 20,
                height: 20,
                background: "yellow",
              }}
            />
          );
        })
      );
    }, []);
  };
  useEffect(() => {
    if (!ladderWrapper.current || !ladder.current) {
      return () => {};
    }
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
        style={{ ...style, backgroundColor: "lightgray", position: "relative" }}
      >
        {drawRowLine()}
        <canvas ref={ladder} style={style} />
      </div>
    </Wrapper>
  );
};

export default Game;
