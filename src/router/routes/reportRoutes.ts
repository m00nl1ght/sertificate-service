import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathReports,
    children: [
      {
        path: '',
        name: names.routeNameReports,
        component: () => import('@/views/reports/ReportsPage.vue')
      },
      {
        path: paths.routePathBlankReport,
        name: names.routeNameBlankReport,
        component: () => import('@/views/reports/BlankReportPage.vue')
      }
    ]
  }
]

export default routes
