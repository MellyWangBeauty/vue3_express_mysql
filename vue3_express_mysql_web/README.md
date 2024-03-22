## 创建 Vue3 项目

yarn create vite

yarn install

yarn dev

## 修改前端端口

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
plugins: [vue()],
server: {
port: 3000, // 设置开发服务器的端口号为 3000
},
});
