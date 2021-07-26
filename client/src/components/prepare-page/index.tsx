import {
  Constraints,
  ControlWrapper,
  Form,
  Input,
  OperatorButton,
  StartButton,
  Wrapper,
} from "./styles";
import { FormEvent, useContext } from "react";
import { LadderContext } from "../ladder/context";

export const PreparePage = () => {
  const { participants, setState } = useContext(LadderContext);
  const handleClickMinus = () => {
    if (participants > 2) {
      setState((prevState) => ({
        ...prevState,
        participants: participants - 1,
      }));
    }
  };

  const handleClickPlus = () => {
    if (participants < 24) {
      setState((prevState) => ({
        ...prevState,
        participants: participants + 1,
      }));
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, isStart: true }));
  };
  return (
    <Wrapper>
      <Constraints>Participants: 2 ~ 24</Constraints>
      <Form onSubmit={handleSubmit}>
        <ControlWrapper>
          <OperatorButton onClick={handleClickMinus} type="button">
            -
          </OperatorButton>
          <Input type="number" value={participants} min={2} max={24} />
          <OperatorButton onClick={handleClickPlus} type="button">
            +
          </OperatorButton>
        </ControlWrapper>
        <StartButton>Start</StartButton>
      </Form>
    </Wrapper>
  );
};
