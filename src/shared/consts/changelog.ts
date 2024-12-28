import React from "react";
import CheckIcon from '@/icons/checkCircle.svg';
import MobileIcon from '@/icons/changelog/elements/mobile.svg';

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
    route: "mobile-and-states",
    title: "Мобильная адаптация, новые состояния и...",
    author: "dontkillme",
    date: "21-12-2024",
    color: "#8B5CF6",
    icon: React.createElement(MobileIcon),
  },
  {
    route: "toast-updates",
    title: "Обновление системы уведомлений",
    author: "dontkillme",
    date: "21-12-2024",
    color: "rgb(31 240 145)",
    icon: React.createElement(CheckIcon),
  },
];


export default changeLog;