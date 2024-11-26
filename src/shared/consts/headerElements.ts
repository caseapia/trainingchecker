import React from "react";
import { FaHome, FaList, FaMedal, FaUser } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";

type HeaderProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: React.CSSProperties;
  isNew?: boolean;
  tooltipText?: string;
};


export const Elements: HeaderProps[] = [
  {
    text: "Главная",
    id: "main",
    icon: React.createElement(FaHome),
    link: "../",
  },
  {
    text: "Игроки в сети",
    id: "players",
    icon: React.createElement(FaUser),
    link: "/players",
  },
  {
    text: "Список значков",
    id: "badges",
    icon: React.createElement(FaMedal),
    link: "/badges",
  },
  {
    text: "Список миров",
    id: "worldlist",
    icon: React.createElement(FaList),
    link: "/worldlist",
    isNew: true,
  },
  {
    text: "Политика сбора метрик",
    id: "data-collection",
    icon: React.createElement(IoAnalyticsSharp),
    link: "",
    isNew: true,
    style: {
      opacity: ".5",
    },
    tooltipText: "В процессе доработки",
  },
];
