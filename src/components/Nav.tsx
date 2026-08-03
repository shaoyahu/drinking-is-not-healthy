import { useEffect, useState } from 'react';
import type { Theme } from '../hooks/useTheme';

const LINKS = [
  { href: '#data', label: '硬数据' },
  { href: '#body-impact', label: '身体图' },
  { href: '#harm', label: '全方位危害' },
  { href: '#brain', label: '大脑损伤' },
  { href: '#china', label: '中国数据' },
  { href: '#social', label: '社会成本' },
  { href: '#qa', label: '常见疑问' },
  { href: '#binge', label: '酒桌文化' },
  { href: '#sources', label: '文献' },
];

interface NavProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [open, setOpen] = useState(false);

  // 路由 hash 变了就关闭菜单
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav className="nav" aria-label="主导航">
      <div className="nav-inner">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-dot" />
          喝酒有害健康
        </a>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
          aria-pressed={!isDark}
          title={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
        >
          {isDark ? (
            // 月亮 → 点击切到 light
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // 太阳 → 点击切到 dark
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <ul className={`nav-links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
