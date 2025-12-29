import { useCallback, useEffect, useMemo, useState } from 'react';

const storageKey = 'startup-network-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const stored = window.localStorage.getItem(storageKey);
  if (stored) {
    return stored;
  }
  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);
};

export default useTheme;
