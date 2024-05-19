<template>
  <q-select
    v-model="model"
    :options="items"
    :label="label ?? 'Стоимость сертификата'"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
  />
</template>

<script setup lang="ts">
// import { computed, onMounted } from 'vue'
// import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
// import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import type { ValidationRule } from 'quasar'

interface Props {
  label?: string
  items: string[]
  rules?: ValidationRule[]
}

const model = defineModel({ required: true })
const props = defineProps<Props>()
</script>
