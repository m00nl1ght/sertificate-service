import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import TheMainLayout from '@/layouts/TheMainLayout.vue'

import * as paths from './paths/routePaths'
import * as names from './names/routeNames'

import authRoutes from '@/router/routes/authRoutes'
import accountRoutes from '@/router/routes/accountRoutes'
import filialRoutes from '@/router/routes/filialRoutes'
import journalRoutes from '@/router/routes/journalRoutes'
import productRoutes from '@/router/routes/productRoutes'
import blankFilialRoutes from '@/router/routes/blankFilialRoutes'
import blankDamage from '@/router/routes/blankDamage'
import reportRoutes from '@/router/routes/reportRoutes'

let routes: RouteRecordRaw[] = [
  ...authRoutes,

  {
    path: paths.routePathHome,
    component: TheMainLayout,
    children: [
      {
        path: '',
        name: names.routeNameHome,
        component: () => import('@/views/HomePage.vue')
      },
      ...filialRoutes,
      ...journalRoutes,
      ...accountRoutes,
      ...productRoutes,
      ...blankFilialRoutes,
      ...blankDamage,
      ...reportRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
