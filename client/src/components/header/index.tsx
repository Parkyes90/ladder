import React from "react";
import styled from "styled-components";
import { BASE_COLORS, pxToRem } from "../../styles";
import { flexCenter } from "../../styles/mixins";
const Wrapper = styled.header`
  padding: ${pxToRem(0, 16, 0, 0)};
`;

const TitleWrapper = styled.div`
  ${flexCenter};
  background-color: ${BASE_COLORS.BLUE_GREY_990};
  padding: ${pxToRem(8, 12)};
  max-width: ${pxToRem(240)};
  border: ${pxToRem(1)} solid ${BASE_COLORS.BLUE_GREY_200};
  font-size: ${pxToRem(16)};
  font-variation-settings: "wght" 700;
  color: ${BASE_COLORS.WHITE};
`;
export const Header = () => {
  return (
    <Wrapper>
      <TitleWrapper>Ghost Leg</TitleWrapper>
    </Wrapper>
  );
};
