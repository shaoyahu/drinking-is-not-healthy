import { useState } from 'react';
import { ALCOHOL_RELATED_CANCERS } from '../data/sources';

/**
 * CancerExplorer — 7 种酒精相关癌症的交互式探索
 * 顶部 7 个 tab 按钮;下方左右两栏:
 *   左:器官 SVG 动效(病变区域脉动 + 扩散环 + 流动粒子)
 *   右:关键数据(风险提升 + 机制 + 一句话 + 引用)
 */

// 通用病变标记(脉动 + 扩散环 + 流动粒子)
const TumorHotspot = ({
  cx,
  cy,
  r = 18,
  color = '#ff2d2d',
  delay = 0,
}: {
  cx: number;
  cy: number;
  r?: number;
  color?: string;
  delay?: number;
}) => (
  <g className="tumor-hotspot" style={{ animationDelay: `${delay}s` }}>
    <circle cx={cx} cy={cy} r={r * 1.6} className="tumor-halo" />
    <circle cx={cx} cy={cy} r={r * 1.1} className="tumor-ring" />
    <circle cx={cx} cy={cy} r={r} fill={color} className="tumor-core" />
    <circle cx={cx} cy={cy} r={r * 0.4} fill="#fff" className="tumor-spark" />
  </g>
);

const MouthSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="口腔示意图">
    {/* 面部轮廓 */}
    <ellipse cx="200" cy="200" rx="140" ry="170" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="4 6" />
    {/* 鼻子 */}
    <path d="M 195 120 L 200 150 L 205 120" fill="none" stroke="#3a3a3a" strokeWidth="2" />
    <path d="M 185 155 Q 200 165 215 155" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
    {/* 嘴唇外圈 - 上唇"C"形 */}
    <path
      d="M 80 220
         Q 110 200 145 195
         Q 200 188 255 195
         Q 290 200 320 220
         Q 290 235 255 232
         Q 200 228 145 232
         Q 110 235 80 220 Z"
      fill="#1a0505"
      stroke="#e6e6e6"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* 上唇唇珠 */}
    <path d="M 200 188 Q 195 200 200 210 Q 205 200 200 188" fill="#5a1010" />
    {/* 嘴内(暗腔) */}
    <path
      d="M 110 222 Q 200 218 290 222 Q 280 270 200 275 Q 120 270 110 222 Z"
      fill="#0a0202"
    />
    {/* 上排牙齿 */}
    {[125, 145, 165, 185, 205, 225, 245, 265].map((x, i) => (
      <rect key={`t${i}`} x={x} y="225" width="14" height="11" fill="#e6e6e6" stroke="#888" strokeWidth="0.5" rx="1.5" />
    ))}
    {/* 下排牙齿 */}
    {[130, 150, 170, 190, 210, 230, 250, 270].map((x, i) => (
      <rect key={`b${i}`} x={x} y="248" width="14" height="10" fill="#ddd" stroke="#888" strokeWidth="0.5" rx="1.5" />
    ))}
    {/* 舌头 */}
    <ellipse cx="200" cy="268" rx="60" ry="9" fill="#5a2020" />
    {/* 病变:两颊内侧(黏膜白斑) */}
    <TumorHotspot cx={125} cy={232} r={10} delay={0} />
    <TumorHotspot cx={275} cy={232} r={10} delay={0.6} />
    <TumorHotspot cx={250} cy={245} r={6} delay={1.2} />
  </svg>
);

const PharynxSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="咽部示意图">
    {/* 头部轮廓 */}
    <ellipse cx="200" cy="100" rx="80" ry="90" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="4 6" />
    {/* 鼻腔 */}
    <rect x="170" y="40" width="60" height="50" rx="6" fill="#1a1a1a" stroke="#4a4a4a" strokeWidth="1.5" />
    <line x1="200" y1="40" x2="200" y2="90" stroke="#4a4a4a" strokeWidth="1" />
    {/* 口腔 */}
    <ellipse cx="200" cy="120" rx="50" ry="14" fill="#1a0505" stroke="#4a1a1a" strokeWidth="1" />
    {/* 咽部主体(漏斗) */}
    <path
      d="M 150 130 L 250 130 L 230 250 L 170 250 Z"
      fill="none"
      stroke="#e6e6e6"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* 咽部内壁纹理 */}
    {[145, 165, 185, 205, 225, 245].map((y, i) => (
      <line key={i} x1="160" y1={y} x2="240" y2={y} stroke="#3a3a3a" strokeWidth="0.5" />
    ))}
    {/* 食管入口 */}
    <rect x="180" y="250" width="40" height="60" rx="4" fill="none" stroke="#888" strokeWidth="1.5" />
    {/* 病变:咽后壁 */}
    <TumorHotspot cx={200} cy={190} r={14} delay={0} />
    <TumorHotspot cx={180} cy={220} r={8} delay={0.8} />
    <TumorHotspot cx={220} cy={225} r={9} delay={1.4} />
  </svg>
);

const LarynxSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="喉部示意图">
    {/* 颈部轮廓 */}
    <path d="M 130 80 Q 200 60 270 80 L 270 340 Q 200 360 130 340 Z" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="4 6" />
    {/* 甲状软骨(喉结) */}
    <path
      d="M 165 140 L 200 130 L 235 140 L 240 200 L 200 215 L 160 200 Z"
      fill="none"
      stroke="#e6e6e6"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* 喉结突出 */}
    <path d="M 195 175 L 200 200 L 205 175" fill="none" stroke="#e6e6e6" strokeWidth="2" />
    {/* 声带 */}
    <path d="M 170 240 L 230 240" stroke="#888" strokeWidth="2" />
    <path d="M 175 245 Q 200 235 225 245" stroke="#888" strokeWidth="1.5" fill="none" />
    <path d="M 175 250 Q 200 260 225 250" stroke="#888" strokeWidth="1.5" fill="none" />
    {/* 气管 */}
    {[260, 275, 290, 305, 320].map((y, i) => (
      <rect key={i} x="190" y={y} width="20" height="8" rx="2" fill="none" stroke="#666" strokeWidth="1" />
    ))}
    {/* 病变:声门上 */}
    <TumorHotspot cx={200} cy={195} r={12} delay={0} />
    <TumorHotspot cx={180} cy={215} r={7} delay={0.7} />
  </svg>
);

const EsophagusSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="食管示意图">
    {/* 胸部轮廓 */}
    <path d="M 100 100 Q 200 80 300 100 L 280 320 Q 200 340 120 320 Z" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="4 6" />
    {/* 食管主体(波浪管) */}
    <path
      d="M 180 110 Q 220 130 180 160 Q 220 190 180 220 Q 220 250 180 280 Q 220 310 200 340"
      fill="none"
      stroke="#e6e6e6"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M 200 110 Q 160 130 200 160 Q 160 190 200 220 Q 160 250 200 280 Q 160 310 180 340"
      fill="none"
      stroke="#e6e6e6"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* 食管分段标识 */}
    {[140, 180, 220, 260, 300].map((y, i) => (
      <line key={i} x1="155" y1={y} x2="225" y2={y} stroke="#3a3a3a" strokeWidth="0.6" />
    ))}
    {/* 胃连接 */}
    <path d="M 150 340 Q 200 360 250 340 L 250 380 Q 200 390 150 380 Z" fill="none" stroke="#888" strokeWidth="1.5" />
    {/* 病变:食管壁 */}
    <TumorHotspot cx={190} cy={180} r={10} delay={0} />
    <TumorHotspot cx={210} cy={230} r={12} delay={0.5} />
    <TumorHotspot cx={190} cy={280} r={8} delay={1} />
  </svg>
);

const LiverSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="肝脏示意图">
    {/* 肝右叶(大)+ 左叶(小) */}
    <path
      d="M 80 180
         Q 70 130 130 100
         Q 200 80 280 100
         Q 340 130 330 200
         Q 320 270 270 290
         Q 200 305 130 285
         Q 75 250 80 180 Z"
      fill="none"
      stroke="#e6e6e6"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* 左叶分界(镰状韧带) */}
    <path d="M 170 95 Q 165 200 180 290" fill="none" stroke="#888" strokeWidth="1.5" />
    {/* 肝内血管纹理 */}
    <path d="M 150 150 Q 200 180 250 150" fill="none" stroke="#3a3a3a" strokeWidth="0.8" />
    <path d="M 130 220 Q 200 240 280 220" fill="none" stroke="#3a3a3a" strokeWidth="0.8" />
    <path d="M 200 110 L 200 285" fill="none" stroke="#3a3a3a" strokeWidth="0.6" />
    {/* 病变:弥漫性 + 局部肿瘤 */}
    <TumorHotspot cx={140} cy={200} r={18} delay={0} />
    <TumorHotspot cx={230} cy={170} r={22} delay={0.4} />
    <TumorHotspot cx={250} cy={240} r={14} delay={0.9} />
    <TumorHotspot cx={160} cy={250} r={10} delay={1.3} />
  </svg>
);

const ColonSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="结直肠示意图">
    {/* 大肠轮廓(门字形:升结肠→横结肠→降结肠→乙状结肠→直肠) */}
    <path
      d="M 110 110
         L 110 220
         Q 110 250 140 250
         L 260 250
         Q 290 250 290 220
         L 290 110
         L 260 110
         L 260 215
         L 140 215
         L 140 110 Z"
      fill="none"
      stroke="#e6e6e6"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* 乙状结肠 */}
    <path d="M 200 250 Q 180 290 200 320 L 220 350" fill="none" stroke="#e6e6e6" strokeWidth="2.5" />
    {/* 直肠 */}
    <rect x="195" y="350" width="30" height="35" rx="3" fill="none" stroke="#e6e6e6" strokeWidth="2" />
    {/* 肠段分节(haustra) */}
    {[130, 155, 180, 205].map((x, i) => (
      <line key={`l${i}`} x1={x} y1="115" x2={x} y2="210" stroke="#3a3a3a" strokeWidth="0.6" />
    ))}
    {[125, 150, 175, 200, 225, 250, 275].map((x, i) => (
      <line key={`b${i}`} x1={x} y1="218" x2={x} y2="245" stroke="#3a3a3a" strokeWidth="0.6" />
    ))}
    {/* 病变 */}
    <TumorHotspot cx={120} cy={170} r={12} delay={0} />
    <TumorHotspot cx={270} cy={180} r={10} delay={0.6} />
    <TumorHotspot cx={200} cy={235} r={8} delay={1.1} />
    <TumorHotspot cx={210} cy={330} r={9} delay={1.5} />
  </svg>
);

const BreastSvg = () => (
  <svg viewBox="0 0 400 400" className="organ-svg" aria-label="乳腺示意图">
    {/* 上半身轮廓 */}
    <path d="M 90 80 Q 200 50 310 80 L 320 380 L 80 380 Z" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="4 6" />
    {/* 颈部 */}
    <path d="M 175 80 L 175 30 L 225 30 L 225 80" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="4 6" />
    {/* 锁骨 */}
    <path d="M 100 130 Q 200 110 300 130" fill="none" stroke="#888" strokeWidth="1.5" />
    {/* 左侧乳腺 */}
    <ellipse cx="145" cy="200" rx="55" ry="65" fill="none" stroke="#e6e6e6" strokeWidth="2.5" />
    {/* 右侧乳腺 */}
    <ellipse cx="255" cy="200" rx="55" ry="65" fill="none" stroke="#e6e6e6" strokeWidth="2.5" />
    {/* 乳晕 */}
    <circle cx="145" cy="220" r="14" fill="none" stroke="#888" strokeWidth="1.2" />
    <circle cx="255" cy="220" r="14" fill="none" stroke="#888" strokeWidth="1.2" />
    <circle cx="145" cy="220" r="4" fill="#666" />
    <circle cx="255" cy="220" r="4" fill="#666" />
    {/* 病变(主要在右侧乳腺,提示单侧也可双侧) */}
    <TumorHotspot cx={245} cy={180} r={14} delay={0} />
    <TumorHotspot cx={265} cy={210} r={9} delay={0.7} />
    <TumorHotspot cx={150} cy={195} r={6} delay={1.3} />
  </svg>
);

const ORGAN_RENDERERS: Record<string, () => JSX.Element> = {
  mouth: MouthSvg,
  pharynx: PharynxSvg,
  larynx: LarynxSvg,
  esophagus: EsophagusSvg,
  liver: LiverSvg,
  colon: ColonSvg,
  breast: BreastSvg,
};

export default function CancerExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ALCOHOL_RELATED_CANCERS[activeIdx];
  const ActiveSvg = ORGAN_RENDERERS[active.organ];
  const tabId = (i: number) => `cancer-tab-${i}`;
  const panelId = 'cancer-panel';

  // 键盘左右切换 tab
  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = ALCOHOL_RELATED_CANCERS.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (i + 1) % last;
      setActiveIdx(next);
      document.getElementById(tabId(next))?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (i - 1 + last) % last;
      setActiveIdx(prev);
      document.getElementById(tabId(prev))?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIdx(0);
      document.getElementById(tabId(0))?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIdx(last - 1);
      document.getElementById(tabId(last - 1))?.focus();
    }
  };

  return (
    <div className="cancer-explorer">
      {/* Tab 按钮 */}
      <div className="cancer-tabs" role="tablist" aria-label="7 种酒精相关癌症">
        {ALCOHOL_RELATED_CANCERS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            id={tabId(i)}
            className={`cancer-tab ${i === activeIdx ? 'is-active' : ''}`}
            onClick={() => setActiveIdx(i)}
            onKeyDown={(e) => onTabKey(e, i)}
            role="tab"
            aria-selected={i === activeIdx}
            aria-controls={panelId}
            tabIndex={i === activeIdx ? 0 : -1}
          >
            <span className="cancer-tab-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="cancer-tab-name">{c.name}</span>
            <span className="cancer-tab-en">{c.en}</span>
          </button>
        ))}
      </div>

      {/* 展示区 */}
      <div
        className="cancer-stage"
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(activeIdx)}
        key={active.name}
      >
        <div className="cancer-stage-visual">
          <div className="organ-svg-frame">
            <ActiveSvg />
            {/* 浮动数据 */}
            <div className="floating-stat">
              <div className="floating-stat-num">{active.riskUp}</div>
              <div className="floating-stat-label">{active.riskLabel}</div>
            </div>
            {/* 扫描线 */}
            <div className="scan-line" />
          </div>
        </div>

        <div className="cancer-stage-info">
          <div className="cancer-stage-eyebrow">
            <span className="cancer-stage-eyebrow-dot" />
            {active.en} · 每日 1 杯即可起算
          </div>
          <h4 className="cancer-stage-name">{active.name}</h4>
          <p className="cancer-stage-detail">{active.riskDetail}</p>

          <div className="cancer-mechanism">
            <div className="cancer-mechanism-label">致病机制</div>
            <p className="cancer-mechanism-body">{active.mechanism}</p>
          </div>

          <div className="cancer-stage-stats">
            <div className="cancer-stage-stat">
              <div className="cancer-stage-stat-num">{active.stat}</div>
              <div className="cancer-stage-stat-detail">{active.statDetail}</div>
            </div>
          </div>

          <div className="cancer-cite">
            <span className="cancer-cite-label">数据来源</span>
            <span className="cancer-cite-value">{active.cite}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
