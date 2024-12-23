import { createRouter, createWebHistory } from 'vue-router'
import home from '@/pages/home.vue'
import formPage from '@/pages/formPage.vue'
import componentsPage from '@/pages/componentsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/components',
      name: 'components',
      component: componentsPage,
      children: [
        {
          path: 'form',
          name: 'form',
          component: formPage
        }
      ]
    }
  ]
})

export default router
