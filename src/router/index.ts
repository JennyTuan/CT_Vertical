import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/pages/WelcomePage.vue';
import PositionPage from '@/pages/PositionPage.vue';
import ScanningPage from '@/pages/ScanningPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'welcome', component: WelcomePage },
    { path: '/position', name: 'position', component: PositionPage },
    { path: '/scanning', name: 'scanning', component: ScanningPage },
  ],
});

export default router;
