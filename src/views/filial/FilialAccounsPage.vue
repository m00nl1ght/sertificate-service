<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Филиалы" :to="{ name: routeNameFilial }" />
        <q-breadcrumbs-el :label="'Добавить аккаунт'" />
      </q-breadcrumbs>
    </div>

    <FilialsAccountTable
      :items="accounts"
      :is-loading="isLoadingAccounts && checkLoading(GET_ALL_ACCOUNT_LOADER)"
      v-model:selected="selected"
    />
  </q-page>
</template>

<script setup lang="ts">
import FilialsAccountTable from './components/FilialsAccountTable.vue'

import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { routeNameFilial } from '@/router/names/routeNames'
import { useFilialStore } from '@/stores/filial'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAllAccounts, isLoadingAccounts, accounts } from '@/composable/accounts/getAllAccounts'

const filialStore = useFilialStore()
const { accountByFilialList } = storeToRefs(filialStore)
const route = useRoute()
const GET_ALL_ACCOUNT_LOADER = 'GET_ALL_ACCOUNT_LOADER'
const filialId = computed(() => Number(route.params.id))

const selected = computed({
  get() {
    return accountByFilialList.value
  },
  set(selectedAccounts) {
    if (selectedAccounts.length > accountByFilialList.value.length) {
      const result = selectedAccounts.filter((el) => !accountByFilialList.value.includes(el))
      if (result[0].id) addAccount(result[0].id, filialId.value)
    } else {
      const result = accountByFilialList.value.filter((el) => !selectedAccounts.includes(el))
      if (result[0].id) deleteAccount(result[0].id, filialId.value)
    }
  }
})

function getAllAccountsByFilial(filialId: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await filialStore.getAllAccountsByFilial(filialId)
    })
  }, [GET_ALL_ACCOUNT_LOADER])
}

function addAccount(accountId: number, filialId: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await filialStore.addAccount(accountId, filialId)
      await filialStore.getAllAccountsByFilial(filialId)
    })
  }, [GET_ALL_ACCOUNT_LOADER])
}

function deleteAccount(accountId: number, filialId: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await filialStore.deleteAccount(accountId, filialId)
      await filialStore.getAllAccountsByFilial(filialId)
    })
  }, [GET_ALL_ACCOUNT_LOADER])
}

onMounted(async () => {
  if (route.params && route.params.id) {
    getAllAccountsByFilial(filialId.value)
    getAllAccounts()
  }
})
</script>
