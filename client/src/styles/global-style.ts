import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { notoSansKrFontFaces } from "./fonts/noto-sans-kr";
import { interFontFaces } from "./fonts/inter";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${notoSansKrFontFaces}
  ${interFontFaces}
  html {
  font-family: "Inter", 'NotoSansKR', "Helvetica Neue", Helvetica, Arial, "맑은 고딕", malgun gothic, "돋움", Dotum, sans-serif, "Apple Color Emoji", "Noto Color Emoji";
  }
  #root {
    height: 100vh;
  }
`;
