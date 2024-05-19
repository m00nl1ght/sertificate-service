<template>
  <q-select
    v-model="model"
    :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
    option-label="shortName"
    :options="filtredCounries"
    :label="label"
    :loading="checkLoading(GET_COUNTRIES_LOADER)"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalogs'
import { storeToRefs } from 'pinia'
import { withLoadingIndicator } from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import type { ValidationRule } from 'quasar'

interface Props {
  label: string
  avalibleCounryCodes: string[]
  rules?: ValidationRule[]
}

const model = defineModel({ required: true })
const props = defineProps<Props>()

const catalogStore = useCatalogStore()
const { countries } = storeToRefs(catalogStore)
const GET_COUNTRIES_LOADER = 'GET_COUNTRIES_LOADER'

const filtredCounries = computed(() => {
  if (props.avalibleCounryCodes && props.avalibleCounryCodes.length !== 0) {
    return countries.value.filter((item) => props.avalibleCounryCodes.includes(item.code))
  }

  return countries.value
})

onMounted(() => {
  withLoadingIndicator(async () => {
    catalogStore.getCountry()
  }, [GET_COUNTRIES_LOADER])
})
</script>
