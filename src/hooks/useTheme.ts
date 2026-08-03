import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'din-theme';
const META_THEME_COLORS: Record<Theme, string> = {
  // 同步浏览器 chrome(地址栏)颜色,看起来更原生
  dark: '#0a0a0a',
  light: '#fafafa',
};

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return 'dark';
}

/**
 * 管理整站主题:
 * 1. 初值来自 <html data-theme="">,由 index.html 的内联脚本提前设好(防闪烁)
 * 2. 切换时同步写回 data-theme、localStorage、meta[name=theme-color]
 * 3. 没手动设过时,跟随系统 prefers-color-scheme 变化
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  // 写主题:DOM + localStorage + meta theme-color
  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore quota / private mode errors
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', META_THEME_COLORS[next]);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      applyTheme(next);
    },
    [applyTheme],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  // 跟随系统:仅当用户没手动设过(localStorage 没值)时响应
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return; // 用户已经手动选过,别覆盖
      } catch {
        return;
      }
      const next: Theme = e.matches ? 'light' : 'dark';
      setThemeState(next);
      applyTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [applyTheme]);

  return { theme, setTheme, toggleTheme };
}
