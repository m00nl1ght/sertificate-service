<template>
  <div></div>
</template>

<script setup lang="ts">
// import { routeNameHome } from '@/router/names/routeNames'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
// import router from '@/router'
import { getActivePinia } from 'pinia'

// map through that list and use the **$reset** fn to reset the state

const authStore = useAuthStore()
onMounted(() => {
  try {
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    getActivePinia()._s.forEach((store) => store.$reset())
  } catch (error) {
    console.log(error)
  }

  authStore.logout()
})
</script>
