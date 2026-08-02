import { SOURCES, type Source } from '../data/sources';

// 标签色板 — 与 global.css 中 .source-tag[data-tag] 的属性对应
// 红色 = 癌症, 粉 = 心血管, 紫 = 大脑, 橙 = 肝脏, 蓝 = 胎儿
// 琥珀 = 家庭/暴力, 国红 = 中国, 青 = 全球, 亮蓝 = 政策, 绿 = 治疗, 灰 = 损伤
const TOPIC_COLORS: Record<string, string> = {
  癌症: 'red',
  心血管: 'pink',
  大脑: 'purple',
  肝脏: 'orange',
  胎儿: 'blue',
  '家庭/暴力': 'amber',
  中国: 'flag',
  全球: 'cyan',
  政策: 'azure',
  治疗: 'green',
  损伤: 'gray',
};

function Tag({ kind, label }: { kind: string; label: string }) {
  return (
    <span className="source-tag" data-kind={kind} title={label}>
      {label}
    </span>
  );
}

function SourceCard({ s }: { s: Source }) {
  return (
    <article className="source-item">
      {/* 第一行:主题色卡(一眼看出在讲什么) + 研究类型 + 期刊标识 */}
      <div className="source-tags">
        {s.tags?.map((t) => (
          <Tag key={t} kind={TOPIC_COLORS[t] ?? 'gray'} label={t} />
        ))}
        {s.type && <Tag kind="type" label={s.type} />}
        {s.journalTag && <Tag kind="journal" label={s.journalTag} />}
      </div>

      {/* 标题 */}
      <h3 className="source-title">{s.title}</h3>

      {/* 作者 + 年份 + 期刊/出版方 */}
      <div className="source-meta">
        {s.authors} · {s.year}
        {s.journal ? ` · ${s.journal}` : ''}
        {s.publisher && !s.journal ? ` · ${s.publisher}` : ''}
      </div>

      {/* 一句话核心发现 */}
      {s.note && <p className="source-note">{s.note}</p>}

      {/* DOI / PMID — 让文献可被引用、可被核实 */}
      {(s.doi || s.pmid) && (
        <div className="source-ids">
          {s.doi && (
            <span className="source-id">
              <span className="source-id-label">DOI</span>
              <code>{s.doi}</code>
            </span>
          )}
          {s.pmid && (
            <span className="source-id">
              <span className="source-id-label">PMID</span>
              <code>{s.pmid}</code>
            </span>
          )}
        </div>
      )}

      {/* 醒目的查看全文按钮 */}
      <a
        className="source-link"
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>查看全文</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 11L11 3M11 3H4.5M11 3V9.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}

export default function Sources() {
  return (
    <section className="sources" id="sources">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">09 · 权威文献</span>
          <h2 className="display-2 section-title">每一个数字,都可以溯源</h2>
          <p className="section-desc">
            下面 <strong>35 篇</strong>全部来自公开的同行评审论文或 WHO/IARC/柳叶刀等权威机构。
            每张卡片顶部的色卡说明主题领域,右侧给出期刊与影响因子,点击底部按钮直达原文。
          </p>

          {/* 顶部图例:让用户一眼读懂色卡含义 */}
          <div className="sources-legend">
            <div className="legend-group">
              <span className="legend-label">主题</span>
              {Object.keys(TOPIC_COLORS).map((k) => (
                <Tag key={k} kind={TOPIC_COLORS[k]} label={k} />
              ))}
            </div>
            <div className="legend-group">
              <span className="legend-label">类型</span>
              <Tag kind="type" label="证据强度" />
            </div>
            <div className="legend-group">
              <span className="legend-label">期刊</span>
              <Tag kind="journal" label="影响因子" />
            </div>
          </div>
        </div>

        <div className="sources-list">
          {SOURCES.map((s) => (
            <SourceCard key={s.id} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
