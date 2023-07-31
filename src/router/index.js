import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/book/:id',
      name: 'book-detail-page',
      component: () => import('../views/BookDetail.vue')
    },
    {
      path: '/cart',
      name: 'cart-page',
      component: () => import('../views/Cart.vue')
    }
  ]
})

export default router
