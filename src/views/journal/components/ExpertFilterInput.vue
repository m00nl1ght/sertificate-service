<template>
  <q-select
    v-model="model"
    :option-value="'id'"
    :option-label="(opt) => getUserFullName(opt)"
    :options="accounts"
    :label="label ?? 'ФИО эксперта'"
    :loading="checkLoading(GET_ACCOUNTS_LOADER)"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
    multiple
  >
  </q-select>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getUserFullName } from '@/composable/helpers/peopleHelper'
import type { ValidationRule } from 'quasar'
import { useAccountStore } from '@/stores/account'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
// import type { AccountDto } from '@/api'

interface Props {
  label?: string
  rules?: ValidationRule[]
}

const props = defineProps<Props>()
const model = defineModel<number[] | undefined>({ required: true })

const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore)
const GET_ACCOUNTS_LOADER = 'GET_ACCOUNTS_LOADER'

// function getNameString(user: AccountDto) {
//   return getUserFullName(user.l, user.expertFirstName, user.expertMiddleName)
// }

onMounted(() => {
  withLoadingIndicator(async () => {
    accountStore.getAllAccounts1()
  }, [GET_ACCOUNTS_LOADER])
})
</script>
