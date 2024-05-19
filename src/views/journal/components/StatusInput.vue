<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="statuses"
    label="Статус"
    :loading="checkLoading(GET_STATUSES_LOADER)"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
    :multiple="multiple"
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
  multiple?: boolean
}

defineProps<Props>()
const model = defineModel<number | number[] | undefined>({ required: true })

const catalogStore = useCatalogStore()
const { statuses } = storeToRefs(catalogStore)
const GET_STATUSES_LOADER = 'GET_STATUSES_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getStatus()
  }, [GET_STATUSES_LOADER])
})
</script>
