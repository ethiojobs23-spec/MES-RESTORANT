import { createRouter, createWebHistory } from 'vue-router'
import CashBook from './views/CashBook.vue'

const routes = [
  { path: '/', component: CashBook, meta: { title: 'Home' } },
  { path: '/expense', component: CashBook, meta: { title: 'Expense' } },
  { path: '/revenue', component: CashBook, meta: { title: 'Revenue' } },
  { path: '/unexpected', component: CashBook, meta: { title: 'Unexpected' } },
  { path: '/reports', component: CashBook, meta: { title: 'Reports' } },
  { path: '/ledger', component: CashBook, meta: { title: 'Ledger' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Page'} - Daily CashBook`
})

export default router
