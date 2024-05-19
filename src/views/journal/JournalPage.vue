<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <JournalTableFilters />
      </div>
    </div>
    
    <div class="row q-mt-md">
      <div class="col-12">
        <JournalTable @onEdit="onEdit" @showHistory="showHistory" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import JournalTableFilters from '@/views/journal/components/JournalTableFilters.vue'
import JournalTable from '@/views/journal/components/JournalTable.vue'

import { useRouter } from 'vue-router'
import type { JournalDto } from '@/api'
import {
  routeNameJournalAdd,
  routeNameJournalEdit,
  routeNameJournalHistory
} from '@/router/names/routeNames'

const router = useRouter()

function onEdit(item?: JournalDto) {
  if (item && item.id) {
    router.push({
      name: routeNameJournalEdit,
      params: {
        id: item.id
      }
    })
  } else {
    router.push({ name: routeNameJournalAdd })
  }
}

function showHistory(id: number) {
  router.push({ name: routeNameJournalHistory, params: { id } })
}
</script>
