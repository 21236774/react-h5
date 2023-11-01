import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh';
import pxtorem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve()
    }
  },
  plugins: [react(), reactRefresh()],
  css: {
    preprocessorOptions: {
      less: true
    },
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 37.5, // 设置基准值，根据设计稿调整
          propList: ['*'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0
        })
      ]
    },
  }
})
