//request.js
import axios from "axios";

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: "/api",
  // baseURL: "http://localhost:5000",
  baseURL: "http://8.219.89.226:5000",
  // 超时
  timeout: 20000,
});

export default service;
