import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/Register.vue'
import differs from '../views/differs.vue'
import TermsAndCondition from '@/views/TermsAndCondition.vue'
import Bots from '@/views/Bots.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
      {
      path: '/differs',
      name: 'differs',
      component: differs,
    },
    
     {
      path: '/AiBots',
      name: 'AiBots',
      component: Bots,
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
      component: () => import('../views/differs.vue'),
    },
  ],
})

export default router
