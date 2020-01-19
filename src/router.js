import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: [
    {
      path: '/',
      alias: '/about',
      component: () => import('./pages/About.vue'),
    },
    {
      path: '/donate',
      component: () => import('./pages/Donate.vue'),
    },
    {
      path: '*',
      component: () => import('./pages/NotFound.vue'),
    },
  ],
});
