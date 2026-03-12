import { createRouter, createWebHistory } from 'vue-router';
import AppShell from '@/layouts/AppShell.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppShell,
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', name: 'home', component: HomeView, meta: { title: '首页' } },
      ],
    },
  ],
});

export default router;
