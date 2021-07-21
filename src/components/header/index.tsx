import React from "react";
import styled from "styled-components";
import { BASE_COLORS, pxToRem } from "../../styles";
import { flexCenter } from "../../styles/mixins";
const Wrapper = styled.header`
  ${flexCenter};
  padding: ${pxToRem(40, 0, 0, 0)};
`;

const TitleWrapper = styled.div`
  ${flexCenter};
  height: ${pxToRem(60)};
  padding: ${pxToRem(16, 20)};
  max-width: ${pxToRem(240)};
  border-radius: ${pxToRem(12)};
  border: ${pxToRem(1)} solid ${BASE_COLORS.BLUE_GREY_200};
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
