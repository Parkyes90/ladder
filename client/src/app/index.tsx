import { Header } from "components/header";
import React from "react";
import styled from "styled-components";
import { BASE_COLORS } from "../styles";
import Chat from "components/chat";
import Main from "components/main";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${BASE_COLORS.BLUE_GREY_25};
`;

const Footer = styled.footer`
  display: flex;
  .terminal-base {
    max-width: 100%;
    width: 100%;
  }
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer>
        <Chat />
      </Footer>
    </Wrapper>
  );
}

export default App;
