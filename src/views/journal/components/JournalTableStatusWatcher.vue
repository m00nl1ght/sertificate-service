<template>
  <div v-if="isWatcher">
    <q-btn
      v-if="statusId !== 1"
      @click="setStatus(1)"
      :loading="checkLoading(SET_STATUS_WATCHER_LOADER)"
      outline
      rounded
      size="sm"
      >На доработку</q-btn
    >

    <q-btn
      v-if="statusId !== 4"
      @click="setStatus(4)"
      :loading="checkLoading(SET_STATUS_WATCHER_LOADER)"
      outline
      rounded
      size="sm"
      >Принять</q-btn
    >

    <q-btn
      v-if="statusId !== 3"
      @click="setStatus(3)"
      :loading="checkLoading(SET_STATUS_WATCHER_LOADER)"
      outline
      rounded
      size="sm"
      >Отклонить</q-btn
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
const { isWatcher } = storeToRefs(authStore)

const SET_STATUS_WATCHER_LOADER = 'SET_STATUS_WATCHER_LOADER'

function setStatus(statusId: number) {
  const journalId = props.row.id

  if (journalId) {
    withLoadingIndicator(async () => {
      await withNotifier(async () => {
        await journalStore.setStatus(journalId, statusId, {
          value: props.row.description ?? ''
        })
      })
    }, [SET_STATUS_WATCHER_LOADER])
  }
}
</script>
