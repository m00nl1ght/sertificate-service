<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="items"
    :label="label ?? 'Филиал'"
    :loading="checkLoading(GET_FILIAL_LOADER)"
    emit-value
    map-options
    outlined
    dense
    :disable="items.length <= 1 || disable"
    :rules="rules"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { useJournalStore } from '@/stores/journal'
import type { ValidationRule } from 'quasar'
import { useAuthStore } from '@/stores/auth'
import { useFilialStore } from '@/stores/filial'

interface Props {
  label?: string
  rules?: ValidationRule[]
  disable?: boolean
}

const model = defineModel<number | undefined>({ required: true })
defineProps<Props>()

const journalStore = useJournalStore()
const { accountFilials } = storeToRefs(journalStore)
const GET_FILIAL_LOADER = 'GET_FILIAL_LOADER'

const authStore = useAuthStore()
const { isAdmin, isWatcher } = storeToRefs(authStore)

const filialStore = useFilialStore()
const { filialList } = storeToRefs(filialStore)

const items = computed(() => {
  return isAdmin.value || isWatcher.value ? filialList.value : accountFilials.value
})

onMounted(() => {
  withLoadingIndicator(async () => {
    if (isAdmin.value || isWatcher.value) {
      filialStore.getAllFilialList()
    } else {
      await journalStore.getAccountFilial()
      if (accountFilials.value && accountFilials.value.length === 1) {
        model.value = accountFilials.value[0].id
      }
    }
  }, [GET_FILIAL_LOADER])
})
</script>
