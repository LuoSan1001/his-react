import axios from "axios";
import qs from "qs";


const BASE_URL = "http://10.10.3.108:59200/api";

// 请求配置文件
const config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: BASE_URL,

  timeout: 1000 * 15,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false,

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 3,
  headers: {
    "Content-Type": " application/json;charset=UTF-8",
  },
};

// 创建ajax实例
const instance = axios.create(config);

const rewriteGet = instance.get
instance.get = function (url: string, data: any, ...any) {
  let query: string = qs.stringify(data, { addQueryPrefix: true });
  return rewriteGet(url + query, ...any)
}

export default instance;
