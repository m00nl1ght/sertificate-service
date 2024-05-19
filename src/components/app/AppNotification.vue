<template></template>

<script setup lang="ts">
import { watch } from 'vue'
import { useQuasar } from 'quasar'
import { useAppNotificationStore } from '@/stores/app/appNotification'
import { storeToRefs } from 'pinia'

const $q = useQuasar()
const appNotificationStore = useAppNotificationStore()
const { messages } = storeToRefs(appNotificationStore)

watch(messages.value, (value) => {
  if (value) {
    const item = messages.value.shift()
    if (item) {
      const { message, type, timeout } = item
      $q.notify({
        message: message,
        type,
        timeout,
        actions: [
          {
            icon: 'mdi-close',
            color: 'white',
            round: true,
            handler: () => {
              /* ... */
            }
          }
        ]
      })
    }
  }
})
</script>
