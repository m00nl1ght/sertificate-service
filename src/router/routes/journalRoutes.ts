import * as paths from '@/router/paths/routePaths'
import * as names from '@/router/names/routeNames'

const routes = [
  {
    path: paths.routePathJournal,
    children: [
      {
        path: '',
        name: names.routeNameJournal,
        component: () => import('@/views/journal/JournalPage.vue')
      },
      {
        path: paths.routePathJournalAdd,
        name: names.routeNameJournalAdd,
        component: () => import('@/views/journal/JournalEditPage.vue')
      },
      {
        path: paths.routePathJournalEdit,
        name: names.routeNameJournalEdit,
        component: () => import('@/views/journal/JournalEditPage.vue')
      },
      {
        path: paths.routePathJournalHistory,
        name: names.routeNameJournalHistory,
        component: () => import('@/views/journal/JournalHistoryPage.vue')
      }
    ]
  }
]

export default routes
