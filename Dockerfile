# =====================================================================
# 多阶段构建 · 极小最终镜像
# 阶段 1:用 Node 镜像编译
# 阶段 2:用 Nginx Alpine 镜像托管静态产物
# =====================================================================

# ---- 阶段 1:构建 ----
FROM node:20-alpine AS builder

WORKDIR /app

# 优先复制 lock 文件,这样改动源码时可以利用 Docker 缓存
COPY package*.json ./
RUN npm ci

# 复制源码并构建
COPY . .
RUN npm run build

# ---- 阶段 2:运行 ----
FROM nginx:1.27-alpine AS runtime

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制我们自定义的 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段拷贝产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 健康检查 — 防止容器看似在跑但实际 nginx 挂掉
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# 默认 CMD 继承自 nginx 基础镜像
CMD ["nginx", "-g", "daemon off;"]
