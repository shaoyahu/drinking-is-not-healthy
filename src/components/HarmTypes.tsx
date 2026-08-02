import CancerExplorer from './CancerExplorer';

const HARM_CATEGORIES = [
  {
    icon: '🧬',
    name: '一级致癌',
    en: 'Group 1 Carcinogen',
    body: (
      <>
        国际癌症研究机构(IARC / WHO)把酒精列为 <strong>Group 1 一级致癌物</strong>,
        与石棉、烟草、辐射同级。酒精代谢产物乙醛能直接破坏 DNA,导致 7 种癌症 —
        口腔、咽、喉、食管、肝、结直肠、乳腺癌。
      </>
    ),
  },
  {
    icon: '🧠',
    name: '大脑萎缩',
    en: 'Brain Atrophy',
    body: (
      <>
        《Nature Communications》2022 年研究:<strong>每天 1-2 罐啤酒</strong>就让脑灰质、白质体积开始下降,
        与脑指数变化是<strong>指数关系</strong>。8g 纯酒精就是损伤临界点。一次性"断片"会永久伤害海马体。
      </>
    ),
  },
  {
    icon: '❤️',
    name: '心血管',
    en: 'Cardiovascular',
    body: (
      <>
        《The Lancet》2018 年 60 万人研究:即使每天 1 杯,中风、高血压、心衰风险已显著上升。
        长期饮酒导致心肌病、心律失常(房颤)、血压失控 — 没有保护阈值,只有风险曲线。
      </>
    ),
  },
  {
    icon: '🫀',
    name: '肝脏',
    en: 'Liver Disease',
    body: (
      <>
        酒精性脂肪肝 → 酒精性肝炎 → 肝硬化 → 肝癌,这是一条<strong>四步走</strong>的不归路。
        中国 2002-2013 年间,酒精性肝病比例翻了一倍多,98% 是男性。中国 45-59 岁男性饮酒率高达 62%。
      </>
    ),
  },
  {
    icon: '🤰',
    name: '胎儿',
    en: 'Fetal Harm',
    body: (
      <>
        胎儿酒精综合征(FAS):孕期饮酒导致<strong>永久性</strong>中枢神经损伤、面部特征异常、智力障碍。
        全球 7.7/1000 儿童受累 — 是排名第一的可预防智力障碍原因。孕期<strong>没有任何"安全剂量"</strong>。
      </>
    ),
  },
  {
    icon: '😔',
    name: '精神与依赖',
    en: 'Mental Health',
    body: (
      <>
        酒精是抑郁、焦虑、自杀、自残的独立风险因素。慢性酒精中毒者中 6-20% 有过自杀行为。
        酒精代谢物会<strong>改写海马体表观遗传</strong>,让"想喝"的冲动越来越强 — 成瘾是生理的,不是意志力问题。
      </>
    ),
  },
  {
    icon: '🩸',
    name: '急性伤害',
    en: 'Acute Injury',
    body: (
      <>
        15-49 岁人群酒精相关死亡,主因是<strong>交通事故、自残、暴力</strong>。酒后判断力下降,
        22% 的工伤与饮酒相关,43% 斗殴受伤者体内酒精浓度较高。断片会永久损伤海马体与前额皮质。
      </>
    ),
  },
  {
    icon: '🦠',
    name: '免疫与感染',
    en: 'Immunity',
    body: (
      <>
        酒精削弱免疫系统,提高肺结核、肺炎、HIV 感染等风险。
        每年 300 万酒精相关死亡中,相当比例是<strong>感染性疾病加重</strong>所致。酒后感染新冠重症风险也更高。
      </>
    ),
  },
];

export default function HarmTypes() {
  return (
    <section id="harm">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">03 · 全方位危害</span>
          <h2 className="display-2 section-title">不止伤肝 — 几乎影响全身每一个系统</h2>
          <p className="section-desc">
            酒精是少数能<strong style={{ color: 'var(--text-1)' }}>穿透全身所有器官</strong>的物质之一,
            它不只伤肝,而是从大脑到脚趾,无一幸免。下面是 IARC、WHO、The Lancet、Nature 系列期刊给出的核心结论。
          </p>
        </div>

        <div className="harm-grid">
          {HARM_CATEGORIES.map((c) => (
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

        <h3 className="display-3" style={{ marginTop: 64, marginBottom: 12 }}>
          7 种与酒精有<strong style={{ color: 'var(--danger-bright)' }}> 因果关系</strong>的癌症
        </h3>
        <p className="section-desc" style={{ marginBottom: 0 }}>
          IARC 把这 7 种癌症与酒精的关系定为<strong> Group 1(充分证据)</strong>。全球每年 74 万新增癌症直接归因于酒精,
          相当于每 18 个癌症患者里就有 1 个是"喝出来的"。乳腺癌是其中最隐蔽的 —
          全球每 20 个乳腺癌就有 1 个与酒精相关。
        </p>

        <CancerExplorer />
      </div>
    </section>
  );
}
