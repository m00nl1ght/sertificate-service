<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="formGroups"
    label="Группа форм"
    :loading="checkLoading(GET_FORM_GROUP_LOADER)"
    map-options
    outlined
    dense
    :rules="rules"
    bottom-slots
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
const model = defineModel({ required: true })

const catalogStore = useCatalogStore()
const { formGroups } = storeToRefs(catalogStore)
const GET_FORM_GROUP_LOADER = 'GET_FORM_GROUP_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getFormGroup()
  }, [GET_FORM_GROUP_LOADER])
})
</script>
