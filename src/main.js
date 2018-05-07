// import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuex from 'vuex'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import api from 'assets/api'; // 公共请求/接口
import * as utils from 'assets/js/utils'; // 公共库
import 'assets/css/theme.less';//主题色
import 'assets/css/common.less';

// Vue.use(Vuex);
// Vue.use(iView);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils; // 工具类
Vue.prototype.$api = api; // 公共请求

/* eslint-disable no-new */
new Vue({
  el: '#app',
  api,
  utils,
  store,
  router,
  components: { App },
  template: '<App/>'
})
