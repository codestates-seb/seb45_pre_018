import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/questions': {
    //     target: 'http://ec2-13-125-118-42.ap-northeast-2.compute.amazonaws.com:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/questions/, ''),
    //   },
    // },
    port: 3006,
  },
})
