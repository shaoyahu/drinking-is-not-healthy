export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-row">
          <div className="footer-tag">
            <strong>喝酒有害健康 · No Safe Dose</strong>
            <br />
            基于公开医学文献的科普项目,代码与内容采用 MIT License。
          </div>
          <div className="footer-links">
            <a href="#data">硬数据</a>
            <a href="#harm">危害</a>
            <a href="#china">中国数据</a>
            <a href="#qa">答疑</a>
            <a href="#sources">文献</a>
          </div>
        </div>

        <div className="footer-tag" style={{ fontSize: 12.5 }}>
          本页面所有数据均来自公开医学研究,不代表任何机构立场。如需转载,
          请保留作者署名与原文链接。本项目不提供任何医疗建议 — 如果你或家人正在被酒瘾困扰,
          请前往当地精神卫生中心、综合医院心理科,或登录国家卫健委"健康中国"官方平台查询专业资源。
        </div>

        <div className="footer-final">不饮酒,是最简单的健康选择。</div>
      </div>
    </footer>
  );
}
