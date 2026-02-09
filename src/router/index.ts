import { createRouter, createWebHistory } from 'vue-router';
import PositionPage from '@/pages/PositionPage.vue';
import ScanningPage from '@/pages/ScanningPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/position' },
    { path: '/position', name: 'position', component: PositionPage },
    { path: '/scanning', name: 'scanning', component: ScanningPage },
  ],
});

export default router;
