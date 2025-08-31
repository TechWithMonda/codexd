import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/Register.vue'
import Leaderboard from '../views/Leaderboard.vue'
import TermsAndCondition from '@/views/TermsAndCondition.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard,
    },
    {
      path: '/TermsAndCondition',
      name: 'TermsAndCondition',
      component: TermsAndCondition,
    },
      {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Leaderboard.vue'),
    },
  ],
})

export default router
