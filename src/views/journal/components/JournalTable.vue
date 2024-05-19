<template>
  <div>
    <q-table
      :rows="journals"
      :columns="columns"
      flat
      v-model:pagination="pagination"
      :loading="isLoadingJournals"
      :rows-per-page-options="[30, 60, 100, 0]"
      @request="onRequest"
    >
      <template v-slot:top-left>
        <h5 class="q-my-none">Журналы</h5>
        <q-separator spaced vertical />
        <SearchInput v-model="search" @update:model-value="onSearch" />
      </template>

      <template v-slot:top-right="props">
        <q-btn label="Добавить" color="primary" @click.prevent.stop="() => onEdit()" />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width>Действия</q-th>
          <q-th auto-width>Действия исполнителя</q-th>
          <q-th auto-width>Действия наблюдателя</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ getCustomColumnValue(col, props.row) }}
          </q-td>

          <q-td auto-width>
            <q-btn
              flat
              round
              color="primary"
              icon="mdi-information-outline"
              @click="emit('showHistory', props.row.id)"
              title="История"
            />
            <q-btn
              v-if="hasPermission(['ADMIN', 'WATCHER']) || props.row.statusId === 1"
              flat
              round
              color="primary"
              icon="mdi-pencil-outline"
              @click.prevent.stop="() => onEdit(props.row)"
              title="Редактировать"
            />
            <q-btn
              v-if="hasPermission(['ADMIN', 'WATCHER']) || props.row.statusId === 1"
              flat
              round
              color="primary"
              icon="mdi-delete-outline"
              @click.prevent.stop="() => onDelete(props.row.id)"
              class="q-ml-3"
              title="Удалить"
            />
          </q-td>

          <q-td>
            <JournalTableStatusWorker :row="props.row" />
          </q-td>

          <q-td>
            <JournalTableStatusWatcher :row="props.row" />
          </q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <JornalTableRowInfo :row="props.row" />
          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom-row="props">
        <q-tr>
          <q-td>Итого: {{ totalItems }}</q-td>
          <q-td v-for="col in props.cols">
            {{ getTotal(col.name) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/ui/inputs/SearchInput.vue'
import JornalTableRowInfo from '@/views/journal/components/JornalTableRowInfo.vue'
import JournalTableStatusWatcher from '@/views/journal/components/JournalTableStatusWatcher.vue'
import JournalTableStatusWorker from '@/views/journal/components/JournalTableStatusWorker.vue'

import { computed, onMounted } from 'vue'
import { useQuasar, type QTableProps } from 'quasar'
import { useJournalStore } from '@/stores/journal'
import { storeToRefs } from 'pinia'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import type { JournalDto } from '@/api'
import { formatDateByLocale } from '@/composable/helpers/dateHelper'
import { getFullName } from '@/composable/helpers/peopleHelper'
import { useAuthStore } from '@/stores/auth'
import {
  isLoadingJournals,
  getAllJournals,
  GET_JOURNALS_LOADER
} from '@/composable/journals/getAllJournals'

const emit = defineEmits<{
  (e: 'onEdit', item: JournalDto | undefined): void
  (e: 'showHistory', id: number): void
}>()

const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'seq',
    label: 'Номер',
    align: 'left',
    field: 'seq',
    sortable: true
  },
  {
    name: 'createDate',
    label: 'Дата поступления заявки',
    align: 'left',
    field: 'createDate',
    sortable: true
  },
  {
    name: 'statusName',
    label: 'Статус',
    align: 'left',
    field: 'statusName',
    sortable: true
  },
  {
    name: 'certificateBlankNumber',
    label: 'Номер бланка',
    align: 'left',
    field: 'certificateBlankNumber',
    sortable: true
  },
  {
    name: 'requesterName',
    label: 'Наименование заявителя',
    align: 'left',
    field: 'requesterName',
    sortable: true
  },
  {
    name: 'productName',
    label: 'Товар',
    align: 'left',
    field: 'productName',
    sortable: true
  },
  {
    name: 'expertName',
    label: 'ФИО эксперта',
    align: 'left',
    field: 'expertName',
    sortable: true
  },
  {
    name: 'certificatePrice',
    label: 'Стоимость сертификата',
    align: 'left',
    field: 'certificatePrice',
    sortable: true
  },
  {
    name: 'expertizePrice',
    label: 'Стоимость экспертизы',
    align: 'left',
    field: 'expertizePrice',
    sortable: true
  }
])

const $q = useQuasar()

const journalStore = useJournalStore()
const { journals, pagination, search } = storeToRefs(journalStore)
const authStore = useAuthStore()
const { hasPermission } = storeToRefs(authStore)

const certificatePriceTotal = computed(() => {
  if (journals) {
    return journals.value.reduce(
      (cur: number, prev: JournalDto) => cur + (prev.certificatePrice ? prev.certificatePrice : 0),
      0
    )
  }
  return 0
})

const expertizePriceTotal = computed(() => {
  if (journals) {
    return journals.value.reduce(
      (cur: number, prev: JournalDto) => cur + (prev.expertizePrice ? prev.expertizePrice : 0),
      0
    )
  }
  return 0
})

const totalItems = computed(() => journals.value.length)

function getTotal(item: string) {
  if (item === 'certificatePrice') return certificatePriceTotal
  if (item === 'expertizePrice') return expertizePriceTotal
  return ''
}

function getCustomColumnValue(col: { name: string; value: string }, row: JournalDto) {
  switch (col.name) {
    case 'createDate':
      return formatDateByLocale(col.value)

    case 'expertName':
      return getFullName(row.expertLastName, row.expertFirstName, row.expertMiddleName)

    default:
      return col.value
  }
}

function onSearch() {
  if (pagination.value) pagination['value']['page'] = 1
  getAllJournals()
}

function onRequest(props: QTableProps) {
  if (props.pagination) journalStore.pagination = props.pagination
  getAllJournals()
}

function onEdit(item?: JournalDto) {
  emit('onEdit', item)
}

function onDelete(journalId: number) {
  $q.dialog({
    title: 'Подтвердите',
    message: 'Вы действительно хотите удалить запись?',
    cancel: true
  }).onOk(() => {
    withLoadingIndicator(async () => {
      await withNotifier(async () => {
        await journalStore.deleteJournal(journalId)
        getAllJournals()
      })
    }, [GET_JOURNALS_LOADER])
  })
}

onMounted(() => {
  getAllJournals()
})
</script>
