import React from "react";
import { FaHammer } from "react-icons/fa";
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
    route: "6-12_changelog",
    title: "Бейджи и уведомления",
    author: "dontkillme",
    date: "06-12-2024",
    color: "rgb(31 240 145)",
    icon: React.createElement(FaHammer),
  },
  {
    route: "changelog-new",
    title: "Новое оформление страницы изменений",
    author: "dontkillme",
    date: "12-01-2024",
    color: "#f01f4b",
    icon: React.createElement(FaGear),
  },
  {
    route: "old-updates",
    title: "Обновления, опубликованные до новой системы патчноутов",
    author: "dontkillme",
    date: "12-01-2024",
    color: "rgb(31 240 145)",
    icon: React.createElement(FaHammer),
  },
];


export default changeLog;