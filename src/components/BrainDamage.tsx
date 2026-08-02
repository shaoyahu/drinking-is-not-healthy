export default function BrainDamage() {
  return (
    <section className="brain" id="brain">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">04 · 你看不见的伤害</span>
          <h2 className="display-2 section-title">每天 1 罐啤酒,大脑就开始萎缩</h2>
        </div>

        <div className="brain-grid">
          <div>
            <div className="brain-figure">-0.127</div>
            <div className="brain-figure-label">脑灰质体积变化(标准差) · 每天 1-2 个酒精单位</div>

            <p style={{ color: 'var(--text-1)', fontSize: 17, lineHeight: 1.7, marginTop: 16 }}>
              36,000 多人的脑部 MRI 数据发现:即使是<strong style={{ color: 'var(--danger-bright)' }}>适度饮酒</strong>,
              也会让大脑变小。
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
              8g 纯酒精(约 1 罐啤酒)就是损伤临界点;超过后体积下降呈<strong style={{ color: 'var(--danger-bright)' }}>指数</strong>。
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
              一次性"断片"还会永久伤害海马体(记忆)和前额皮质(决策),
              影响在停止饮酒后仍持续<strong> 6 周</strong>。
            </p>

            <div style={{
              marginTop: 20,
              padding: '10px 14px',
              borderLeft: '3px solid var(--warning)',
              background: 'rgba(255, 157, 0, 0.04)',
              fontSize: 13,
              color: 'var(--text-2)',
              borderRadius: '0 4px 4px 0',
            }}>
              <strong style={{ color: 'var(--warning)' }}>Source · </strong>
              Daviet et al., <em>Nature Communications</em>, 13: 1575, 2022
            </div>
          </div>

          {/* 视频替代原静态 SVG — 视觉冲击力强几个数量级 */}
          <div className="brain-viz">
            <video
              className="brain-video"
              src={`${import.meta.env.BASE_URL}videos/brain-damage.mp4`}
              autoPlay
              muted
              loop
              playsInline
              aria-label="3D 医学动画,展示酒精侵蚀大脑神经网络的过程"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
