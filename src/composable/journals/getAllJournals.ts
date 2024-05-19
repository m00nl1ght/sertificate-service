import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { computed } from 'vue'
import { withLoadingIndicator, withNotifier } from '../requestHelpers/loaderAndNotificatorHelpers'
import { useJournalStore } from '@/stores/journal'

const GET_JOURNALS_LOADER = 'GET_JOURNALS_LOADER'
const journalStore = useJournalStore()

const isLoadingJournals = computed(() => checkLoading.value(GET_JOURNALS_LOADER))

function getAllJournals() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await journalStore.getJournals()
    })
  }, [GET_JOURNALS_LOADER])
}

export { isLoadingJournals, getAllJournals, GET_JOURNALS_LOADER }
