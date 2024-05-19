<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="platforms"
    label="Платформа"
    :loading="checkLoading(GET_PLATFORM_LOADER)"
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
const { platforms } = storeToRefs(catalogStore)
const GET_PLATFORM_LOADER = 'GET_PLATFORM_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getPlatform()
  }, [GET_PLATFORM_LOADER])
})
</script>
