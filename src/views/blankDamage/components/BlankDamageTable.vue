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
      <h5 class="q-my-none">Бланки</h5>
    </template>

    <template v-slot:top-right>
      <q-btn label="Добавить" color="primary" @click.prevent.stop="() => onEdit()" />
    </template>

    <template v-slot:body-cell-regDate="props">
      <q-td :props="props">
        {{ formatDateByLocale(props.value, true) }}
      </q-td>
    </template>

    <template v-slot:body-cell-account="props">
      <q-td :props="props">
        {{
          getFullName(
            props.row.accountLastName,
            props.row.accountFirstName,
            props.row.accountMiddleName
          )
        }}
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
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
import type { BlankDamageDto } from '@/api'
import { useQuasar, type QTableProps } from 'quasar'
import { computed } from 'vue'
import { formatDateByLocale } from '@/composable/helpers/dateHelper'
import { getFullName } from '@/composable/helpers/peopleHelper'

interface Props {
  items: BlankDamageDto[]
  isLoading: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'onEdit', item: BlankDamageDto | undefined): void
  (e: 'onDelete', id: number): void
}>()

const $q = useQuasar()
const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'blankNumber',
    label: 'Номер бланка',
    align: 'left',
    field: 'blankNumber'
  },
  {
    name: 'regDate',
    label: 'Дата регистрации',
    align: 'left',
    field: 'regDate'
  },
  {
    name: 'account',
    label: 'Аккаунт',
    align: 'left',
    field: 'account'
  },
  {
    name: 'actions',
    label: 'Редактировать',
    align: 'left',
    field: 'actions',
    sortable: false
  }
])

function onEdit(item?: BlankDamageDto) {
  emit('onEdit', item)
}

function onDelete(item: BlankDamageDto) {
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
