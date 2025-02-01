import React, {ReactNode} from "react";

type props = {
  option: 'preloader' | 'loadTime' | 'snow' | 'headerText';
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
    value: 'TRAINING&nbsp;<span style="color: #f01f4b">CHECKER</span>',
  },
];

export default settings