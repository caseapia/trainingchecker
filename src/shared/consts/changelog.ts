import React from "react";
import { FaGear } from "react-icons/fa6";

type Props = {
  route: string;
  title: string;
  author: string;
  date: string;
  color: string;
  icon: React.ReactNode;
};

export const changeLog: Props[] = [
  {
    route: "10-02-2023",
    title: "Новое оформление страницы изменений",
    author: "dontkillme",
    date: "10-02-2023",
    color: "#f01f4b",
    icon: React.createElement(FaGear),
  },
];


export default changeLog;