import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const routes = {
  home: '/',
  sellers: '/vendedores',
  imageRace: '/carrera-imagenes',
  invoice: '/factura',
  about: '/acerca-de',
  sellerCompetition: '/competencia-vendedores',
  invoiceDetail: '/invoice/:invoiceId',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home,
      name: 'home',
      component: HomeView,
    },
    {
      path: routes.sellers,
      name: 'sellers',
      component: () => import('@/views/SellersView.vue'),
    },
    {
      path: routes.imageRace,
      name: 'imageRace',
      component: () => import('@/views/ImageRaceView.vue'),
    },
    {
      path: routes.invoice,
      name: 'invoice',
      component: () => import('@/views/InvoiceView.vue'),
    },
    {
      path: routes.about,
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: routes.sellerCompetition,
      name: 'sellerCompetition',
      component: () => import('@/views/SellerCompetitionView.vue'),
    },
    {
      path: routes.invoiceDetail,
      name: 'InvoiceDetail',
      component: () => import('@/views/InvoiceDetailView.vue'),
      props: true,
    },
  ],
})

export default router
