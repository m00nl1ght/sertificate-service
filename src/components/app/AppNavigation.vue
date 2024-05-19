<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    bordered
    behavior="desktop"
    :mini="mini"
  >
    <q-list class="q-mt-md">
      <template v-for="menuItem in menuList">
        <q-item clickable v-ripple :to="menuItem.to">
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>

          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>

      <q-item clickable v-ripple :to="{ name: routeNames.routeNameJournal }">
        <q-item-section avatar>
          <q-icon :name="'mdi-notebook-outline'" />
        </q-item-section>

        <q-item-section>
          <div style="position: relative">
            Журналы
            <JournalBadge />
          </div>
        </q-item-section>
      </q-item>

      <q-item v-if="isAdmin" clickable v-ripple :to="{ name: routeNames.routeNameProductType }">
        <q-item-section avatar>
          <q-icon :name="'mdi-text-box-outline'" />
        </q-item-section>

        <q-item-section> Тип продукта </q-item-section>
      </q-item>

      <q-item v-if="isAdmin" clickable v-ripple :to="{ name: routeNames.routeNameBlankFilial }">
        <q-item-section avatar>
          <q-icon :name="'mdi-book-open-outline'" />
        </q-item-section>

        <q-item-section> Бланки филиалов </q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{ name: routeNames.routeNameBlankDamage }">
        <q-item-section avatar>
          <q-icon :name="'mdi-file-document-alert-outline'" />
        </q-item-section>

        <q-item-section> Испорченные бланки </q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{ name: routeNames.routeNameReports }">
        <q-item-section avatar>
          <q-icon :name="'mdi-file-chart-outline'" />
        </q-item-section>

        <q-item-section> Отчетность </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import JournalBadge from './components/JournalBadge.vue'

import { ref, computed } from 'vue'
import * as routeNames from '@/router/names/routeNames'

import { useAppMenuStore } from '@/stores/app/appMenu'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)

const leftDrawerOpen = ref(false)
const appMenuStore = useAppMenuStore()
const { mini } = storeToRefs(appMenuStore)

const menuList = computed(() => {
  const result = [
    {
      to: { name: routeNames.routeNameAccount },
      label: 'Учетные записи',
      icon: 'mdi-account-group-outline'
    },
    {
      to: { name: routeNames.routeNameFilial },
      label: 'Филиалы',
      icon: 'mdi-home-group'
    }
  ]

  return result
})
</script>
