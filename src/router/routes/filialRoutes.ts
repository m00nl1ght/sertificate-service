import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathFilial,
    children: [
      {
        path: '',
        name: names.routeNameFilial,
        component: () => import('@/views/filial/FilialPage.vue')
      },
      {
        path: paths.routePathFilialAccounts,
        name: names.routeNameFilialAccounts,
        component: () => import('@/views/filial/FilialAccounsPage.vue')
      },
      {
        path: paths.routePathFilialEdit,
        name: names.routeNameFilialEdit,
        component: () => import('@/views/filial/FilialEditPage.vue')
      },
      {
        path: paths.routePathFilialAdd,
        name: names.routeNameFilialAdd,
        component: () => import('@/views/filial/FilialEditPage.vue')
      }
    ]
  }
]

export default routes
