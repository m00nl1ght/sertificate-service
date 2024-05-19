import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathAccount,
    children: [
      {
        path: '',
        name: names.routeNameAccount,
        component: () => import('@/views/account/AccountPage.vue')
      },
      {
        path: paths.routePathAccountAdd,
        name: names.routeNameAccountAdd,
        component: () => import('@/views/account/AccountEditPage.vue')
      },
      {
        path: paths.routePathAccountEdit,
        name: names.routeNameAccountEdit,
        component: () => import('@/views/account/AccountEditPage.vue')
      },
      {
        path: paths.routePathAccountPermission,
        name: names.routeNameAccountPermission,
        component: () => import('@/views/account/AccountPermissionPage.vue')
      },
      {
        path: paths.routePathAccountPassword,
        name: names.routeNameAccountPassword,
        component: () => import('@/views/account/AccountPasswordPage.vue')
      }
    ]
  }
]

export default routes
