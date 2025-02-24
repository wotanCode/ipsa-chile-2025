import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/vendedores',
      name: 'sellers',
      component: () => import('@/views/SellersView.vue'),
    },
    {
      path: '/carrera-imagenes',
      name: 'imageRace',
      component: () => import('@/views/ImageRaceView.vue'),
    },
    {
      path: '/acerca-de',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
