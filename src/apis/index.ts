import axios, { AxiosResponse } from 'axios';
import type { BaseResponse } from '@/apis/model';

axios.defaults.baseURL = '/api';

// 添加请求拦截器
axios.interceptors.request.use(config => {
  if (config.headers)
    config.headers.token = localStorage.getItem('login_token') || '';

  return config;
});

axios.interceptors.response.use(
  ({ data }: AxiosResponse<BaseResponse>) => {
    if (data.code !== 0) {
      return Promise.reject(new Error(data.msg));
    }
    return data.data;
  },
  error => {
    if (error?.response?.status === 401) {
      window.location.replace('/login');
    }
    return Promise.reject(error);
  },
);
