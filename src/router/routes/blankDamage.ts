import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathBlankDamage,
    children: [
      {
        path: '',
        name: names.routeNameBlankDamage,
        component: () => import('@/views/blankDamage/BlankDamagePage.vue')
      },
      {
        path: paths.routePathBlankDamageAdd,
        name: names.routeNameBlankDamageAdd,
        component: () => import('@/views/blankDamage/BlankDamageEditPage.vue')
      }
    ]
  }
]

export default routes
