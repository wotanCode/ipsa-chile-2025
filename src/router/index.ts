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
      path: '/factura',
      name: 'invoice',
      component: () => import('@/views/InvoiceView.vue'),
    },
    {
      path: '/acerca-de',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/vendedor/:sellerId',
      name: 'sellerDetail',
      component: () => import('@/views/SellerDetailView.vue'),
    },
    {
      path: '/invoice/:invoiceId',
      name: 'InvoiceDetail',
      component: () => import('@/views/InvoiceDetailView.vue'),
      props: true,
    },
  ],
})

export default router
