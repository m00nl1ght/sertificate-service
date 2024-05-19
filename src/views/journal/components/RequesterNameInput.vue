<template>
  <q-select
    v-model="model"
    :loading="isLoading"
    :options="items"
    use-input
    use-chips
    label="Наименование заявителя"
    outlined
    dense
    clearable
    ref="requesterName"
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
const REQUESTER_NAME = 'REQUESTER_NAME'
const requesterName = ref<QSelect | null>(null)

async function onSearch(value: string) {
  await fetchItems(REQUESTER_NAME, value)
  if (requesterName.value) requesterName.value.showPopup()
}

function createValue(value: string, done: any) {
  done(value)
}
</script>
