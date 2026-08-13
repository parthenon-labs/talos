export interface LoginBody {
  phone: FormDataEntryValue;
  password: FormDataEntryValue;
  code: FormDataEntryValue;
}
export interface SignupBody {
  phone: FormDataEntryValue;
  password: FormDataEntryValue;
  code: FormDataEntryValue;
}
export interface WeixinBody {
  appid: string;
  scope: string;
  redirect_uri: string;
}
export interface LoginResponse {
  token: string;
}
export interface SignupResponse {
  data: object;
}
export interface QRResponse {
  code: number;
  msg: string;
  data: string;
}
export interface LoginWxParams {
  wxCode: string;
}
export interface QRCodeResponse {
  code: number;
  msg: string;
  token: string;
}

export interface UserInfo {
  userCode: string;
  headimgurl: string;
  id: string;
  nickname: string;
  phone: string;
  sex: number;
  updateAt: string;
  createAt: string;
  username: string;
}
