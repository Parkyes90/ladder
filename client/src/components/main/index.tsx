import styled from "styled-components";
import { pxToRem } from "../../styles";
import Ladder from "../ladder";

const Wrapper = styled.main`
  padding: ${pxToRem(64)};
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
  return (
    <Wrapper>
      <Ladder />
    </Wrapper>
  );
};

export default Main;
