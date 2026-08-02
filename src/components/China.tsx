import { CHINA_STATS } from '../data/sources';

export default function China() {
  return (
    <section className="china" id="china">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">05 · 中国数据</span>
          <h2 className="display-2 section-title">中国,是全球酒精致死人数最多的国家</h2>
          <p className="section-desc">
            WHO《2018 全球酒精与健康报告》点名中国:人均纯酒精消费量十年间从 4.1 升
            增至 7.2 升,增幅 76%;终身戒酒率却从 50.9% 跌到 42.1%。中国男性饮酒率 48%,
            45-59 岁年龄段高达 62%。中国人正以一国之力,托住全球酒精消费的"重灾区"。
          </p>
        </div>

        <div className="china-grid">
          {CHINA_STATS.map((c) => (
            <div className="china-cell" key={c.label}>
              <div className="china-figure">{c.figure}</div>
              <div className="china-label">{c.label}</div>
              <div className="china-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            padding: '24px 28px',
            background: 'rgba(255, 157, 0, 0.04)',
            border: '1px solid rgba(255, 157, 0, 0.2)',
            borderRadius: 8,
            color: 'var(--text-1)',
          }}
        >
          <h3 className="heading" style={{ color: 'var(--warning)', marginBottom: 12 }}>
            为什么中国人对酒精更脆弱?
          </h3>
          <p style={{ color: 'var(--text-2)', fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            约 <strong>1/3 的东亚人(主要集中在中国、日本、韩国)</strong>携带 ALDH2*2 基因变异,
            乙醛脱氢酶活性低,乙醛代谢慢。"喝酒脸红"不是"能喝",恰恰是 DNA 损伤正在发生的信号 —
            乙醛是明确的致癌物,这部分人群的食道癌、胃癌、肝癌风险显著高于欧美人。
            此外,中国人的酒桌文化(白酒 + 啤酒 + 红酒混喝、空腹豪饮、夜宵酒局)
            让"急性伤害"和"长期累积"同时发生,这是中国数据特别严峻的根因之一。
          </p>
        </div>
      </div>
    </section>
  );
}
