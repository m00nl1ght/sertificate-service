import router from './index'
import type { RouteMeta } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

function getRouteTitle(routeMeta: RouteMeta): string {
  const title =
    routeMeta && routeMeta.title && typeof routeMeta.title === 'string' ? routeMeta.title : ''
  return title
}

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  document.title = getRouteTitle(to.meta)
  if (to.name !== 'Login' && !authStore.isAuth) next({ name: 'Login' })
  else next()
})
