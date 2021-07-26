import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";
import { BASE_COLORS, pxToRem } from "../../styles";
import { FEATURE_COLORS } from "../../styles/colors/features";

export const Wrapper = styled.div`
  margin-top: -10%;
`;

export const Form = styled.form`
  ${flexCenter};
  flex-direction: column;
`;

export const Input = styled.input`
  display: flex;
  justify-content: center;
  outline: none;
  align-items: center;
  border-radius: 50%;
  width: ${pxToRem(100)};
  height: ${pxToRem(100)};
  font-size: ${pxToRem(64)};
  color: ${BASE_COLORS.BLUE_GREY_920};
  border-color: ${BASE_COLORS.BLUE_GREY_920};
  text-align: center;
  margin-left: ${pxToRem(24)};
  margin-right: ${pxToRem(24)};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const OperatorButton = styled.button`
  ${flexCenter};
  cursor: pointer;
  width: ${pxToRem(48)};
  border-radius: 50%;
  border: none;
  background-color: ${BASE_COLORS.BLUE_GREY_920};
  color: ${BASE_COLORS.WHITE};
  font-weight: 700;
  font-size: ${pxToRem(36)};
  height: ${pxToRem(48)};

  &:hover {
    background-color: ${FEATURE_COLORS.WARNING};
  }
  &:active {
    background-color: ${FEATURE_COLORS.DANGER};
  }
`;

export const StartButton = styled.button`
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
  font-weight: 700;
  font-size: ${pxToRem(36)};
  &:hover {
    color: ${FEATURE_COLORS.SUCCESS};
  }

  &:active {
    color: ${FEATURE_COLORS.INFO};
  }
`;

export const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${pxToRem(32)};
`;

export const Constraints = styled.div`
  ${flexCenter};
  color: ${FEATURE_COLORS.PRIMARY};
  font-weight: bold;
  margin-bottom: ${pxToRem(32)};
`;
