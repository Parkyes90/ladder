import { useContext, useEffect, useRef } from "react";
import { LadderContext } from "../ladder/context";
import { Wrapper } from "components/chat/styles";
import { ParticipantsWrapper } from "./styles";
import _ from "lodash";

const MAX_HEIGHT = 12;

interface StokeLineProps {
  row: number;
  col: number;
  flag: string;
  dir: string;
  color: string;
  width: string;
}

const Game = () => {
  const { participants } = useContext(LadderContext);
  const ladderWrapper = useRef<HTMLDivElement>(null);
  const ladder = useRef<HTMLCanvasElement>(null);
  const footprint: any = {};
  const usersEntry: any = {};
  const setRandomNode = () => {
    _.range(MAX_HEIGHT).forEach((row) => {
      _.range(participants).forEach((col) => {
        const node = `${col}-${row}`;
        const rand = Math.floor(Math.random() * 2);
        if (rand === 0) {
          footprint[node] = { change: false, draw: false };
        } else {
          if (col === participants - 1) {
            footprint[node] = { change: false, draw: false };
          } else {
            footprint[node] = { change: true, draw: true };
            footprint[`${col + 1}-${row}`] = { change: true, draw: false };
          }
        }
      });
    });
  };
  const setDefaultFootPrint = () => {
    _.range(MAX_HEIGHT).forEach((row) => {
      _.range(participants).forEach((col) => {
        const node = `${col}-${row}`;
        footprint[node] = false;
      });
    });
  };

  const setUsersEntry = () => {
    _.range(MAX_HEIGHT).forEach((row) => {
      usersEntry[row] = _.range(participants).map((col) => `${col}-${row}`);
    });
  };

  const users = () => {
    const user = usersEntry[0];
    return _.range(usersEntry.length).map((i) => {
      const letters = "0123456789ABCDEF";
      const color = `#${_.range(4)
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("")}`;
      const col = +user[i].split("-")[0];
      const left = col * 100 - 30;
      return (
        <div style={{ left }}>
          <input type="text" data-node={user[i]} />
          <button
            style={{ backgroundColor: color }}
            data-color={color}
            data-node={user[i]}
          />
        </div>
      );
    });
  };

  const results = () => {
    const result = usersEntry[MAX_HEIGHT - 1];

    return _.range(result.length).map((i) => {
      const col = +result[i].split("-")[0];
      const row = +result[i].split("-")[1] + 1;
      const node = `${row}-${col}`;
      const left = col * 100 - 30;
      return (
        <div style={{ left }}>
          <input type="text" data-node={node} />
          <p id={`${node}-user`} />
        </div>
      );
    });
  };

  const drawDefaultLine = () => {
    return (
      <table>
        {_.range(MAX_HEIGHT).reduce((acc: any[], row) => {
          return acc.concat(
            _.range(participants).map((col) => {
              return (
                <tr
                  key={`${row}${col}`}
                  style={{
                    position: "absolute",
                    width: 98,
                    height: 25,
                    borderLeft: "2px solid #ddd",
                    borderRight: "2px solid #ddd",
                  }}
                />
              );
            })
          );
        }, [])}
      </table>
    );
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

  const drawNodeLine = () => {
    _.range(MAX_HEIGHT).forEach((row) => {
      _.range(participants).forEach((col) => {
        const node = `${col}-${row}`;
        const info = footprint[node];
        if (info.ch && info.draw) {
          stokeLine({
            row,
            col,
            flag: "w",
            dir: "r",
            color: "#ddd",
            width: "2",
          });
        }
      });
    });
  };
  const stokeLine = ({ row, col, color, dir, flag, width }: StokeLineProps) => {
    const ctx = ladder.current?.getContext("2d");
    let moveToStart;
    let moveToEnd;
    let lineToStart;
    let lineToEnd;
    const eachWidth = 100;
    const eachHeight = 25;
    if (flag == "w") {
      if (dir == "r") {
        ctx?.beginPath();
        moveToStart = row * eachWidth;
        moveToEnd = col * eachHeight;
        lineToStart = (row + 1) * eachWidth;
        lineToEnd = col * eachHeight;
      } else {
        ctx?.beginPath();
        moveToStart = row * eachWidth;
        moveToEnd = col * eachHeight;
        lineToStart = (row - 1) * eachWidth;
        lineToEnd = col * eachHeight;
      }
    } else {
      ctx?.beginPath();
      moveToStart = row * eachWidth;
      moveToEnd = col * eachHeight;
      lineToStart = row * eachWidth;
      lineToEnd = (col + 1) * eachHeight;
    }

    ctx?.moveTo(moveToStart + 3, moveToEnd + 2);
    ctx?.lineTo(lineToStart + 3, lineToEnd + 2);
    Object.assign(ctx, {
      strokeStyle: color,
      lineWidth: width,
    });
    ctx?.stroke();
    ctx?.closePath();
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

  setDefaultFootPrint();
  setRandomNode();
  drawNodeLine();

  return (
    <Wrapper>
      <ParticipantsWrapper>{participants}</ParticipantsWrapper>
      <div
        ref={ladderWrapper}
        style={{ ...style, backgroundColor: "lightgray", position: "relative" }}
      >
        {drawRowLine()}
        {drawDefaultLine()}
        {users()}
        {results()}
        <canvas ref={ladder} style={style} />
      </div>
    </Wrapper>
  );
};

export default Game;
