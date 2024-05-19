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
      <h5 class="q-my-none">Учетные записи</h5>
    </template>

    <template v-slot:top-right>
      <q-btn label="Добавить" color="primary" @click.prevent.stop="() => onEdit()" />
    </template>

    <template v-slot:body-cell-enabled="props">
      <q-td :props="props">
        <q-icon
          :color="props.value ? 'primary' : 'red'"
          size="2em"
          :name="props.value ? 'mdi-checkbox-marked-outline' : 'mdi-close-box-outline'"
        ></q-icon>
      </q-td>
    </template>

    <template v-slot:body-cell-user="props">
      <q-td :props="props">{{ getUserFullName(props.row) }} </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          flat
          round
          color="primary"
          icon="mdi-pencil-outline"
          @click.prevent.stop="() => onEdit(props.row)"
          class="q-ml-3"
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
          icon="mdi-account-lock-outline"
          @click.prevent.stop="() => onEditPermission(props.row)"
          class="q-ml-3"
          title="Редактировать права"
        />
        <q-btn
          flat
          round
          color="primary"
          icon="mdi-lock-outline"
          @click.prevent.stop="() => onChangePassword(props.row)"
          class="q-ml-3"
          title="Задать пароль"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { AccountDto } from '@/api'
import { getUserFullName } from '@/composable/helpers/peopleHelper'
import { useQuasar, type QTableProps } from 'quasar'
import { computed } from 'vue'

interface Props {
  items: AccountDto[]
  isLoading: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'onEdit', item?: AccountDto): void
  (e: 'onDelete', id: number): void
  (e: 'onEditPermission', id: number): void
  (e: 'onChangePassword', id: number): void
}>()

const $q = useQuasar()

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
  },
  {
    name: 'actions',
    label: 'Редактировать',
    align: 'center',
    field: 'actions',
    sortable: false
  }
])

function onEdit(item?: AccountDto) {
  emit('onEdit', item)
}

function onEditPermission(item: AccountDto) {
  if (item.id) emit('onEditPermission', item.id)
}

function onChangePassword(item: AccountDto) {
  if (item.id) emit('onChangePassword', item.id)
}

function onDelete(item: AccountDto) {
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
