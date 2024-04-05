import axios, { type AxiosResponse } from 'axios';

/**
 * 把 axios 作封裝，打包基本的 HTTP Methods
 */
const service = axios.create({ baseURL: '/', timeout: 90000 });

/**
 * 處理200回傳處理
 * 處理其他錯誤代碼
 */
service.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data,
  (error) => {
    if (!error.response) {
      console.error(error);
      return;
    }
    switch (error.response.status) {
      case 400:
        console.error(400);
        break;
      case 401:
        console.error(401);
        break;
      case 403:
        console.error(403);
        break;
      case 404:
        console.error(404);
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

/**
 * API method Get
 * @param { string } url 目標網址
 * @returns
 */
const get = <T>(url: string) => service.get<T, T>(url);

/**
 * API method post
 * @param { string } url
 * @param { any } data
 * @returns
 */
const post = <T>(url: string, data: any | null) =>
  service.post<T, T>(url, data);

/**
 * API method post
 * @param url
 * @param data
 * @returns
 */
const put = <T>(url: string, data: any) => service.put<T, any>(url, data);
/**
 * API method Delete
 * @param { string } url API 位置
 * @returns
 */
const del = <T>(url: string) => service.delete<T, any>(url);

export default {
  get,
  post,
  put,
  del,
};
