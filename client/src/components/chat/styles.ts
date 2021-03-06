import styled from "styled-components";
import { BASE_COLORS, pxToRem } from "../../styles";
export const Wrapper = styled.div`
  width: 100%;
`;
export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${pxToRem(200)};

  div {
    flex: 1;
    overflow: auto;
    color: ${BASE_COLORS.BLUE_GREY_25};

    &::-webkit-scrollbar {
    }

    &::-webkit-scrollbar-thumb {
    }
    &::-webkit-scrollbar {
      background: none;
      width: ${pxToRem(4)};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: ${pxToRem(4)};
      background: ${BASE_COLORS.BLUE_GREY_700};
    }
  }
  form {
    display: flex;
  }
  input {
    width: 100%;
    margin-top: auto;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
    padding: ${pxToRem(8)};
    border-color: ${BASE_COLORS.BLUE_GREY_500};
    color: ${BASE_COLORS.WHITE};
    background-color: ${BASE_COLORS.BLUE_GREY_920};
  }
`;

export const CommentWrapper = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: ${pxToRem(4, 8)};
`;

export const Title = styled.div`
  font-weight: 700;
  background-color: ${BASE_COLORS.BLUE_GREY_940};
  color: ${BASE_COLORS.WHITE};
  padding: ${pxToRem(16, 8)};
`;
