<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <BlankDamageTable
          :items="blankDamageList"
          :is-loading="checkLoading(GET_BLANK_DAMAGE_LOADER)"
          @on-edit="onEdit"
          @on-delete="onDelete"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BlankDamageTable from './components/BlankDamageTable.vue'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { routeNameBlankDamageAdd } from '@/router/names/routeNames'
import { useBlankDamageStore } from '@/stores/blankDamage'
import { storeToRefs } from 'pinia'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'

const router = useRouter()

const blankDamageStore = useBlankDamageStore()
const { blankDamageList } = storeToRefs(blankDamageStore)
const GET_BLANK_DAMAGE_LOADER = 'GET_BLANK_DAMAGE_LOADER'

function getBlankDamage() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await blankDamageStore.getBlankDamage()
    })
  }, [GET_BLANK_DAMAGE_LOADER])
}

function onEdit() {
  router.push({ name: routeNameBlankDamageAdd })
}

function onDelete(id: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await blankDamageStore.deleteBlankDamage(id)
    })
    getBlankDamage()
  }, [GET_BLANK_DAMAGE_LOADER])
}

onMounted(() => {
  getBlankDamage()
})
</script>
