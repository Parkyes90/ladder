import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header``;

const TitleWrapper = styled.div`
  font-variation-settings: "wght" 700;
`;

function App() {
  return (
    <Wrapper>
      <Header>
        <TitleWrapper>Ladder Game</TitleWrapper>
      </Header>
    </Wrapper>
  );
}

export default App;
