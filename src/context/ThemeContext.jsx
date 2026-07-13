import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('biosmart-theme-mode') || 'auto';
  });

  const getResolvedTheme = (mode) => {
    if (mode === 'light') return 'light';
    if (mode === 'dark') return 'dark';
    if (mode === 'auto') {
      const hour = new Date().getHours();
      return (hour >= 6 && hour < 18) ? 'light' : 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(() => getResolvedTheme(themeMode));

  useEffect(() => {
    const updateTheme = () => {
      const resolved = getResolvedTheme(themeMode);
      setTheme(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
    };

    updateTheme();
    localStorage.setItem('biosmart-theme-mode', themeMode);

    let intervalId;
    if (themeMode === 'auto') {
      intervalId = setInterval(updateTheme, 10000); // Check every 10 seconds for dynamic theme switching
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'auto';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
