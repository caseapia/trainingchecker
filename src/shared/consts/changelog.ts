import React from "react";
import { FaGear } from "react-icons/fa6";

type Props = {
  route: string;
  title: string;
  author: string;
  date: string;
  content: string[];
  color: string;
  icon: React.ReactNode;
};



export const changeLog: Props[] = [
  {
    route: "version-1",
    title: "Версия 1",
    author: "dontkillme",
    date: "10.02.2023",
    content: [
      "<li>Первое изменение</li>",
      "<li>Второе изменение</li>",
    ],
    color: "green",
    icon: React.createElement(FaGear),
  },
];


export default changeLog;