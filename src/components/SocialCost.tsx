import { SOCIAL_STATS } from '../data/sources';

const SOCIAL_HARMS = [
  {
    icon: '👊',
    name: '家庭暴力',
    en: 'Domestic Violence',
    body: (
      <>
        全球约 <strong>30%</strong> 已婚/曾同居女性一生中遭受过身体或性暴力;亲密伴侣暴力(IPV)肇事者中{' '}
        <strong>35-38% 有显著酒精问题</strong>,25-50% 的暴力事件发生时酒精在场。
        蒙古 GBD 2019 数据:72% 的暴力犯罪由酒精驱动。
      </>
    ),
  },
  {
    icon: '👶',
    name: '胎儿与代际',
    en: 'Fetal & Generational',
    body: (
      <>
        全球胎儿酒精综合征(FAS)流行率约 <strong>7.7/1000</strong> 儿童
        — 是排名第一的可预防智力障碍原因。儿童 FAS 平均 IQ 仅 63,
        终身不可逆,治疗就是预防。
      </>
    ),
  },
  {
    icon: '💰',
    name: '经济损失',
    en: 'Economic Burden',
    body: (
      <>
        酒精造成的经济损失占 GDP 的 <strong>1-2%</strong>(泰国 1.02%、南非高达 10-12%);
        美国仅 IPV 一项的终身成本就达 <strong>4.7 万亿美元</strong>。
        企业层面:35-50% 的工伤、43% 的斗殴、约一半的交通事故与饮酒相关。
      </>
    ),
  },
  {
    icon: '🚗',
    name: '交通事故',
    en: 'Traffic Injury',
    body: (
      <>
        WHO 2024:全球 <strong>724K</strong> 人因酒精相关伤害死亡(交通事故、自残、暴力)。
        酒后驾驶使车祸风险提高 <strong>2-10 倍</strong>。中国 2011 年起酒驾入刑,
        但仍是道路伤害的头号可预防因素。
      </>
    ),
  },
  {
    icon: '🦠',
    name: '感染与免疫',
    en: 'Infections',
    body: (
      <>
        GBD 2021:全球范围内,酒精使用是结核病 DALY 的主要归因风险因素之一;
        在低 SDI 国家,酒精已超过烟草成为男性结核病头号归因风险。
        慢性饮酒者感染肺结核风险升高 2-3 倍,免疫功能全面受抑。
      </>
    ),
  },
  {
    icon: '🧠',
    name: '精神与共病',
    en: 'Mental Health',
    body: (
      <>
        酒精是抑郁、焦虑、自杀、自残的<strong>独立风险因素</strong>;
        慢性酒精中毒者中 6-20% 有过自杀行为,重度抑郁共病率 40-60%。
        全球仅抑郁一项每年造成 <strong>1 万亿美元</strong>生产力损失
        (Lancet-World Psychiatric Association Commission 2022)。
      </>
    ),
  },
];

export default function SocialCost() {
  return (
    <section className="social" id="social">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">06 · 不止伤害喝的人</span>
          <h2 className="display-2 section-title">
            一杯酒,伤的不只是你 — 还有家人、同事、路人
          </h2>
          <p className="section-desc">
            酒精是少数几种<strong style={{ color: 'var(--text-1)' }}>伤害他人大于伤害自己</strong>的成瘾物质。
            WHO 2024 报告强调:全球 4 亿 AUD 患者造成的家庭暴力、交通事故、犯罪、工伤、早产,
            让<strong>"他人成本"</strong>几乎等于医疗成本本身。下面是几组数字,看清真相。
          </p>
        </div>

        <div className="social-stats-grid" style={{ marginBottom: 48 }}>
          {SOCIAL_STATS.map((s) => (
            <div className="social-stat-card" key={s.label}>
              <div className="social-stat-figure">{s.figure}</div>
              {s.unit && <div className="social-stat-unit">{s.unit}</div>}
              <div className="social-stat-label">{s.label}</div>
              <div className="social-stat-sub">{s.sub}</div>
              <div className="social-stat-source">[{s.source}]</div>
            </div>
          ))}
        </div>

        <h3 className="display-3" style={{ marginTop: 24, marginBottom: 12 }}>
          六大<strong style={{ color: 'var(--warning)' }}> 外溢性伤害</strong>
        </h3>
        <p className="section-desc" style={{ marginBottom: 0 }}>
          传统讨论往往聚焦"喝酒对身体的伤害",但现代公共卫生越来越重视<strong style={{ color: 'var(--text-1)' }}>他人成本
          (harm to others)</strong> — 你的家人、同事、路上的陌生人。
        </p>

        <div className="harm-grid" style={{ marginTop: 32 }}>
          {SOCIAL_HARMS.map((c) => (
            <div className="harm-card" key={c.name}>
              <span className="harm-icon" aria-hidden>
                {c.icon}
              </span>
              <div className="harm-name">{c.name}</div>
              <div className="harm-en">{c.en}</div>
              <div className="harm-body">{c.body}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: '28px 32px',
            background: 'rgba(255, 45, 45, 0.06)',
            border: '1px solid rgba(255, 45, 45, 0.25)',
            borderRadius: 8,
          }}
        >
          <h3 className="heading" style={{ color: 'var(--danger-bright)', marginBottom: 12 }}>
            关于"我应酬不喝办不成事"
          </h3>
          <p style={{ color: 'var(--text-1)', fontSize: 16, lineHeight: 1.75, margin: 0 }}>
            这是酒精文化最常见、最具破坏力的话术。
            真相是:<strong>商业谈判成功率与参与者是否清醒无关,与合作方实际利益相关</strong>;
            而酒后签下的合同、误判的风险、酒驾回家路上的危险,反而是对方最不希望承担的。
            澳大利亚政府委托研究显示,酒精造成的"<strong style={{ color: 'var(--text-1)' }}>
            对他人伤害(AHTO)</strong>"约 AUD <strong>198 亿</strong>/年,
            其中 <strong>89% 由家人和私人个体承担</strong>,不是企业,不是政府 —
            受害最深的就是你最亲近的人。
          </p>
        </div>
      </div>
    </section>
  );
}
