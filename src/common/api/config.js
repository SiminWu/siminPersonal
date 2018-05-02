/* jshint esversion: 6 */
// 服务地址
// export const SERVICE = 'http://192.168.0.59:8550'; // 孝宇
// export const SERVICE = 'http://192.168.0.52:8550';// 毛毛
export const SERVICE = 'http://120.78.178.50:8000'; // 测试服
// export const SERVICE = 'http://fx.xlbzone.com'; // 正式服(120.78.199.189)
export const API_PATH = '/windelephant/api';
export const API_FULL = SERVICE + API_PATH;


// 抽取相同接口名，以枚举形式区分
export let ApiType = {
  LOGIN: 1, // 登录
};

export const LOGIN = API_FULL + '/users/login'; // 登录




