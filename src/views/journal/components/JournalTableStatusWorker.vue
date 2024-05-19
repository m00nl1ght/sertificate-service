<template>
  <div>
    <q-btn
      v-if="isWorker && statusId === 1"
      @click="setStatusProcess()"
      :loading="checkLoading(SET_STATUS_PROCESS_LOADER)"
      outline
      rounded
      size="sm"
      >На проверку</q-btn
    >

    <q-btn
      v-if="isWorker && statusId === 2"
      @click="setStatusNew()"
      :loading="checkLoading(SET_STATUS_NEW_LOADER)"
      outline
      rounded
      size="sm"
      >Oтозвать</q-btn
    >
  </div>
</template>

<script setup lang="ts">
import type { JournalDto } from '@/api'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { useAuthStore } from '@/stores/auth'
import { useJournalStore } from '@/stores/journal'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const journalStore = useJournalStore()

interface Props {
  row: JournalDto
}

const props = defineProps<Props>()

const statusId = computed(() => props.row.statusId)
const authStore = useAuthStore()
const { isWorker } = storeToRefs(authStore)

const SET_STATUS_PROCESS_LOADER = 'SET_STATUS_PROCESS_LOADER'
const SET_STATUS_NEW_LOADER = 'SET_STATUS_NEW_LOADER'

function setStatusProcess() {
  const journalId = props.row.id

  if (journalId) {
    withLoadingIndicator(async () => {
      await withNotifier(async () => {
        await journalStore.statusProcess(journalId)
      })
    }, [SET_STATUS_PROCESS_LOADER])
  }
}

function setStatusNew() {
  const journalId = props.row.id

  if (journalId) {
    withLoadingIndicator(async () => {
      await withNotifier(async () => {
        await journalStore.statusNew(journalId)
      })
    }, [SET_STATUS_NEW_LOADER])
  }
}
</script>
