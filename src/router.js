import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Report from './views/Report.vue'
import Food from './views/Food.vue'
import Menu from './views/Menu.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/report', component: Report, meta: { title: 'Report' } },
  { path: '/food', component: Food, meta: { title: 'Food' } },
  { path: '/menu', component: Menu, meta: { title: 'Menu' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title
router.afterEach((to) => {
  document.title = `${to.meta.title || 'Page'} - Enu Food House`
})

export default router
