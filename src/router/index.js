import Login from 'components/login/login';
import 'assets/css/common.less';

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})

export default router;
