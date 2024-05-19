import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { computed } from 'vue'
import { withLoadingIndicator, withNotifier } from '../requestHelpers/loaderAndNotificatorHelpers'
import { storeToRefs } from 'pinia'
import { useFilialStore } from '@/stores/filial'

const GET_FILIAL_LOADER = 'GET_FILIAL_LOADER'

const filialStore = useFilialStore()
const { filialList } = storeToRefs(filialStore)

const isLoadingFilials = computed(() => checkLoading.value(GET_FILIAL_LOADER))

function getAllFilials() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await filialStore.getAllFilialList()
    })
  }, [GET_FILIAL_LOADER])
}

export { isLoadingFilials, filialList, getAllFilials, GET_FILIAL_LOADER }
