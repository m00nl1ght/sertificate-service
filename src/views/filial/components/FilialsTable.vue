<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    flat
    :loading="isLoading"
    :rows-per-page-options="[30, 60, 100, 0]"
  >
    <template v-slot:top-left>
      <h5 class="q-my-none">Филиалы</h5>
    </template>

    <template v-slot:top-right>
      <q-btn label="Добавить" color="primary" @click.prevent.stop="() => onEdit()" />
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          flat
          round
          color="primary"
          icon="mdi-pencil-outline"
          @click.prevent.stop="() => onEdit(props.row)"
          title="Редактировать"
        />
        <q-btn
          flat
          round
          color="primary"
          icon="mdi-delete-outline"
          @click.prevent.stop="() => onDelete(props.row)"
          class="q-ml-3"
          title="Удалить"
        />
        <q-btn
          flat
          round
          color="primary"
          icon="mdi-account-multiple-plus"
          @click.prevent.stop="() => onChangeAccount(props.row)"
          class="q-ml-3"
          title="Редактировать аккаунты"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { FilialDto } from '@/api'
import { useQuasar, type QTableProps } from 'quasar'
import { computed } from 'vue'

interface Props {
  items: FilialDto[]
  isLoading: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'onEdit', item: FilialDto | undefined): void
  (e: 'onDelete', id: number): void
  (e: 'onChangeAccount', id: number): void
}>()

const $q = useQuasar()
const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'name',
    label: 'Название',
    align: 'left',
    field: 'name'
  },
  {
    name: 'code',
    label: 'Код',
    align: 'left',
    field: 'code'
  },
  {
    name: 'actions',
    label: 'Редактировать',
    align: 'left',
    field: 'actions',
    sortable: false
  }
])

function onEdit(item?: FilialDto) {
  emit('onEdit', item)
}

function onChangeAccount(item: FilialDto) {
  if (item.id) emit('onChangeAccount', item.id)
}

function onDelete(item: FilialDto) {
  $q.dialog({
    title: 'Подтвердите',
    message: 'Вы действительно хотите удалить запись?',
    cancel: true
  }).onOk(() => {
    if (item.id) emit('onDelete', item.id)
  })
}
</script>

<style scoped></style>
