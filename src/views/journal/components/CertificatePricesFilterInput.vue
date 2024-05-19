<template>
  <q-select
    v-model="model"
    :options="certificatePrices"
    :label="'Стоимость сертификата'"
    emit-value
    map-options
    outlined
    dense
    :loading="checkLoading(GET_CERTIFICATE_PRICES_LOADER)"
    multiple
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '@/stores/catalogs'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { onMounted } from 'vue'

const model = defineModel({ required: true })

const catalogStore = useCatalogStore()
const { certificatePrices } = storeToRefs(catalogStore)
const GET_CERTIFICATE_PRICES_LOADER = 'GET_CERTIFICATE_PRICES_LOADER'

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getCertificatePrice()
  }, [GET_CERTIFICATE_PRICES_LOADER])
})
</script>
