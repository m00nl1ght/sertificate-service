<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Филиалы" :to="{ name: routeNameFilial }" />
        <q-breadcrumbs-el
          :label="formValue && formValue.id ? 'Редактирование филиала' : 'Добавить филиал'"
        />
      </q-breadcrumbs>
    </div>

    <q-form ref="addFilialFormRef" class="q-gutter-md" @submit="onSubmit">
      <q-card-section>
        <q-input
          dense
          outlined
          v-model="formValue.name"
          label="Название"
          counter
          maxlength="255"
          :rules="[required, max255]"
        ></q-input>

        <q-input
          dense
          outlined
          class="q-mt-md"
          v-model="formValue.code"
          label="Код"
          counter
          maxlength="255"
          :rules="[required, max255]"
        ></q-input>
      </q-card-section>

      <div>
        <q-btn label="Сохранить" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import type { FilialDto } from '@/api'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { routeNameFilial } from '@/router/names/routeNames'
import { useFilialStore } from '@/stores/filial'
import type { QForm } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { required, max255 } from '@/composable/helpers/rulesHelper'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()
const addFilialFormRef = ref<InstanceType<typeof QForm> | null>(null)
const SAVE_FILIAL_LOADER = 'SAVE_FILIAL_LOADER'
const filialId = computed(() => Number(route.params.id))

const filialStore = useFilialStore()
const { filial } = storeToRefs(filialStore)
const formValueDefault = () => ({
  name: '',
  code: ''
})

const formValue = ref<FilialDto>(formValueDefault())

function onSubmit() {
  addFilialFormRef.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          await filialStore.saveFilial(formValue.value)
          router.push({ name: routeNameFilial })
        })
      }, [SAVE_FILIAL_LOADER])
    }
  })
}

onMounted(async () => {
  if (filialId.value) {
    await filialStore.getFilialById(Number(route.params.id))
    if (filial.value) formValue.value = { ...filial.value }
  }
})
</script>
