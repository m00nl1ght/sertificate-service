import { useAccountStore } from '@/stores/account'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { withLoadingIndicator, withNotifier } from '../requestHelpers/loaderAndNotificatorHelpers'

const GET_ACCOUNT_LOADER = 'GET_ACCOUNT_LOADER'
const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore)

const isLoadingAccounts = computed(() => checkLoading.value(GET_ACCOUNT_LOADER))

function getAllAccounts() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await accountStore.getAllAccounts1()
    })
  }, [GET_ACCOUNT_LOADER])
}

export { isLoadingAccounts, accounts, getAllAccounts, GET_ACCOUNT_LOADER }
