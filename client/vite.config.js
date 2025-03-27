import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // 개발 서버의 호스트를 localhost로 설정
    port: 5173,        // 기본 포트를 유지
  },
})
