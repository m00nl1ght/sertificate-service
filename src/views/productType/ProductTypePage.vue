<template>
  <q-page padding>
    <ProductTypeTable
      :items="productTypeList"
      :is-loading="checkLoading(GET_PRODUCT_TYPES_LOADER)"
      @on-delete="onDelete"
      @on-edit="onEdit"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useProductTypeStore } from '@/stores/productType'
import { storeToRefs } from 'pinia'

import ProductTypeTable from './ProductTypeTable.vue'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ProductTypeDto } from '@/api'
import { routeNameProductTypeAdd, routeNameProductTypeEdit } from '@/router/names/routeNames'

const router = useRouter()
const productTypeStore = useProductTypeStore()
const { productTypeList } = storeToRefs(productTypeStore)
const GET_PRODUCT_TYPES_LOADER = 'GET_PRODUCT_TYPES_LOADER'

function getAllProductTypes() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await productTypeStore.getAllProductTypes()
    })
  }, [GET_PRODUCT_TYPES_LOADER])
}

function onDelete(id: number) {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await productTypeStore.deleteProductType(id)
    })
  }, [GET_PRODUCT_TYPES_LOADER])
}

function onEdit(item?: ProductTypeDto) {
  if (item) {
    router.push({
      name: routeNameProductTypeEdit,
      params: {
        id: item.id
      }
    })
  } else {
    router.push({ name: routeNameProductTypeAdd })
  }
}

onMounted(() => {
  getAllProductTypes()
})
</script>
