import { ReactNode } from "react";

type props = {
  option: "loadTime" | "snow" | "devTools" | "themeColor";
  value: string | number | ReactNode | boolean | bigint;
}[];

export const settings: props = [
  {
    option: "loadTime",
    value: 2000,
  },
  {
    option: "snow",
    value: false,
  },
  {
    option: "devTools",
    value: false,
  },
];

export default settings