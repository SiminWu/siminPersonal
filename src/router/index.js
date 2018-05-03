import Login from 'components/login/login';

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
