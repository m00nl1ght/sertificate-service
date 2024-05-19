<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, watch } from 'vue'
import { useAuthStore } from './stores/auth'
import { install } from './composable/socketHelper'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

onBeforeMount(async () => {
  const TOKEN = authStore.token
  if (TOKEN) {
    await authStore.getTokenInfo()
  }
})

onMounted(() => {
  install()
})

watch(userId, (value) => {
  if (value) install()
})
</script>
