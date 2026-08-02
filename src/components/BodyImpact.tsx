import { useEffect, useRef, useState } from 'react';

const ORGANS = [
  { id: 'brain', name: '脑 · Brain', stat: '每喝 1 罐啤酒,脑灰质就开始缩小', cite: 'Nature Comms 2022' },
  { id: 'heart', name: '心 · Heart', stat: '每天 1 杯红酒,心血管风险已经升高', cite: 'Lancet 2018 (n=599,912)' },
  { id: 'liver', name: '肝 · Liver', stat: '中国 640 万酒精性肝硬化,男 62% 喝酒', cite: 'BMC Medicine 2023' },
];

/**
 * BodyImpact — 一滴酒,3 个器官亮红灯
 *
 * 视频循环播放(6s),JS 用 rAF 跟 video.currentTime,
 * 在 0-2s / 2-4s / 4-6s 三个相位分别高亮对应的右侧卡片。
 * 视频本身在 ~0.5s 内已经全部点亮,这是"全局冲击";
 * 卡片相位窗口是"逐一讲解"——两者分工,各司其职。
 */
export default function BodyImpact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeId, setActiveId] = useState<string>('brain');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let lastId = activeId;

    // 视频 ready 后再启动 rAF,避免 currentTime 一直为 0 时空转
    const start = () => {
      const tick = () => {
        const t = video.currentTime;
        const id = !isFinite(t) || t < 0.1
          ? 'brain'
          : t % 6 < 2
          ? 'brain'
          : t % 6 < 4
          ? 'heart'
          : 'liver';
        if (id !== lastId) {
          lastId = id;
          setActiveId(id);
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    if (video.readyState >= 2 /* HAVE_CURRENT_DATA */) {
      start();
    } else {
      const onLoaded = () => {
        video.removeEventListener('loadeddata', onLoaded);
        start();
      };
      video.addEventListener('loadeddata', onLoaded);
      return () => {
        cancelAnimationFrame(rafId);
        video.removeEventListener('loadeddata', onLoaded);
      };
    }
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="body-impact" id="body-impact">
      <div className="body-impact-inner">
        <div className="body-impact-video-wrap">
          <video
            ref={videoRef}
            className="body-impact-video"
            src={`${import.meta.env.BASE_URL}videos/body-organs.mp4`}
            autoPlay
            muted
            loop
            playsInline
            aria-label="人体器官依次亮起警示红光动画,示意酒精对身体多系统的攻击"
          />
        </div>

        <div className="body-impact-text">
          <span className="eyebrow">02 · 视觉优先</span>
          <h2 className="display-2 section-title">
            一滴酒
            <br />
            <span className="red">3 个器官亮红灯</span>
          </h2>

          <div className="organ-callouts" role="list">
            {ORGANS.map((o) => {
              const isActive = activeId === o.id;
              return (
                <div
                  key={o.id}
                  className={`organ-callout${isActive ? ' is-active' : ''}`}
                  data-organ={o.id}
                  role="listitem"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="organ-dot" aria-hidden="true" />
                  <div className="organ-info">
                    <div className="organ-name">{o.name}</div>
                    <div className="organ-stat">{o.stat}</div>
                    <div className="organ-cite">{o.cite}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
