<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Испорченные бланки" :to="{ name: routeNameBlankDamage }" />
        <q-breadcrumbs-el :label="'Добавить испорченный бланк'" />
      </q-breadcrumbs>
    </div>

    <q-form ref="addBlankDamageRef" @submit="onSubmit">
      <div class="q-col-gutter-md row">
        <CertificateBlankNumberInput
          v-model="formValue.blankNumber"
          class="col-12"
          :rules="[required]"
        />
      </div>

      <div class="q-mt-md">
        <q-btn label="Сохранить" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import CertificateBlankNumberInput from '@/components/ui/inputs/CertificateBlankNumberInput.vue'

import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { routeNameBlankDamage } from '@/router/names/routeNames'

import type { QForm } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { required } from '@/composable/helpers/rulesHelper'
import { useBlankDamageStore } from '@/stores/blankDamage'

interface IFormValue {
  blankNumber: number | undefined
}

const router = useRouter()

const addBlankDamageRef = ref<InstanceType<typeof QForm> | null>(null)
const ADD_BLANK_DAMAGE_LOADER = 'ADD_BLANK_DAMAGE_LOADER'

const blankDamageStore = useBlankDamageStore()
const formValueDefault = () => ({
  blankNumber: undefined
})

const formValue = ref<IFormValue>(formValueDefault())

function onSubmit() {
  addBlankDamageRef.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          if (formValue.value.blankNumber !== undefined) {
            await blankDamageStore.addBlankDamage(formValue.value.blankNumber)
            router.push({ name: routeNameBlankDamage })
          }
        })
      }, [ADD_BLANK_DAMAGE_LOADER])
    }
  })
}
</script>
