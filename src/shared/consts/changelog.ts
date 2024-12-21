import React from "react";
import CheckIcon from '@/icons/checkCircle.svg';
import HammerIcon from '@/icons/hammer.svg';
import GearIcon from '@/icons/changelog/elements/gear.svg';

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
    route: "toast-updates",
    title: "Обновление системы уведомлений",
    author: "dontkillme",
    date: "21-12-2024",
    color: "rgb(31 240 145)",
    icon: React.createElement(CheckIcon),
  },
  {
    route: "6-12_changelog",
    title: "Бейджи и уведомления",
    author: "dontkillme",
    date: "06-12-2024",
    color: "rgb(31 240 145)",
    icon: React.createElement(HammerIcon),
  },
  {
    route: "changelog-new",
    title: "Новое оформление страницы изменений",
    author: "dontkillme",
    date: "12-01-2024",
    color: "#f01f4b",
    icon: React.createElement(GearIcon),
  },
  {
    route: "old-updates",
    title: "Обновления, опубликованные до новой системы патчноутов",
    author: "dontkillme",
    date: "12-01-2024",
    color: "rgb(31 240 145)",
    icon: React.createElement(HammerIcon),
  },
];


export default changeLog;