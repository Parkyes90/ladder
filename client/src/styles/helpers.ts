export const pxToRem = (...values: number[]) => {
  return values.map((v) => `${v / 16}rem`).join(" ");
};
