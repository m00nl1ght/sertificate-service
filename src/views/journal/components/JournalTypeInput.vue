<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="journalType"
    label="Тип журнала"
    :loading="checkLoading(GET_JOURNAL_TYPE_LOADER)"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalogs'
import { storeToRefs } from 'pinia'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import type { ValidationRule } from 'quasar'

interface Props {
  rules?: ValidationRule[]
}

defineProps<Props>()
const model = defineModel({ required: true })

const catalogStore = useCatalogStore()
const { journalType } = storeToRefs(catalogStore)
const GET_JOURNAL_TYPE_LOADER = 'GET_JOURNAL_TYPE_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getJournalType()
  }, [GET_JOURNAL_TYPE_LOADER])
})
</script>
