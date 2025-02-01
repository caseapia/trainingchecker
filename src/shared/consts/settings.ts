import React, {ReactNode} from "react";

type props = {
  option: 'preloader' | 'loadTime' | 'snow' | 'headerText' | 'devTools';
  value: string | number | ReactNode | boolean;
}[];

export const settings: props = [
  {
    option: 'preloader',
    value: 'default',
  },
  {
    option: 'loadTime',
    value: 2000,
  },
  {
    option: 'snow',
    value: false,
  },
  {
    option: 'headerText',
    value: 'TRAINING&nbsp;<span style="color: var(--color-red)">CHECKER</span>',
  },
  {
    option: 'devTools',
    value: false,
  },
];

export default settings