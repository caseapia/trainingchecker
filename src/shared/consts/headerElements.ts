import React from "react";
import { FaHome, FaList, FaMedal, FaUser } from "react-icons/fa";

type HeaderProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: React.CSSProperties;
  isNew?: boolean;
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
    id: "worlds",
    icon: React.createElement(FaList),
    link: "/worldlist",
    isNew: true,
  },
];
