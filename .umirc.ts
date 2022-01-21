import { defineConfig } from 'umi';

export default defineConfig({
  locale: { antd: true },
  dva: {
    immer: true,
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login/index' },
    {
      path: '/',
      component: '@/pages/Layouts/index',
      wrappers: ['@/wrappers/auth'],
      routes: [
        { path: '/index', component: '@/pages/Dashboard/index' },
        { path: '/user', component: '@/pages/User/index' },
      ],
    },
  ],
  fastRefresh: {},
});
