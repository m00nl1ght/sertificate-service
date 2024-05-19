<template>
  <q-header bordered class="q-py-sm header">
    <q-toolbar class="h-full">
      <q-btn flat @click="mini = !mini" round dense icon="mdi-menu" />

      <q-toolbar-title></q-toolbar-title>

      <!-- <LocaleSelect class="q-mr-md" /> -->
      <DarkModeBtn class="q-mr-md" />

      <UserInfo />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import DarkModeBtn from './components/DarkModeBtn.vue'
// import LocaleSelect from '@/components/app/components/LocaleSelect.vue'
import UserInfo from '@/components/app/components/UserInfo.vue'
import { useAppMenuStore } from '@/stores/app/appMenu'
import { storeToRefs } from 'pinia'

const appMenuStore = useAppMenuStore()
const { mini } = storeToRefs(appMenuStore)
</script>

<style scoped lang="scss">
.header {
  height: 64px;
  background-color: inherit;
  color: inherit;
}
</style>
