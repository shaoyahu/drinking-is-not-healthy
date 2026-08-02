/**
 * BingeCulture — 酒桌文化反击指南
 *
 *  1. 拆穿"千年酒文化"话术：酒文化 ≠ 酒桌文化
 *  2. 古代名人/经典打脸：唯酒无量不及乱 / 酒大热有毒 / 独酌对月
 *  3. 劝酒的真相：本质是"服从测试"
 *  4. 6 个能直接用的拒酒话术
 *  5. 一句金句收尾
 */

const CULTURE_VS_BINGE = [
  {
    label: '酒文化',
    sub: '真的传承千年',
    side: 'good' as const,
    points: ['诗酒风雅', '独酌对月', '兴之所至', '微醺即止', '古代主流'],
    icon: '🍶',
  },
  {
    label: '酒桌文化',
    sub: '实际 30 多年',
    side: 'bad' as const,
    points: ['干杯劝酒', '敬酒罚酒', '服从测试', '烂醉为荣', '80 年代后产物'],
    icon: '🍻',
  },
];

const ANCIENT_QUOTES = [
  {
    who: '孔子',
    book: '《论语》',
    quote: '唯酒无量,不及乱。',
    note: '喝多少都行,但不能乱 — 古代主流从来不是"喝倒"。',
  },
  {
    who: '李时珍',
    book: '《本草纲目》',
    quote: '酒,大热,有毒。',
    note: '明代医学经典定性:酒是热性毒物。',
  },
  {
    who: '陶渊明',
    book: '《归去来兮辞》',
    quote: '引壶觞以自酌,眄庭柯以怡颜。',
    note: '辞官归隐后戒了豪饮,改成"自酌"。',
  },
  {
    who: '李白',
    book: '《月下独酌》',
    quote: '举杯邀明月,对影成三人。',
    note: '千古名场面 — 独饮,不是"干"。',
  },
];

// 劝酒话术拆穿
const TRANSLATIONS = [
  { from: '"再喝一个,别这么不给面子"', to: '"再做一次伤害自己的事"' },
  { from: '"不喝就是看不起我"', to: '"我让你自残来证明你服我"' },
  { from: '"今天不醉不归"', to: '"今天我要看你难受"' },
  { from: '"男人不能说不"', to: '"男子气概 = 拿健康献祭"' },
];

const TIPS = [
  {
    num: '01',
    icon: '💊',
    title: '借医生 / 身体',
    sub: '最稳的免死金牌',
    lines: [
      '「体检转氨酶偏高,医生让戒三个月了」',
      '「在吃头孢,真不能喝」',
      '「胃出血住过院,您饶了我吧」',
    ],
    tag: '成功率 95%',
  },
  {
    num: '02',
    icon: '🍵',
    title: '以茶代酒 / 反关心',
    sub: '把"喝"变成"敬"',
    lines: [
      '「我以茶代酒,心意到了」',
      '「看您也喝了不少,要不咱都少喝点?」',
      '「我陪您喝饮料,身体是自己的」',
    ],
    tag: '让对方下台阶',
  },
  {
    num: '03',
    icon: '🥋',
    title: '太极推手',
    sub: '不伤和气地拒',
    lines: [
      '「我酒量真不行,怕倒了给您添麻烦」',
      '「一会儿还得开车,警察查得严」',
      '「我这人喝一口就脸红,表演吗?」',
    ],
    tag: '万能回避',
  },
  {
    num: '04',
    icon: '📚',
    title: '直接亮观点',
    sub: '关系够用时',
    lines: [
      '「《柳叶刀》说安全饮酒量是 0」',
      '「我去年戒的,您支持一下」',
      '「我研究过,这事儿真不行」',
    ],
    tag: '需要气场',
  },
  {
    num: '05',
    icon: '🪞',
    title: '反问',
    sub: '拆穿"面子"逻辑',
    lines: [
      '「您怎么不劝您自己儿子多喝?」',
      '「我喝多了您送我回去?」',
      '「真关心我就别劝啊」',
    ],
    tag: '直球',
  },
  {
    num: '06',
    icon: '🎭',
    title: '自嘲 + 用别的抵',
    sub: '不喝也行,其他补上',
    lines: [
      '「我不喝,但我唱歌/讲故事/买单」',
      '「这杯我干了(水),诚意到了吧」',
      '「我以讲故事代酒,讲三个不重复」',
    ],
    tag: '化解尴尬',
  },
];

export default function BingeCulture() {
  return (
    <section id="binge">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">08 · 酒桌文化反击</span>
          <h2 className="display-2 section-title">
            传承千年的<span style={{ color: 'var(--danger-bright)' }}>不是</span>酒桌文化
          </h2>
          <p className="section-desc">
            有人拿"酒文化传承千年"来劝酒?这是把两码事故意混在一起说 —
            <strong style={{ color: 'var(--text-0)' }}>酒文化是风雅,酒桌文化是服从测试</strong>。
            下面把这两件事拆清楚,再给你 6 句能直接抄的话术。
          </p>
        </div>

        {/* —— Part 1: 概念拆解 —— */}
        <div className="culture-vs">
          <div className="culture-vs-side culture-vs-good">
            <div className="culture-vs-icon">{CULTURE_VS_BINGE[0].icon}</div>
            <div className="culture-vs-label">{CULTURE_VS_BINGE[0].label}</div>
            <div className="culture-vs-sub">{CULTURE_VS_BINGE[0].sub}</div>
            <ul className="culture-vs-points">
              {CULTURE_VS_BINGE[0].points.map((p) => (
                <li key={p}>
                  <span className="culture-vs-check">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="culture-vs-divider">
            <div className="culture-vs-vs">VS</div>
            <div className="culture-vs-divider-line" />
          </div>

          <div className="culture-vs-side culture-vs-bad">
            <div className="culture-vs-icon">{CULTURE_VS_BINGE[1].icon}</div>
            <div className="culture-vs-label">{CULTURE_VS_BINGE[1].label}</div>
            <div className="culture-vs-sub">{CULTURE_VS_BINGE[1].sub}</div>
            <ul className="culture-vs-points">
              {CULTURE_VS_BINGE[1].points.map((p) => (
                <li key={p}>
                  <span className="culture-vs-x">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* —— Part 2: 古代名人/经典打脸 —— */}
        <h3 className="display-3" style={{ marginTop: 64, marginBottom: 24 }}>
          古代<span style={{ color: 'var(--warning)' }}>根本没这回事</span> — 经典原文打脸
        </h3>

        <div className="ancient-quotes">
          {ANCIENT_QUOTES.map((q) => (
            <div className="ancient-quote" key={q.who}>
              <div className="ancient-quote-book">{q.book}</div>
              <div className="ancient-quote-body">
                <div className="ancient-quote-mark">「</div>
                <div className="ancient-quote-text">{q.quote}</div>
                <div className="ancient-quote-mark ancient-quote-mark-end">」</div>
              </div>
              <div className="ancient-quote-meta">
                <span className="ancient-quote-who">— {q.who}</span>
                <span className="ancient-quote-note">{q.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* —— Part 3: 劝酒话术拆穿 —— */}
        <h3 className="display-3" style={{ marginTop: 64, marginBottom: 16 }}>
          劝酒的<span style={{ color: 'var(--danger-bright)' }}>真相</span>:把它翻译成大白话
        </h3>
        <p className="section-desc" style={{ marginBottom: 24 }}>
          劝酒从来不是"热情",本质是一场"服从测试"。当有人劝酒时,把它在心里翻译一遍 —
          翻译完你就会发现,<strong style={{ color: 'var(--text-0)' }}>劝酒就是道德绑架你伤害自己身体</strong>。
        </p>

        <div className="translate-list">
          {TRANSLATIONS.map((t) => (
            <div className="translate-row" key={t.from}>
              <div className="translate-from">
                <span className="translate-label">TA 说</span>
                <span className="translate-text">{t.from}</span>
              </div>
              <div className="translate-arrow">→</div>
              <div className="translate-to">
                <span className="translate-label translate-label-real">翻译</span>
                <span className="translate-text">{t.to}</span>
              </div>
            </div>
          ))}
        </div>

        {/* —— Part 4: 6 个实操话术 —— */}
        <h3 className="display-3" style={{ marginTop: 64, marginBottom: 8 }}>
          6 句<span style={{ color: 'var(--accent)' }}>直接抄</span>的拒酒话术
        </h3>
        <p className="section-desc" style={{ marginBottom: 32 }}>
          不用背,挑 2-3 句顺口的装脑子里。桌上一秒钟决定不下来的时候,挑个最稳的。
        </p>

        <div className="tips-grid">
          {TIPS.map((t) => (
            <div className="tip-card" key={t.num}>
              <div className="tip-card-head">
                <div className="tip-card-num">{t.num}</div>
                <div className="tip-card-icon">{t.icon}</div>
              </div>
              <div className="tip-card-title">{t.title}</div>
              <div className="tip-card-sub">{t.sub}</div>
              <ul className="tip-card-lines">
                {t.lines.map((l, i) => (
                  <li key={i}>
                    <span className="tip-card-quote">"</span>
                    {l}
                    <span className="tip-card-quote">"</span>
                  </li>
                ))}
              </ul>
              <div className="tip-card-tag">{t.tag}</div>
            </div>
          ))}
        </div>

        {/* —— 收尾金句 —— */}
        <div className="binge-verdict">
          <div className="binge-verdict-eyebrow">一句话总结</div>
          <p className="binge-verdict-line">
            传承千年的<span style={{ color: 'var(--warning)' }}>不是</span>酒桌文化
            <br />
            是<span style={{ color: 'var(--warning)' }}>"唯酒无量,不及乱"</span>
          </p>
          <p className="binge-verdict-sub">
            — 孔子,《论语》<br />
            你敬的不是"我喝",是"我服";真正的酒文化,从来都是喝到微醺就停。
          </p>
        </div>
      </div>
    </section>
  );
}
