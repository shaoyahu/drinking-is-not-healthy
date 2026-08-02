export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* 背景循环视频:暗色血滴入水,电影感氛围 */}
      <video
        className="hero-bg-video"
        src={`${import.meta.env.BASE_URL}videos/hero-loop.mp4`}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero-bg-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <span className="eyebrow">基于 WHO · The Lancet · IARC 权威医学证据</span>

        <h1 className="display-1 hero-headline">
          喝酒 <span className="red">有害</span>
          <br />
          <span className="strike">健康</span>
        </h1>

        <h2 className="display-3 hero-headline" style={{ marginTop: 12 }}>
          <span className="muted" style={{ fontWeight: 700 }}>安全剂量</span>{' '}
          <span className="red">= 0</span>
        </h2>

        <p className="lead hero-sub">
          世卫组织把酒精列为<strong> 一级致癌物</strong>。
          全球每年<strong> 260 万人</strong>因饮酒死亡 — 每 <strong>20 人</strong>就有 1 人。
          没有"适量",只有<strong style={{ color: 'var(--danger-bright)' }}>不同程度的伤害</strong>。
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#body-impact">
            看看它在你身体里做了什么 →
          </a>
          <a className="btn btn-ghost" href="#qa">
            "喝一点行不行?"答疑
          </a>
        </div>
      </div>
    </section>
  );
}
