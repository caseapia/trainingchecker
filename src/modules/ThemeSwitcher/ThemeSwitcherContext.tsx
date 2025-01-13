import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ userTheme: Theme; changeTheme: () => void } | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [userTheme, setUserTheme] = useState<Theme>('light');

  useEffect(() => {
    const cookieTheme = Cookies.get('user-theme') as Theme;
    if (cookieTheme) {
      setUserTheme(cookieTheme);
      document.body.classList.add(cookieTheme);
    }
  }, []);

  const changeTheme = () => {
    const newTheme = userTheme === 'light' ? 'dark' : 'light';
    setUserTheme(newTheme);
    Cookies.set('user-theme', newTheme);
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
  };

  return (
    <ThemeContext.Provider value={{ userTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
