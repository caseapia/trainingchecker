import { ReactNode } from "react";

type props = {
  option: "LOAD_TIME" | "SNOW" | "TOASTS_MAX_VISIBLE";
  value: string | number | ReactNode | boolean | bigint;
}[];

export const settings: props = [
  {
    option: "LOAD_TIME",
    value: 2000,
  },
  {
    option: "SNOW",
    value: false,
  },
  {
    option: "TOASTS_MAX_VISIBLE",
    value: 3,
  }
];

export default settings