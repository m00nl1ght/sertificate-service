<template>
  <q-select
    v-model="model"
    :loading="isLoading"
    :options="items"
    use-input
    use-chips
    label="ФИО получателя сертификата"
    outlined
    dense
    clearable
    ref="receiverFio"
    new-value-mode="add"
    @input-value="onSearch"
    @new-value="createValue"
    bottom-slots
  >
    <template v-slot:hint>
      Выберите из списка, или нажмите "Enter", чтобы добавить новое значение
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { items, isLoading, fetchItems } from '@/composable/journals/inputJournalHelper'
import type { QSelect } from 'quasar'
import { ref } from 'vue'

const model = defineModel<string | undefined>({ required: true })
const RECEIVER_FIO = 'RECEIVER_FIO'
const receiverFio = ref<QSelect | null>(null)

async function onSearch(value: string) {
  await fetchItems(RECEIVER_FIO, value)
  if (receiverFio.value) receiverFio.value.showPopup()
}

function createValue(value: string, done: any) {
  done(value)
}
</script>
