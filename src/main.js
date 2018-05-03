// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import api from 'assets/api'; // 公共请求/接口
import * as utils from 'assets/js/utils'; // 公共库
import 'assets/css/theme.less';//主题色
import 'assets/css/common.less';

Vue.config.productionTip = false;
Vue.prototype.$utils = utils; // 工具类
Vue.prototype.$api = api; // 公共请求

/* eslint-disable no-new */
new Vue({
  el: '#app',
  api,
  utils,
  router,
  components: { App },
  template: '<App/>'
})
