import { createRouter, createWebHistory } from 'vue-router'
import home from '@/pages/home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
  ]
})

export default router
