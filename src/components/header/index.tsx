import React from "react";
import styled from "styled-components";
import { BASE_COLORS, pxToRem } from "../../styles";
const Wrapper = styled.header`
  padding: ${pxToRem(16, 20)};
  border-radius: ${pxToRem(12)};
  border: ${pxToRem(1)} solid ${BASE_COLORS.BLUE_GREY_200};
`;

const TitleWrapper = styled.div`
  font-size: ${pxToRem(32)};
  font-variation-settings: "wght" 700;
  color: ${BASE_COLORS.BLUE_GREY_920};
`;
export const Header = () => {
  return (
    <Wrapper>
      <TitleWrapper>Ladder Game</TitleWrapper>
    </Wrapper>
  );
};
