import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathBlankFilial,
    name: names.routeNameBlankFilial,
    component: () => import('@/views/blankFilial/BlankFilialPage.vue')
  },
  {
    path: paths.routePathBlankFilialAdd,
    name: names.routeNameBlankFilialAdd,
    component: () => import('@/views/blankFilial/BlankFilialEditPage.vue')
  },
  {
    path: paths.routePathBlankFilialEdit,
    name: names.routeNameBlankFilialEdit,
    component: () => import('@/views/blankFilial/BlankFilialEditPage.vue')
  }
]

export default routes
