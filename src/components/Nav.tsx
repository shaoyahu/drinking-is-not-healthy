import { useEffect, useState } from 'react';

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

export default function Nav() {
  const [open, setOpen] = useState(false);

  // 路由 hash 变了就关闭菜单
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  return (
    <nav className="nav" aria-label="主导航">
      <div className="nav-inner">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-dot" />
          喝酒有害健康
        </a>

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
