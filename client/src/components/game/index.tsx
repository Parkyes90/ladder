import { useContext, useState } from "react";
import { LadderContext } from "../ladder/context";

type Coordinate = [number, number];

type Coordinates = Coordinate[];

const Game = () => {
  const { participants } = useContext(LadderContext);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    new Array(participants).map((_, index) => {
      return [index, 0];
    })
  );
  console.log(coordinates);
  return <div>{participants}</div>;
};

export default Game;
