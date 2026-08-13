import axios from 'axios';
import {
  LoginBody,
  LoginResponse,
  SignupBody,
  SignupResponse,
  LoginWxParams,
  UserInfo,
} from '@/apis/model/User';

export default class UserService {
  static login(params: LoginBody): Promise<LoginResponse> {
    return axios.post('/user/login', params);
  }

  static signup(params: SignupBody): Promise<SignupResponse> {
    return axios.post('/user/signup', params);
  }

  /** 获取用户信息 */
  static getUser(): Promise<UserInfo> {
    return axios.get('/user/get');
  }

  // 获取二维码接口
  static getWxUrl(): Promise<string> {
    return axios.post('/auth/getWxUrl', {
      redirect_uri: window.location.href,
    });
  }

  static loginWx(params: LoginWxParams): Promise<LoginResponse> {
    return axios.post('/auth/loginWx', params);
  }
}
