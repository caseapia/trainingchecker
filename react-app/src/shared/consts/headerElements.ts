import React from "react";
import { FaHome, FaList, FaUser } from "react-icons/fa";

type HeaderProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: React.CSSProperties;
};


export const Elements: HeaderProps[] = [
  {
    text: "Главная",
    id: "",
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
    text: "Список миров",
    id: "worlds",
    icon: React.createElement(FaList),
    link: "",
    style: { pointerEvents: 'none', opacity: '.7' },
  },
];
