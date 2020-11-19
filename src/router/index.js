import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: () => import('../views/Bookmarks.vue'),
  },
  {
    path: '/:owner/:repo',
    name: 'Details',
    component: () => import('../views/Details.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
