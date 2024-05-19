<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="name"
    :options="filialList"
    :label="label ?? 'Филиал'"
    :loading="checkLoading(GET_FILIAL_LOADER)"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
    multiple
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import type { ValidationRule } from 'quasar'

import { useFilialStore } from '@/stores/filial'

interface Props {
  label?: string
  rules?: ValidationRule[]
  disable?: boolean
}

const model = defineModel<number[] | undefined>({ required: true })
defineProps<Props>()

const GET_FILIAL_LOADER = 'GET_FILIAL_LOADER'

const filialStore = useFilialStore()
const { filialList } = storeToRefs(filialStore)

onMounted(() => {
  withLoadingIndicator(async () => {
    filialStore.getAllFilialList()
  }, [GET_FILIAL_LOADER])
})
</script>
