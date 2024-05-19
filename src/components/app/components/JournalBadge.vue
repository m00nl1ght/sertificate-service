<template>
  <q-badge v-if="sockedMessageEditedJournalIds.length" color="red" floating rounded>{{
    sockedMessageEditedJournalIds.length
  }}</q-badge>
</template>

<script setup lang="ts">
import { useJournalStore } from '@/stores/journal'
import { storeToRefs } from 'pinia'

const journalStore = useJournalStore()
const { sockedMessageEditedJournalIds } = storeToRefs(journalStore)
</script>
