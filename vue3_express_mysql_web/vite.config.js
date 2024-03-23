import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // 设置开发服务器的端口号为3000
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5000", //后台地址
    //     changeOrigin: true, //开启跨域
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
