/*eslint-disable */
import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios';

//提供給 axios 的擴充
declare module 'axios' {
  // AxiosResponse 可依照個專案需求自行定義模型
  interface AxiosResponse<T = any> {
    data: T;
    msg: string;
    success: boolean;
    status: number;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
