import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathProductType,
    name: names.routeNameProductType,
    component: () => import('@/views/productType/ProductTypePage.vue')
  },
  {
    path: paths.routePathProductTypeAdd,
    name: names.routeNameProductTypeAdd,
    component: () => import('@/views/productType/ProductTypeEditPage.vue')
  },
  {
    path: paths.routePathProductTypeEdit,
    name: names.routeNameProductTypeEdit,
    component: () => import('@/views/productType/ProductTypeEditPage.vue')
  }
]

export default routes
