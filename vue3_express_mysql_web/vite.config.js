import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd()); // 获取 .env里面定义是参数
  return {
    plugins: [vue()],
    server: {
      host: "0.0.0.0",
      open: true,
      port: 3000, //端口号
      proxy: {
        // 本地开发环境通过代理实现跨域
        // 正则表达式写法
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL, // 后端服务实际地址
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
