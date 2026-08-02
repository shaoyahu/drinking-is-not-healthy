# 喝酒有害健康 · No Safe Dose

> 基于 WHO、The Lancet、IARC 等权威医学证据的科普项目。
> 每一个数字都可以溯源,没有任何夸大。

**核心立场**:世界卫生组织把酒精列为<strong>一级致癌物</strong>(Group 1,与石棉、烟草同级);全球每年超过 300 万人因饮酒死亡,占全部死亡 5.3%,平均每 20 人就有 1 人因酒精死亡。**安全剂量 = 0** —— 一滴酒也会造成损伤。

---

## 项目特色

- 📊 **硬数据驱动** — 8 个核心数字、6 个中国数据、12 份权威文献全部可溯源
- 🔬 **IARC Group 1 致癌物** — 7 种癌症与酒精有因果关系
- 🧠 **可视化大脑损伤曲线** — 引用 2022 年 Nature Communications 研究
- ❓ **Q&A 互动** — 7 个最常见的"我喝一点没事吧"质疑,每个都有文献回应
- 🇨🇳 **中国本土数据** — 70 万/年死亡、人均 7.2L 纯酒精、男性饮酒率 48%
- 📱 **响应式** — 移动端、PC 端都好看

## 技术栈

- **React 18** + **TypeScript** + **Vite 5**
- 纯 CSS(无 UI 库),自定义深色 + 红色警告主题
- 静态产物(纯前端,无后端依赖)

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173
```

## 构建

```bash
npm run build      # 产物在 dist/
npm run preview    # 本地预览生产产物
```

---

## 部署方案

### 方案一 · GitHub Pages(自动部署)

**仓库设置**(只需做一次):

1. 在 GitHub 上新建一个仓库,比如 `yourname/drinking-is-not-healthy`
2. 把项目代码推上去:
   ```bash
   cd drinking-is-not-healthy
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourname/drinking-is-not-healthy.git
   git push -u origin main
   ```
3. 打开仓库 **Settings → Pages**,Source 选 **GitHub Actions**(不要选 "Deploy from a branch")

完成。以后每次 `git push` 到 `main`,`.github/workflows/deploy.yml` 会自动构建并部署到:
- `https://yourname.github.io/drinking-is-not-healthy/`

> 备选:用 `npm run deploy`(gh-pages 包)走老式的 `gh-pages` 分支。已配好脚本,但 GitHub Actions 更省心。

### 方案二 · 自有云服务器(用 Docker + Nginx)

**前置**:服务器装了 Docker(20.10+)和 Docker Compose。

**部署**:

```bash
# 1. 把项目代码拉到服务器(或在服务器上 clone 仓库)
cd /opt  # 或者你喜欢的目录
# scp / git clone ...

# 2. 构建并启动
docker compose up -d --build

# 3. 查看日志
docker compose logs -f web

# 4. 访问
# http://你的服务器IP:8080
```

**为什么用 8080 而不是 80**:避免和服务器上其他服务冲突。改成 `80:80` 直接用 80 端口。

**进阶:挂域名 + HTTPS**

最简方案:用 [Caddy](https://caddyserver.com) 或 [Nginx Proxy Manager](https://nginxproxymanager.com) 做反向代理 + 自动 HTTPS。
本项目本身只是静态文件服务,不强制要求改成 443 端口。

如果想用 host 网络直接跑 80 端口,把 `docker-compose.yml` 改成:

```yaml
ports:
  - "80:80"
network_mode: host   # 或者保留 ports,看你的服务器情况
```

### 方案三 · 任何静态服务器

`npm run build` 出来的 `dist/` 目录就是纯静态文件(HTML + JS + CSS),可以扔到任何静态服务器上:

- Vercel / Netlify / Cloudflare Pages:直接拖文件夹部署,零配置
- 阿里云 OSS / 腾讯云 COS:开静态网站托管,上传到 bucket
- 传统 Nginx / Apache:把 `dist/` 内容放到站点根目录即可

**注意**:`vite.config.ts` 里 `base: './'` 已经设了相对路径,这样不管部署到根域名、还是子路径(比如 `https://example.com/drinking-is-not-healthy/`),都能正常访问。

---

## 项目结构

```
.
├── .github/workflows/deploy.yml  # GitHub Actions 部署
├── src/
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx              # 大字冲击开场
│   │   ├── Stats.tsx             # 8 组硬数据
│   │   ├── HarmTypes.tsx         # 7 种癌症 + 8 类危害
│   │   ├── BrainDamage.tsx       # 大脑萎缩可视化
│   │   ├── China.tsx             # 中国本土数据
│   │   ├── QnA.tsx               # 7 个常见疑问
│   │   ├── Sources.tsx           # 12 份文献
│   │   └── Footer.tsx
│   ├── data/
│   │   └── sources.ts            # 所有数据/文献的单一来源
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile                    # 多阶段构建 · Nginx Alpine
├── docker-compose.yml
├── nginx.conf                    # 长期缓存 + gzip + SPA fallback
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 全部文献来源

页面里所有数字都来自以下公开文献(可在页面底部直接点击跳转):

1. **WHO / IARC** — Alcohol as Group 1 Carcinogen
2. **WHO 2018** — *Global Status Report on Alcohol and Health*
3. **WHO 2024** — *Global Cancer Burden Growing*
4. **The Lancet 2018** — GBD 2016 Alcohol Collaborators (n=28M)
5. **The Lancet 2019** — GBD 2019: "safe dose = 0"
6. **The Lancet 2022** — GBD 2020 (n=204 countries)
7. **The Lancet 2018** — 599,912 drinkers, 83 studies
8. **Nature Communications 2022** — Brain MRI, n=36,000
9. **JAMA Pediatrics 2017** — Global FAS prevalence
10. **中国营养学会 2022** — *中国居民膳食指南*
11. **WHO Western Pacific 2025** — *Alcohol Leaves A Mark*

## 自定义

如果想加新内容、改颜色或新增数据,只需要改两个地方:

- **数据/文献**:`src/data/sources.ts` —— 一个 TypeScript 文件,所有引用都集中在这里
- **样式/主题**:`src/styles/global.css` —— `:root` 下的 CSS 变量,改一处全站生效

## License

MIT — 自由使用,但请保留原作者署名和文献溯源链接。
