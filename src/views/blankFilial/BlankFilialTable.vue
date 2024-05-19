<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    flat
    :filter="filter"
    :loading="isLoading"
    :rows-per-page-options="[30, 60, 100, 0]"
  >
    <template v-slot:top-left>
      <h5 class="q-my-none">Бланки филиалов</h5>
      <q-separator spaced vertical />
      <SearchInput v-model="filter" />
    </template>

    <template v-slot:top-right>
      <q-btn label="Добавить" color="primary" @click.prevent.stop="() => onEdit()" />
    </template>

    <template v-slot:body-cell-filial="props">
      <q-td :props="props">
        {{ props.value.name }}
      </q-td>
    </template>

    <template v-slot:body-cell-formGroup="props">
      <q-td :props="props">
        {{ props.value && props.value.name ? props.value.name : '' }}
      </q-td>
    </template>

    <template v-slot:body-cell-regDate="props">
      <q-td :props="props">
        {{ formatDateByLocale(props.value) }}
      </q-td>
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
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import SearchInput from '@/components/ui/inputs/SearchInput.vue'

import type { BlankFilialDto } from '@/api'
import { useQuasar, type QTableProps } from 'quasar'
import { computed, ref } from 'vue'
import { formatDateByLocale } from '@/composable/helpers/dateHelper'

interface Props {
  items: BlankFilialDto[]
  isLoading: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'onEdit', item: BlankFilialDto | undefined): void
  (e: 'onDelete', id: number): void
}>()

const $q = useQuasar()
const filter = ref('')
const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'filial',
    label: 'Филиал',
    align: 'left',
    field: 'filial'
  },
  {
    name: 'startNumber',
    label: 'Начальный номер',
    align: 'left',
    field: 'startNumber'
  },
  {
    name: 'endNumber',
    label: 'Конечный номер',
    align: 'left',
    field: 'endNumber'
  },
  {
    name: 'formGroup',
    label: 'Группа форм',
    align: 'left',
    field: 'formGroup'
  },
  {
    name: 'regDate',
    label: 'Дата выдачи',
    align: 'left',
    field: 'regDate'
  },
  {
    name: 'actions',
    label: 'Редактировать',
    align: 'left',
    field: 'actions',
    sortable: false
  }
])

function onEdit(item?: BlankFilialDto) {
  emit('onEdit', item)
}

function onDelete(item: BlankFilialDto) {
  $q.dialog({
    title: 'Подтвердите',
    message: 'Вы действительно хотите удалить запись?',
    cancel: true
  }).onOk(() => {
    if (item.id) emit('onDelete', item.id)
  })
}
</script>
