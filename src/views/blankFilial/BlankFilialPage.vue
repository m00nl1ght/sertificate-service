<template>
  <q-page padding>
    <BlankFilialTable
      :items="blankFilialList"
      :is-loading="checkLoading(GET_BLANK_FILIAL_LOADER)"
      @on-delete="onDelete"
      @on-edit="onEdit"
    />
  </q-page>
</template>

<script setup lang="ts">
import BlankFilialTable from './BlankFilialTable.vue'

import { storeToRefs } from 'pinia'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { BlankFilialDto } from '@/api'
import { routeNameBlankFilialAdd, routeNameBlankFilialEdit } from '@/router/names/routeNames'
import { useBlankFilialStore } from '@/stores/blankFilial'

const router = useRouter()
const blankFilialStore = useBlankFilialStore()
const { blankFilialList } = storeToRefs(blankFilialStore)
const GET_BLANK_FILIAL_LOADER = 'GET_BLANK_FILIAL_LOADER'

function getAllProductTypes() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await blankFilialStore.getAllBlankFilial()
    })
  }, [GET_BLANK_FILIAL_LOADER])
}

function onDelete(id: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await blankFilialStore.deleteBlankFilial(id)
    })
  }, [GET_BLANK_FILIAL_LOADER])
}

function onEdit(item?: BlankFilialDto) {
  if (item) {
    router.push({
      name: routeNameBlankFilialEdit,
      params: {
        id: item.id
      }
    })
  } else {
    router.push({ name: routeNameBlankFilialAdd })
  }
}

onMounted(() => {
  getAllProductTypes()
})
</script>
