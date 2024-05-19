<template>
  <q-page padding>
    <FilialsTable
      :items="filialList"
      @on-delete="onDelete"
      @on-edit="onEdit"
      @on-change-account="onChangeAccount"
      :is-loading="checkLoading(GET_FILIAL_LIST_LOADER)"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useFilialStore } from '@/stores/filial'
import FilialsTable from './components/FilialsTable.vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import type { FilialDto } from '@/api'
import {
  routeNameFilialAccounts,
  routeNameFilialAdd,
  routeNameFilialEdit
} from '@/router/names/routeNames'
import { useRouter } from 'vue-router'

const router = useRouter()
const filialStore = useFilialStore()
const { filialList } = storeToRefs(filialStore)
const GET_FILIAL_LIST_LOADER = 'GET_FILIAL_LIST_LOADER'

function getAllFilialList() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await filialStore.getAllFilialList()
    })
  }, [GET_FILIAL_LIST_LOADER])
}

function onDelete(id: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await filialStore.deleteFilial(id)
    })
    getAllFilialList()
  }, [GET_FILIAL_LIST_LOADER])
}

function onEdit(item?: FilialDto) {
  if (item) {
    router.push({
      name: routeNameFilialEdit,
      params: {
        id: item.id
      }
    })
  } else {
    router.push({ name: routeNameFilialAdd })
  }
}

function onChangeAccount(id: number) {
  router.push({
    name: routeNameFilialAccounts,
    params: {
      id
    }
  })
}

onMounted(() => {
  getAllFilialList()
})
</script>
