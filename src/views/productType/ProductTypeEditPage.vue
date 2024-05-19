<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Тип продукции" :to="{ name: routeNameProductType }" />
        <q-breadcrumbs-el
          :label="
            formValue && formValue.id ? 'Редактирование типа продукта' : 'Добавить тип продукта'
          "
        />
      </q-breadcrumbs>
    </div>

    <q-form ref="addProductTypeFormRef" @submit="onSubmit">
      <div class="q-col-gutter-md row">
        <q-input
          dense
          outlined
          v-model="formValue.name"
          label="Название"
          counter
          maxlength="255"
          :rules="[required, max255]"
          class="col-12"
        ></q-input>
      </div>
      <div>
        <q-btn label="Сохранить" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { routeNameProductType } from '@/router/names/routeNames'

import type { QForm } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { required, max255 } from '@/composable/helpers/rulesHelper'
import { storeToRefs } from 'pinia'
import type { ProductTypeDto } from '@/api'
import { useProductTypeStore } from '@/stores/productType'

const router = useRouter()
const route = useRoute()
const addProductTypeFormRef = ref<InstanceType<typeof QForm> | null>(null)
const SAVE_PRODUCT_TYPE_LOADER = 'SAVE_PRODUCT_TYPE_LOADER'
const productTypeId = computed(() => Number(route.params.id))

const productTypeStore = useProductTypeStore()
const { productType } = storeToRefs(productTypeStore)
const formValueDefault = () => ({
  name: ''
})

const formValue = ref<ProductTypeDto>(formValueDefault())

function onSubmit() {
  addProductTypeFormRef.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          await productTypeStore.saveProductType(formValue.value)
          router.push({ name: routeNameProductType })
        })
      }, [SAVE_PRODUCT_TYPE_LOADER])
    }
  })
}

onMounted(async () => {
  if (productTypeId.value) {
    await productTypeStore.getProductTypeById(productTypeId.value)
    if (productType.value) formValue.value = { ...productType.value }
  }
})
</script>
