<template>
  <q-select
    v-model="model"
    :loading="isLoading"
    :options="items"
    @input-value="onSearch"
    use-input
    label="Номер бланка сертификата"
    outlined
    dense
    counter
    maxlength="18"
    ref="certificateBlankNumber"
    clearable
  >
  </q-select>
</template>

<script setup lang="ts">
import { items, isLoading, fetchItems } from '@/composable/journals/inputJournalHelper'
import type { QSelect } from 'quasar'
import { ref } from 'vue'

const model = defineModel<number | undefined>({ required: true })
const CERTIFICATE_BLANK_NUMBER = 'CERTIFICATE_BLANK_NUMBER'
const certificateBlankNumber = ref<QSelect | null>(null)

async function onSearch(value: string) {
  await fetchItems(CERTIFICATE_BLANK_NUMBER, value)
  if (certificateBlankNumber.value) certificateBlankNumber.value.showPopup()
}
</script>
