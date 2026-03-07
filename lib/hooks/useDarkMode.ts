'use client';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
export function useDarkMode() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const toggle = useCallback(() => setTheme(isDarkMode ? 'light' : 'dark'), [isDarkMode, setTheme]);
  const enable = useCallback(() => setTheme('dark'), [setTheme]);
  const disable = useCallback(() => setTheme('light'), [setTheme]);
  return { isDarkMode, toggle, enable, disable, theme };
}
