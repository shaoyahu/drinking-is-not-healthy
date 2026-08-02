import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 相对路径，方便部署到 GitHub Pages 子路径和自有服务器
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 单页应用，部署到任何路径都正常工作
  },
  server: {
    port: 5173,
    open: false,
  },
});
