<template>
  <q-page padding>
    <AccountTable
      :items="accounts"
      :is-loading="isLoadingAccounts"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-edit-permission="onEditPermission"
      @on-change-password="onChangePassword"
    />
  </q-page>
</template>

<script setup lang="ts">
import AccountTable from './compoments/AccountTable.vue'

import type { AccountDto } from '@/api'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import {
  routeNameAccountAdd,
  routeNameAccountEdit,
  routeNameAccountPassword
} from '@/router/names/routeNames'
import { useAccountStore } from '@/stores/account'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { routeNameAccountPermission } from '../../router/names/routeNames'
import {
  getAllAccounts,
  isLoadingAccounts,
  accounts,
  GET_ACCOUNT_LOADER
} from '@/composable/accounts/getAllAccounts'

const router = useRouter()
const accountStore = useAccountStore()

function onEdit(item?: AccountDto) {
  if (item && item.id) {
    router.push({
      name: routeNameAccountEdit,
      params: {
        id: item.id
      }
    })
  } else {
    router.push({ name: routeNameAccountAdd })
  }
}

function onEditPermission(id: number) {
  router.push({
    name: routeNameAccountPermission,
    params: {
      id
    }
  })
}

function onDelete(id: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await accountStore.deleteAccount1(id)
    })
    getAllAccounts()
  }, [GET_ACCOUNT_LOADER])
}

function onChangePassword(id: number) {
  router.push({
    name: routeNameAccountPassword,
    params: {
      id
    }
  })
}

onMounted(() => {
  getAllAccounts()
})
</script>

<style scoped></style>
