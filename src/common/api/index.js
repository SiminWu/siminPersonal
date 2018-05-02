import axios from 'axios';
import * as config from './config';
import {CommonUtils, RegexUtils} from '../js/utils';
/**
 * 检查传入参数数量
 * @param {any} arg
 * @param {Number} count
 * @returns
 */
function checkParamCount(arg, count) {
  if (arg < count) {
    return new Error('少传参数...');
  }
}

/**
 * 检测传进来的参数
 * @param {any} ur
 * @param {any} sucess
 * @param {any} fail
 * @returns
 */
function checkParam(url, sucess, fail) {
  return (RegexUtils.isUrl(url) && CommonUtils.isFunction(sucess) && CommonUtils.isFunction(fail));
}

/**
* 判断响应的状态
* @param {any} res
*/
function validResponed(res) {
  if (res.status !== 200 || res.statusText.toLowerCase() !== 'ok') {
    console.log(`status: ${res.status}`);
    return Promise.reject(res.data);
  }
}

/**
 * get公共调用方法
 * @param {any} url
 * @param {any} param
 * @param {any} sucess
 * @param {any} fail
 */
function apiGet(url, params, sucess, fail) {
  if (params) {
    params._ = Date.parse(new Date()); // 设置请求不缓存
  }
  axios
    .get(url, {params: params})
    .then(res => {
      validResponed(res);
      let data = res.data;
      sucess(data);
    })
    .catch(error => {
      fail(error);
    });
}

/**
 * post公共调用方法
 * @param {any} url
 * @param {any} param
 * @param {any} sucess
 * @param {any} fail
 */
function apiPost(url, param = {}, sucess, fail) {
  // 判断参数类型
  if (!checkParam(url, sucess, fail)) {
    return new Error('参数错误...');
  }
  axios
    .post(url, param)
    .then(res => {
      validResponed(res);
      let data = res.data;
      sucess(data);
    })
    .catch(error => {
      let res = error.response;
      if (typeof res !== 'undefined') {
        if (res.status === 400) {     Message.error({         message: '用户尚未注册' }); }
        return Promise.reject(res.statusText); if (res.status !== 200) {
        Message.error({message: res.data.msg}); }
      }
      fail(res.data);
    });
}
export default {
  login(param, sucess, fail) { // 登录接口
    // 检测参数
    apiPost(config.LOGIN, param, sucess, fail);
  },

}
