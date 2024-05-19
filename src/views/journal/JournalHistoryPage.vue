<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Журналы" :to="{ name: routeNameJournal }" />
        <q-breadcrumbs-el label="История журнала" />
      </q-breadcrumbs>
    </div>

    <q-table
      :rows="journalHistory"
      :columns="columns"
      flat
      v-model:pagination="pagination"
      :loading="checkLoading(GET_JOURNALS_HISTORY_LOADER)"
      :rows-per-page-options="[30, 60, 100, 0]"
      @request="onRequest"
    >
      <template v-slot:top-right="props">
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
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.name in customColumn ? getCustomColumnValue(col, props.row) : col.value }}
          </q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <JornalTableRowInfo :row="props.row" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import JornalTableRowInfo from '@/views/journal/components/JornalTableRowInfo.vue'

import { computed, onMounted } from 'vue'
import type { QTableProps } from 'quasar'
import { storeToRefs } from 'pinia'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import type { JournalHistoryDto } from '@/api'
import { useJournalHistoryStore } from '@/stores/journalHistory'
import { useRoute } from 'vue-router'
import { routeNameJournal } from '@/router/names/routeNames'
import { formatDateByLocale } from '@/composable/helpers/dateHelper'
import { getFullName } from '@/composable/helpers/peopleHelper'

const emit = defineEmits<{
  (e: 'onEdit', item: JournalHistoryDto | undefined): void
}>()
const route = useRoute()

const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'updateDate',
    label: 'Дата изменения',
    align: 'left',
    field: 'updateDate',
    sortable: false
  },
  {
    name: 'accountName',
    label: 'УЗ',
    align: 'left',
    field: 'accountName',
    sortable: false
  },
  {
    name: 'seq',
    label: 'Номер',
    align: 'left',
    field: 'seq',
    sortable: false
  },
  {
    name: 'createDate',
    label: 'Дата поступления заявки',
    align: 'left',
    field: 'createDate',
    sortable: false
  },
  {
    name: 'statusName',
    label: 'Статус',
    align: 'left',
    field: 'statusName',
    sortable: false
  },
  {
    name: 'requesterName',
    label: 'Наименование заявителя',
    align: 'left',
    field: 'requesterName',
    sortable: false
  },
  {
    name: 'productName',
    label: 'Товар',
    align: 'left',
    field: 'productName',
    sortable: false
  },
  {
    name: 'expertName',
    label: 'ФИО эксперта',
    align: 'left',
    field: 'expertName',
    sortable: false
  }
])

const journalId = computed(() => Number(route.params.id))
const GET_JOURNALS_HISTORY_LOADER = 'GET_JOURNALS_HISTORY_LOADER'
const journalHistoryStore = useJournalHistoryStore()
const { journalHistory, pagination } = storeToRefs(journalHistoryStore)

const customColumn = {
  updateDate: 'updateDate',
  accountName: 'accountName',
  expertName: 'expertName',
  createDate: 'createDate'
}

function getCustomColumnValue(col: any, row: JournalHistoryDto) {
  switch (col.name) {
    case 'updateDate':
      return formatDateByLocale(col.value, true)
    case 'createDate':
      return formatDateByLocale(col.value)

    case 'accountName':
      return getFullName(row.accountLastName, row.accountFirstName, row.accountMiddleName)
    case 'expertName':
      return getFullName(row.expertLastName, row.expertFirstName, row.expertMiddleName)

    default:
      return ''
  }
}

function getJournalHistory() {
  if (journalId.value) {
    withLoadingIndicator(async () => {
      await journalHistoryStore.getJournalHistory(journalId.value)
    }, [GET_JOURNALS_HISTORY_LOADER])
  }
}

function onRequest(props: QTableProps) {
  if (props.pagination) journalHistoryStore.pagination = props.pagination
  getJournalHistory()
}

onMounted(() => {
  getJournalHistory()
})
</script>
