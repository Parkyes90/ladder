import styled from "styled-components";
import { pxToRem } from "../../styles";
import Ladder from "../ladder";

const Wrapper = styled.main`
  padding: ${pxToRem(16)};
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
