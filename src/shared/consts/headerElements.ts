import React from "react";
import { FaHome, FaList, FaMedal, FaUser, FaClipboardList } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";

type HeaderProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: React.CSSProperties;
  isNew: boolean;
  tooltipText?: string;
  isDisabled: boolean;
  isMobileAvailable: boolean;
};


export const Elements: HeaderProps[] = [
  {
    text: "Главная",
    id: "main",
    icon: React.createElement(FaHome),
    link: "../",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Игроки в сети",
    id: "players",
    icon: React.createElement(FaUser),
    link: "/players",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список значков",
    id: "badges",
    icon: React.createElement(FaMedal),
    link: "/badges",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список миров",
    id: "worldlist",
    icon: React.createElement(FaList),
    link: "/worldlist",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Политика сбора метрик",
    id: "data-collection",
    icon: React.createElement(IoAnalyticsSharp),
    link: "/data-collection",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список изменений",
    id: "changelog",
    icon: React.createElement(FaClipboardList),
    link: "/changelog",
    isNew: true,
    isDisabled: false,
    isMobileAvailable: true,
  },
];
