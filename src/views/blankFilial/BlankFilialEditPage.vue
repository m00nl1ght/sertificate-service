<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Бланки филиалов" :to="{ name: routeNameBlankFilial }" />
        <q-breadcrumbs-el
          :label="
            formValue && formValue.id ? 'Редактирование бланка филиала' : 'Добавить бланк филиала'
          "
        />
      </q-breadcrumbs>
    </div>

    <q-form ref="addBlankFilialFormRef" @submit="onSubmit">
      <div class="q-col-gutter-md row">
        <q-select
          v-model="formValue.filial"
          :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
          option-label="name"
          :options="filialList"
          :label="'Филиал'"
          :loading="isLoadingFilials"
          outlined
          dense
          :rules="[required]"
          class="col-12"
        />

        <q-input
          dense
          outlined
          v-model.number="formValue.startNumber"
          type="number"
          label="Начальный номер"
          counter
          maxlength="18"
          :rules="[required, max18]"
          class="col-12"
          @keyup="resetValidation"
        ></q-input>

        <q-input
          dense
          outlined
          v-model.number="formValue.endNumber"
          type="number"
          label="Конечный номер"
          counter
          maxlength="18"
          :rules="[required, max18, rangeRule]"
          class="col-12"
        ></q-input>

        <FormGroupInput v-model="formValue.formGroup" class="col-12" :rules="[required]" />

        <DateInput
          class="col-12"
          v-model="formValue.regDate"
          :label="'Дата выдачи'"
          bottom-slots
          :rules="[required]"
        />
      </div>

      <div class="q-mt-lg">
        <q-btn label="Сохранить" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import FormGroupInput from '@/components/ui/inputs/FormGroupInput.vue'
import DateInput from '@/components/ui/inputs/DateInput.vue'

import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { routeNameBlankFilial } from '@/router/names/routeNames'

import type { QForm } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { required, max18 } from '@/composable/helpers/rulesHelper'
import { storeToRefs } from 'pinia'
import type { BlankFilialDto } from '@/api'
import { useBlankFilialStore } from '@/stores/blankFilial'
import { isLoadingFilials, filialList, getAllFilials } from '@/composable/filials/getAllFilials'

const router = useRouter()
const route = useRoute()

const addBlankFilialFormRef = ref<InstanceType<typeof QForm> | null>(null)
const SAVE_BLANK_FILIAL_LOADER = 'SAVE_BLANK_FILIAL_LOADER'
const blankFilialId = computed(() => Number(route.params.id))

const blankFilialStore = useBlankFilialStore()
const { blankFilial } = storeToRefs(blankFilialStore)
const formValueDefault = (): Partial<BlankFilialDto> => ({
  filial: undefined,
  startNumber: undefined,
  endNumber: undefined,
  formGroup: undefined,
  regDate: undefined
})

const formValue = ref<Partial<BlankFilialDto>>(formValueDefault())
const rangeRule = (val: number) =>
  val > (formValue.value.startNumber ?? 0) ||
  'Введенное число должно быть больше чем "Начальный номер"'

function onSubmit() {
  addBlankFilialFormRef.value?.validate().then((success) => {
    if (success) {
      const payload = {
        id: formValue.value.id,
        filial: formValue.value.filial ?? {
          name: '',
          code: ''
        },
        startNumber: formValue.value.startNumber ?? 0,
        endNumber: formValue.value.endNumber ?? 0,
        formGroup: formValue.value.formGroup ?? {},
        regDate: formValue.value.regDate ?? ''
      }

      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          await blankFilialStore.saveBlankFilial(payload)
          router.push({ name: routeNameBlankFilial })
        })
      }, [SAVE_BLANK_FILIAL_LOADER])
    }
  })
}

function resetValidation() {
  addBlankFilialFormRef.value?.resetValidation()
}

onMounted(async () => {
  if (blankFilialId.value) {
    await blankFilialStore.getBlankFilialById(blankFilialId.value)
    if (blankFilial.value) formValue.value = { ...blankFilial.value }
  }
  getAllFilials()
})
</script>
