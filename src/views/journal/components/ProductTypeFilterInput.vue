<template>
  <q-select
    v-model="model"
    option-value="id"
    option-label="name"
    :options="productTypeList"
    label="Тип продукта"
    :loading="checkLoading(GET_PRODUCT_TYPE_LOADER)"
    emit-value
    map-options
    outlined
    dense
    multiple
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'

import { useProductTypeStore } from '@/stores/productType'

const model = defineModel({ required: true })

const productTypeStore = useProductTypeStore()
const { productTypeList } = storeToRefs(productTypeStore)
const GET_PRODUCT_TYPE_LOADER = 'GET_PRODUCT_TYPE_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    productTypeStore.getAllProductTypes()
  }, [GET_PRODUCT_TYPE_LOADER])
})
</script>
