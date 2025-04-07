import {createElement, CSSProperties, ReactNode} from "react";
import HomeIcon from '@/icons/components/header/home.svg';
import ListIcon from '@/icons/components/header/list.svg';
import UserIcon from '@/icons/user.svg';
import MedalIcon from '@/icons/medal.svg';
import CopchaseIcon from '@/icons/components/header/copchase.svg';
import AdminIcon from '@/icons/components/header/admin.svg';

type HeaderProps = {
  icon: ReactNode;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: CSSProperties;
  isNew: boolean;
  tooltipText?: string;
  isDisabled: boolean;
  isMobileAvailable: boolean;
};


export const Elements: HeaderProps[] = [
  {
    text: "Главная",
    id: "main",
    icon: createElement(HomeIcon),
    link: "../",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Игроки в сети",
    id: "players",
    icon: createElement(UserIcon),
    link: "/players",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список значков",
    id: "badges",
    icon: createElement(MedalIcon),
    link: "/badges",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список миров",
    id: "worldlist",
    icon: createElement(ListIcon),
    link: "/worldlist",
    isNew: false,
    isDisabled: false,
    tooltipText: "Эта вкладка временно недоступна и отключена на серверной части. Мы оповестим вас, когда все ошибки будут исправлены.",
    isMobileAvailable: true,
  },
  {
    text: "Мониторинг копчейза",
    id: "copchase",
    icon: createElement(CopchaseIcon),
    link: '/copchase',
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Администраторы",
    id: 'admins',
    icon: createElement(AdminIcon),
    link: '/admins',
    isNew: true,
    isDisabled: false,
    isMobileAvailable: true
  }
];