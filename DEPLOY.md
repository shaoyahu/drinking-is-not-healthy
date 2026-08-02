# 部署说明

## 线上地址

| 入口 | URL | 部署方式 |
|------|-----|---------|
| 落地页 | https://nodrinking.nananxue.cn/ | Nginx 静态 HTML |
| GitHub Pages | https://nodrinking.nananxue.cn/github/ | Nginx 反代 shaoyahu.github.io |
| 自托管 | https://nodrinking.nananxue.cn/healthy/drinking/ | Docker 容器 (Nginx 反代) |
| 原始 GitHub | https://shaoyahu.github.io/drinking-is-not-healthy/ | GitHub Pages workflow |

## 三种部署的关系

- `GitHub Pages 版 (/github/)`：反代到 `https://shaoyahu.github.io/drinking-is-not-healthy/`，源在 GitHub。
- `自托管版 (/healthy/drinking/)`：服务器上跑 Docker 容器（`drinking-is-not-healthy:latest`，主机 8080 → 容器 80），源在 `ghcr.io`/本地镜像。
- 内容完全一致，都来自同一份代码（commit `ad9c20b`）。

## 自托管服务器配置

### 仓库拉取

```bash
ssh server
cd /opt && git clone https://github.com/shaoyahu/drinking-is-not-healthy.git
cd drinking-is-not-healthy
```

### 启动 / 重建

```bash
docker compose up -d --build     # 首次 / 重新构建
docker compose restart            # 仅重启
docker compose down               # 停止
```

容器健康检查：每 30s `wget --spider http://localhost/`，unhealthy 时自动重启。

### 拉取 GitHub 更新

```bash
cd /opt/drinking-is-not-healthy
git pull
docker compose up -d --build
```

## Nginx 反代配置

位置：`/etc/nginx/sites-available/nodrinking.nananxue.cn`

关键 location：

```nginx
# 1) /github/ → GitHub Pages(用 sub_filter 改写 Vite 相对路径)
location ^~ /github/ {
    rewrite ^/github/(.*)$ /drinking-is-not-healthy/$1 break;
    proxy_pass https://shaoyahu.github.io;
    proxy_ssl_server_name on;
    proxy_set_header Host shaoyahu.github.io;
    sub_filter 'href="./'  'href="/github/';
    sub_filter 'src="./'   'src="/github/';
    sub_filter '"assets/'  '"/github/assets/';
    sub_filter_types text/css application/javascript text/javascript;
    sub_filter_once off;
}

# 2) /healthy/drinking/ → 本地 Docker
location ^~ /healthy/drinking/ {
    proxy_pass http://127.0.0.1:8080/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Prefix /healthy/drinking;
    proxy_http_version 1.1;
}
```

## SSL 证书

- 工具：`acme.sh` (Let's Encrypt ECC)
- 域名：`nodrinking.nananxue.cn`
- 证书路径：`/etc/nginx/ssl/nodrinking.nananxue.cn.fullchain.cer` / `.key`
- 续期：acme.sh cron 每天检查，到期前自动 renew + `nginx -s reload`
- webroot：`/var/www/acme-nodrinking/`（保留在 nginx 80 端口 location 里供续期用）

### 手动续期 / 查看

```bash
ssh server
/root/.acme.sh/acme.sh --renew -d nodrinking.nananxue.cn --ecc --force
nginx -s reload
```

## DNS

`nodrinking.nananxue.cn` A 记录 → `8.218.68.252`（已配置）

## GitHub Pages 自动部署

每次 push 到 `main` 触发 `.github/workflows/deploy.yml`：
- `npm ci && npm run build`
- 上传 `dist/` 到 GitHub Pages
- 公开访问：`https://shaoyahu.github.io/drinking-is-not-healthy/`

手动触发：
```bash
gh workflow run deploy.yml
```

## 本地开发

```bash
npm install
npm run dev          # 开发
npm run build        # 生产构建
npm run preview      # 本地预览
```

## 安全加固

### 全站 HTTP 响应头

外层 nginx 在 443 server 块统一加：

| 头 | 值 | 作用 |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | HSTS 强制 HTTPS 一年 |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'sha256-...'; ...` | 防 XSS/注入 |
| `X-Content-Type-Options` | `nosniff` | 防 MIME 嗅探 |
| `X-Frame-Options` | `DENY` | 防 iframe 嵌套 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 控制 Referer 泄露 |
| `Permissions-Policy` | `interest-cohort=(), camera=(), ...` | 关闭 FLoC/相机/麦克风/定位/支付 |
| `Cross-Origin-Opener-Policy` | `same-origin` | 跨窗口隔离 |
| `Cross-Origin-Resource-Policy` | `same-origin` | 资源加载限制 |
| `Cross-Origin-Embedder-Policy` | `require-corp` | 嵌入隔离 |

CSP 收紧说明：
- `script-src 'self'` — Vite 产物无 inline JS,直接去掉 `unsafe-inline`
- `style-src 'self' 'sha256-YxqcWGSS/lLsYBtpBc8bCSsaDWcRysUds/yusSfm4PY='` — 落地页 `<style>` 块用 SHA256 hash 白名单(算自 `/var/www/nodrinking-landing/index.html` 中的内联 CSS,内容改了需重新算 hash)

### 限速 / 防爬

`/etc/nginx/nginx.conf` 的 http 块定义两个 zone:

```nginx
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=landing:10m rate=2r/s;
limit_conn_zone $binary_remote_addr zone=conn_per_ip:10m;
limit_req_status 429;
limit_conn conn_per_ip 20;
```

应用:
- `/` → `limit_req zone=landing burst=5 nodelay` + `limit_conn conn_per_ip 10`（严格,防落地页被刷）
- `/github/`、`/healthy/drinking/` → `limit_req zone=general burst=30 nodelay` + `limit_conn conn_per_ip 20`

> 注意:`location = /` 必须用真实文件 + `try_files`,不能用 `return 200 'inline...'` —— 后者在 nginx 1.18 上 `limit_req` 不生效。

### 容器加固(`docker-compose.yml`)

```yaml
user: "101:101"                  # nginx 用户(默认是 root)
read_only: true                  # 根文件系统只读
tmpfs:                           # 可写目录用 tmpfs + uid 101
  - /var/cache/nginx:uid=101,gid=101,size=32m
  - /var/run:uid=101,gid=101,size=4m
  - /tmp:uid=101,gid=101,size=16m
  - /var/log/nginx:uid=101,gid=101,size=16m
cap_drop: [ALL]                  # 删所有 capability
cap_add:                         # 只加必要的
  - NET_BIND_SERVICE             # 绑 80 端口
  - CHOWN
  - SETUID
  - SETGID
  - DAC_OVERRIDE
security_opt: [no-new-privileges:true]
mem_limit: 256m
cpus: "0.5"
pids_limit: 100
ports:
  - "127.0.0.1:8080:80"          # 只监听回环,不暴露公网
```

### 隐藏内部头

`/github/` 反代 GitHub Pages 时 `proxy_hide_header` 隐藏 Fastly/GitHub CDN 内部头:

```nginx
proxy_hide_header X-Served-By;
proxy_hide_header X-Cache;
proxy_hide_header X-Cache-Hits;
proxy_hide_header X-Fastly-Request-ID;
proxy_hide_header X-GitHub-Request-Id;
proxy_hide_header X-GitHub-Edge-Region;
proxy_hide_header X-Timer;
proxy_hide_header X-Proxy-Cache;
proxy_hide_header Via;
proxy_hide_header Server;
proxy_hide_header X-Powered-By;
proxy_hide_header Strict-Transport-Security;  # 避免和我们的 HSTS 重复
```



```bash
# 1. Docker 容器状态
ssh server 'docker ps && docker logs --tail 50 drinking-is-not-healthy'

# 2. nginx 状态 / 配置
ssh server 'nginx -t && systemctl status nginx'

# 3. 证书有效期
ssh server 'openssl x509 -in /etc/nginx/ssl/nodrinking.nananxue.cn.fullchain.cer -noout -dates'

# 4. 反代链路
ssh server 'curl -sIk https://nodrinking.nananxue.cn/healthy/drinking/'
ssh server 'curl -sIk https://nodrinking.nananxue.cn/github/'
```
