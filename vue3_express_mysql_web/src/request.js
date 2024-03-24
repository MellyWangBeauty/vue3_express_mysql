//request.js
import axios from "axios";

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 20000, // 超时
});

export default service;
