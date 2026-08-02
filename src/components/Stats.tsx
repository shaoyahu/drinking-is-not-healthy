import { useCallback, useEffect, useRef, useState } from 'react';
import { KEY_STATS } from '../data/sources';

const ROTATE_MS = 4200; // 每条停留 4.2s
const RESUME_MS = 6000; // 用户操作后 6s 再恢复轮转

export default function Stats() {
  const total = KEY_STATS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // 鼠标悬停 / 键盘焦点时暂停
  const [locked, setLocked] = useState(false); // 用户点击锁定,数秒后解锁
  const [inView, setInView] = useState(true); // 离屏时也暂停,避免空转
  const [progress, setProgress] = useState(0); // 0~100,当前项进度条

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resumeTimer = useRef<number | null>(null);
  const startedAt = useRef<number>(Date.now());
  const pausedFor = useRef<number>(0);

  // 离屏检测 — 用 IntersectionObserver,看不见时不跑 rAF
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 自动轮转:每隔 ROTATE_MS 切换一次;锁定 / 暂停 / 离屏 时跳过
  useEffect(() => {
    if (!inView) return; // 离屏直接不启动 rAF

    let raf = 0;
    let lastTick = Date.now();

    const tick = () => {
      const now = Date.now();
      const dt = now - lastTick;
      lastTick = now;

      if (!paused && !locked) {
        const elapsed = now - startedAt.current - pausedFor.current;
        const slot = elapsed % ROTATE_MS;
        // 切换判定放在前面,避免 98% → 0% 的视觉闪烁
        if (slot >= ROTATE_MS - 50) {
          setActive((i) => (i + 1) % total);
          startedAt.current = now;
          pausedFor.current = 0;
          setProgress(0);
        } else {
          setProgress((slot / ROTATE_MS) * 100);
        }
      } else if (locked) {
        // 锁定时 progress 满
        setProgress(100);
      } else {
        // 暂停时累加暂停时间
        pausedFor.current += dt;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, locked, inView, total]);

  // 切换 active 时重置起点 + 滚动菜单让 active 可见
  useEffect(() => {
    startedAt.current = Date.now();
    pausedFor.current = 0;
    setProgress(0);
    // 在 mobile/tablet 下,菜单是横向滚动的,把 active 滚到视野内
    const item = itemRefs.current[active];
    if (item && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      // 仅在菜单是横向滚动模式时(item 可能不在视野内)才滚
      if (itemRect.left < menuRect.left || itemRect.right > menuRect.right) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [active]);

  // 点击菜单项:立刻跳到该索引,并锁定 N 秒
  const jumpTo = (i: number) => {
    setActive(i);
    setLocked(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setLocked(false), RESUME_MS);
  };

  // 键盘左右切换
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const explorer = sectionRef.current;
      if (!explorer) return;
      const rect = explorer.getBoundingClientRect();
      // 只在 stats 区块进入视口时响应
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        jumpTo((active + 1) % total);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        jumpTo((active - 1 + total) % total);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, total]);

  // 稳定的 ref 回调(避免每次 render 重建 → React 重复 null/ref 设值)
  const setItemRef = useCallback((i: number) => (el: HTMLButtonElement | null) => {
    itemRefs.current[i] = el;
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);
  const current = KEY_STATS[active];

  return (
    <section
      className="stats"
      id="data"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">01 · 硬数据</span>
          <h2 className="display-2 section-title">
            几组数字,看清酒精的真实代价
          </h2>
          <p className="section-desc">
            下面每一个数字都来自 WHO、The Lancet 或 IARC 的同行评审研究,不是危言耸听,
            是 30 亿人、几十年、几百项研究汇集出来的结论。
            <span className="stats-hint">
              <span className="stats-hint-icon" aria-hidden>▸</span>
              鼠标悬停暂停,点击菜单锁定查看,方向键 ←/→ 切换
            </span>
          </p>
        </div>

        <div className="stats-explorer">
          {/* —— 左侧:数字菜单 —— */}
          <div className="stats-menu" role="tablist" aria-label="核心数据指标" ref={menuRef}>
            {KEY_STATS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`stats-menu-item${isActive ? ' is-active' : ''}`}
                  onClick={() => jumpTo(i)}
                  ref={setItemRef(i)}
                >
                  {isActive && (
                    <span
                      className="stats-menu-progress"
                      style={{ width: `${progress}%` }}
                      aria-hidden
                    />
                  )}
                  <span className="stats-menu-num">{s.figure}</span>
                  <span className="stats-menu-label">{s.label}</span>
                  <span className="stats-menu-arrow" aria-hidden>→</span>
                </button>
              );
            })}
          </div>

          {/* —— 右侧:详情卡 —— */}
          <div
            className="stats-detail"
            key={active /* 切换时重新挂载,触发动画 */}
            role="tabpanel"
            id="stats-detail-panel"
            aria-live="polite"
          >
            <div className="stats-detail-inner">
              <div className="stats-detail-eyebrow">
                <span className="stats-detail-dot" aria-hidden />
                <span className="stats-detail-counter">
                  {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <span className="stats-detail-mode">
                  {!inView
                    ? '已离屏 · 进入视口后继续'
                    : locked
                    ? '已锁定 · 6s 后继续轮转'
                    : paused
                    ? '已暂停'
                    : '自动轮转中'}
                </span>
              </div>

              <div className="stats-detail-figure">{current.figure}</div>
              {current.unit && (
                <div className="stats-detail-unit">{current.unit}</div>
              )}

              <h3 className="stats-detail-label">{current.label}</h3>
              <p className="stats-detail-sub">{current.sub}</p>

              <div className="stats-detail-foot">
                <span className="stats-detail-source-label">SOURCE</span>
                <span className="stats-detail-source">{current.source}</span>
              </div>

              <div className="stats-detail-nav">
                <button
                  type="button"
                  className="stats-detail-btn"
                  onClick={() => jumpTo((active - 1 + total) % total)}
                  aria-label="上一条"
                >
                  ← 上一条
                </button>
                <button
                  type="button"
                  className="stats-detail-btn"
                  onClick={() => jumpTo((active + 1) % total)}
                  aria-label="下一条"
                >
                  下一条 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
