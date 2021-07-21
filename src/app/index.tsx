import { Header } from "components/header";
import React from "react";
import styled from "styled-components";
import { BASE_COLORS } from "../styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${BASE_COLORS.BLUE_GREY_25};
`;

function App() {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
}

export default App;
