import NotoSansKrThin from "assets/fonts/Noto_Sans_KR/NotoSansKR-Thin.otf";
import NotoSansKrLight from "assets/fonts/Noto_Sans_KR/NotoSansKR-Light.otf";
import NotoSansKrRegular from "assets/fonts/Noto_Sans_KR/NotoSansKR-Regular.otf";
import NotoSansKrMedium from "assets/fonts/Noto_Sans_KR/NotoSansKR-Medium.otf";
import NotoSansKrBold from "assets/fonts/Noto_Sans_KR/NotoSansKR-Bold.otf";
import NotoSansKrBlack from "assets/fonts/Noto_Sans_KR/NotoSansKR-Black.otf";
import { css } from "styled-components";

export const notoSansKrFontFaces = css`
  @font-face {
    font-family: "NotoSansKR";
    font-weight: 200;
    src: url(${NotoSansKrThin});
  }

  @font-face {
    font-family: "NotoSansKR";
    font-weight: 300;
    src: url(${NotoSansKrLight});
  }

  @font-face {
    font-family: "NotoSansKR";
    font-weight: 400;
    src: url(${NotoSansKrRegular});
  }

  @font-face {
    font-family: "NotoSansKR";
    font-weight: 500;
    src: url(${NotoSansKrMedium});
  }

  @font-face {
    font-family: "NotoSansKR";
    font-weight: 700;
    src: url(${NotoSansKrBold});
  }

  @font-face {
    font-family: "NotoSansKR";
    font-weight: 900;
    src: url(${NotoSansKrBlack});
  }
`;
