import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/progress',
      name: 'inprogress',
      component: () => import('@/views/ProgressView.vue')
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('@/views/CompletedView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Home" },
    },
  ]
})

export default router
