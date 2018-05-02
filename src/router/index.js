import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import 'iview/dist/styles/iview.css';
import 'assets/css/common.less';
import iView from 'iview';

Vue.use(Router)
Vue.use(iView);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
