<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="forms"
    :label="label ?? 'Форма сертификата'"
    :loading="checkLoading(GET_FORM_LOADER)"
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
  label?: string
  rules?: ValidationRule[]
}

defineProps<Props>()
const model = defineModel({ required: true })

const catalogStore = useCatalogStore()
const { forms } = storeToRefs(catalogStore)
const GET_FORM_LOADER = 'GET_FORM_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getForm()
  }, [GET_FORM_LOADER])
})
</script>
