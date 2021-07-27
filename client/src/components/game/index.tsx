import { useContext, useState } from "react";
import { LadderContext } from "../ladder/context";
import styled, { css } from "styled-components";
import { BASE_COLORS, pxToRem } from "../../styles";
import { flexCenter } from "../../styles/mixins";

type Coordinate = [number, number];

type Coordinates = Coordinate[];

const MAX_HEIGHT = 12;

interface GameWrapperProps {
  cols: number;
}

const Wrapper = styled.div`
  ${() => css`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  `}
`;

const ParticipantsWrapper = styled.div`
  ${flexCenter};
  color: ${BASE_COLORS.BLUE_GREY_25};
  border-top-left-radius: ${pxToRem(12)};
  border-top-right-radius: ${pxToRem(12)};
  padding: ${pxToRem(16)};
  background-color: ${BASE_COLORS.BLUE_GREY_920};
  font-size: ${pxToRem(24)};
  font-weight: 700;
`;

const GameWrapper = styled.div<GameWrapperProps>`
  ${({ cols }) => css`
    flex: 1;
    display: grid;
    padding: ${pxToRem(16)};
    grid-template-columns: repeat(${cols}, minmax(${pxToRem(80)}, 1fr));
    grid-gap: ${pxToRem(30)};
    align-items: center;
    background: ${BASE_COLORS.BLUE_GREY_500};
    overflow: auto;
    border-bottom-left-radius: ${pxToRem(12)};
    border-bottom-right-radius: ${pxToRem(12)};
  `}
`;

const Input = styled.input`
  ${() => css`
    height: ${pxToRem(20)};
    border-radius: ${pxToRem(8)};
    text-align: center;
  `}
`;

const Game = () => {
  const { participants } = useContext(LadderContext);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    Array.from(new Array(participants)).reduce((acc, _, index) => {
      return acc.concat([
        [index, 0],
        [index, MAX_HEIGHT],
      ]);
    }, [])
  );

  return (
    <Wrapper>
      <ParticipantsWrapper>{participants}</ParticipantsWrapper>
      <GameWrapper cols={participants}>
        {coordinates.map(([x, y], index) => {
          return <Input type="text" key={index} placeholder="Input Value" />;
        })}
      </GameWrapper>
    </Wrapper>
  );
};

export default Game;
