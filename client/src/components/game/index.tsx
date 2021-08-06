import { useContext, useEffect, useRef, useState, MouseEvent } from "react";
import { LadderContext } from "../ladder/context";
import { Wrapper } from "components/chat/styles";
import { ParticipantsWrapper } from "./styles";
import _ from "lodash";
import "./styles.css";

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
  const dim = useRef<HTMLDivElement>(null);
  const [work, setWork] = useState(false);
  const footprint: any = {};
  const usersEntry: any = {};
  const handleClick =
    (node: string, color: string) => (e: MouseEvent<HTMLButtonElement>) => {
      if (work) {
        return false;
      }
      dim.current?.remove();
      setWork(true);
      setDefaultFootPrint();
      startLineDrawing(node, color);
    };
  const startLineDrawing = (node: string, color: string) => {
    const col = +node.split("-")[0];
    const row = +node.split("-")[1];
    // @ts-ignore
    const nodeInfo = footprint[node];

    // @ts-ignore
    footprint[node] = true;

    if (row === MAX_HEIGHT) {
      setDefaultFootPrint();
      setWork(false);
      return false;
    }
    if (nodeInfo["change"]) {
      let leftNode = col - 1 + "-" + col;
      let rightNode = col + 1 + "-" + col;
      let downNode = col + "-" + (col + 1);
      let leftNodeInfo = footprint[leftNode];
      let rightNodeInfo = footprint[rightNode];

      if (
        footprint.hasOwnProperty(leftNode) &&
        footprint.hasOwnProperty(rightNode)
      ) {
        leftNodeInfo = footprint[leftNode];
        rightNodeInfo = footprint[rightNode];
        if (
          leftNodeInfo["change"] &&
          leftNodeInfo["draw"] &&
          !footprint[leftNode] &&
          rightNodeInfo["change"] &&
          leftNodeInfo["draw"] &&
          !footprint[rightNode]
        ) {
          //Left우선
          console.log("중복일때  LEFT 우선");
          stokeLine({
            row,
            col,
            color,
            width: "3",
            dir: "l",
            flag: "w",
          });
          setTimeout(function () {
            return startLineDrawing(leftNode, color);
          }, 100);
        } else if (
          leftNodeInfo["change"] &&
          !leftNodeInfo["draw"] &&
          !footprint[leftNode] &&
          rightNodeInfo["change"] &&
          !footprint[rightNode]
        ) {
          console.log("RIGHT 우선");
          stokeLine({
            row,
            col,
            color,
            width: "3",
            dir: "r",
            flag: "w",
          });
          console.log("right");
          setTimeout(function () {
            return startLineDrawing(rightNode, color);
          }, 100);
        } else if (
          leftNodeInfo["change"] &&
          leftNodeInfo["draw"] &&
          !footprint[leftNode] &&
          !rightNodeInfo["change"]
        ) {
          //Left우선
          console.log("LEFT 우선");
          stokeLine({
            row,
            col,
            color,
            width: "3",
            dir: "l",
            flag: "w",
          });
          setTimeout(function () {
            return startLineDrawing(leftNode, color);
          }, 100);
        } else if (
          !leftNodeInfo["change"] &&
          rightNodeInfo["change"] &&
          !footprint[rightNode]
        ) {
          //Right우선
          console.log("RIGHT 우선");
          stokeLine({
            row,
            col,
            color,
            width: "3",
            dir: "r",
            flag: "w",
          });
          setTimeout(function () {
            return startLineDrawing(rightNode, color);
          }, 100);
        } else {
          console.log("DOWN 우선");
          stokeLine({
            row,
            col,
            color,
            width: "3",
            dir: "d",
            flag: "h",
          });
          setTimeout(function () {
            return startLineDrawing(downNode, color);
          }, 100);
        }
      } else {
        console.log("else");
        if (
          !footprint.hasOwnProperty(leftNode) &&
          footprint.hasOwnProperty(rightNode)
        ) {
          /// 좌측라인
          console.log("좌측라인");
          if (
            rightNodeInfo["change"] &&
            !rightNodeInfo["draw"] &&
            !footprint[rightNode]
          ) {
            //Right우선
            console.log("RIGHT 우선");
            stokeLine({
              row,
              col,
              color,
              width: "3",
              dir: "r",
              flag: "w",
            });
            setTimeout(function () {
              return startLineDrawing(rightNode, color);
            }, 100);
          } else {
            console.log("DOWN");
            stokeLine({
              row,
              col,
              color,
              width: "3",
              dir: "d",
              flag: "h",
            });
            setTimeout(function () {
              return startLineDrawing(downNode, color);
            }, 100);
          }
        } else if (
          footprint.hasOwnProperty(leftNode) &&
          !footprint.hasOwnProperty(rightNode)
        ) {
          /// 우측라인
          console.log("우측라인");
          if (
            leftNodeInfo["change"] &&
            leftNodeInfo["draw"] &&
            !footprint[leftNode]
          ) {
            //Right우선
            console.log("LEFT 우선");
            stokeLine({
              row,
              col,
              color,
              width: "3",
              dir: "l",
              flag: "w",
            });
            setTimeout(function () {
              return startLineDrawing(leftNode, color);
            }, 100);
          } else {
            console.log("DOWN");
            stokeLine({
              row,
              col,
              color,
              width: "3",
              dir: "d",
              flag: "h",
            });
            setTimeout(function () {
              return startLineDrawing(downNode, color);
            }, 100);
          }
        }
      }
    } else {
      console.log("down");
      const downNode = col + "-" + (row + 1);
      stokeLine({
        row,
        col,
        flag: "h",
        dir: "d",
        color: "#ddd",
        width: "3",
      });
      setTimeout(function () {
        return startLineDrawing(downNode, color);
      }, 100);
    }
  };
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
    return _.range(user.length).map((i) => {
      const letters = "0123456789ABCDEF";
      const color = `#${_.range(4)
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("")}`;
      const col = +user[i].split("-")[0];
      const left = col * 100 - 30;
      return (
        <div style={{ left }} key={i} className="user-wrap">
          <input type="text" data-node={user[i]} />
          <button
            onClick={handleClick(user[i], color)}
            className="ladder-start"
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
        <div style={{ left }} key={i} className="answer-wrap">
          <input type="text" data-node={node} />
          <p id={`${node}-user`} />
        </div>
      );
    });
  };

  const drawDefaultLine = () => {
    return (
      <table>
        <tbody>
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
        </tbody>
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
              className="node"
              data-left={col * 100}
              data-top={row * 25}
              id={`${row}${col}`}
              style={{
                position: "absolute",
                left: col * 100,
                top: row * 25,
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
    if (flag === "w") {
      if (dir === "r") {
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
  setUsersEntry();
  drawNodeLine();

  return (
    <Wrapper>
      <ParticipantsWrapper>{participants}</ParticipantsWrapper>
      <div
        className="ladder"
        ref={ladderWrapper}
        style={{ ...style, position: "relative" }}
      >
        {drawRowLine()}
        {drawDefaultLine()}
        {users()}
        {results()}
        <div className="dim" ref={dim} />
        <canvas ref={ladder} style={style} />
      </div>
    </Wrapper>
  );
};

export default Game;
