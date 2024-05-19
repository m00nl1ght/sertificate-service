<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    flat
    :loading="isLoading"
    :rows-per-page-options="[30, 60, 100, 0]"
    selection="multiple"
    v-model:selected="selected"
  >
    <template v-slot:header-selection></template>

    <template v-slot:body-cell-enabled="props">
      <q-td :props="props">
        <q-icon
          :color="props.value ? 'green' : 'red'"
          size="2em"
          :name="props.value ? 'mdi-checkbox-marked-outline' : 'mdi-close-box-outline'"
        ></q-icon>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { AccountDto } from '@/api'
import type { QTableProps } from 'quasar'
import { computed } from 'vue'

interface Props {
  items: AccountDto[]
  isLoading: boolean
  // selected: AccountDto[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'onAdd', item?: AccountDto): void
  (e: 'update:selected', item?: AccountDto): void
}>()
const selected = defineModel<AccountDto[]>('selected', { required: true })

const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'login',
    label: 'Логин',
    align: 'left',
    field: 'login'
  },
  {
    name: 'user',
    label: 'Пользователь',
    align: 'left',
    field: 'user',
    sortable: false
  },
  {
    name: 'enabled',
    label: 'Активный',
    align: 'center',
    field: 'enabled',
    sortable: false
  }
])

// const selectedItem = computed({
//   get() {
//     return props.selected
//   },
//   set(value) {
//     console.log('value', value)
//   }
// })
</script>

<style scoped></style>
