import { useState } from 'react';
import { QA_ITEMS } from '../data/sources';

export default function QnA() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="qa" id="qa">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">07 · 常见疑问</span>
          <h2 className="display-2 section-title">"我就喝一点点,问题很大吗?"</h2>
          <p className="section-desc">
            下面 9 个问题,是我们听过最多、最多人拿来当"挡箭牌"的。每一个问题背后,
            都有《The Lancet》、《Nature》、WHO 给你准备好的答案。
          </p>
        </div>

        <div className="qa-list">
          {QA_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`qa-item${isOpen ? ' is-open' : ''}`} key={i}>
                <button
                  type="button"
                  className="qa-question"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="qa-q-text">{item.q}</span>
                  <span className="qa-q-tag">Q{i + 1}</span>
                  <span className="qa-toggle" aria-hidden>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="qa-answer">
                    <div className="qa-short">{item.shortAnswer}</div>
                    <ul className="qa-details">
                      {item.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                    <div className={`qa-verdict ${item.verdictType}`}>{item.verdict}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
