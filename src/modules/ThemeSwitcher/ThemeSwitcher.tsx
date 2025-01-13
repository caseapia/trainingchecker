import React from 'react';
import styles from './ThemeSwitcher.module.scss';
import { useTheme } from './ThemeSwitcherContext';
import DarkIcon from '@/icons/components/themeswitcher/dark.svg';
import LightIcon from '@/icons/components/themeswitcher/light.svg';

const ThemeSwitcher = () => {
  const { userTheme, changeTheme } = useTheme();

  return (
    <div
      className={`${styles.circle} ${userTheme === 'light' ? styles.light : styles.dark}`}
      data-type="circle"
      data-destiny="theme-switcher"
      onClick={changeTheme}
    >
      {userTheme === 'light' ? <DarkIcon /> : <LightIcon />}
    </div>
  );
};

export default ThemeSwitcher;
