import styled, { css } from "styled-components";
import { flexCenter } from "../../styles/mixins";
import { BASE_COLORS, pxToRem } from "../../styles";

export const Wrapper = styled.div`
  ${() => css`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  `}
`;

export const ParticipantsWrapper = styled.div`
  ${flexCenter};
  color: ${BASE_COLORS.BLUE_GREY_25};
  border-top-left-radius: ${pxToRem(12)};
  border-top-right-radius: ${pxToRem(12)};
  padding: ${pxToRem(16)};
  background-color: ${BASE_COLORS.BLUE_GREY_920};
  font-size: ${pxToRem(24)};
  font-weight: 700;
`;
