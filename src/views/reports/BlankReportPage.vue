<template>
  <ReportDetailLayout>
    <q-form ref="blankReportRef" @submit="onSubmit" class="q-pb-md">
      <DateInput
        class="col-12"
        v-model="formValue.startDate"
        :label="'Дата начала'"
        :rules="[required]"
      />

      <DateInput
        class="col-12"
        v-model="formValue.endDate"
        :label="'Дата окончания'"
        :rules="[required]"
      />

      <FormGroupInput v-model="formGroup" class="col-12" :rules="[required]" multiple />

      <div class="q-mt-md">
        <q-btn label="Сформировать" type="submit" color="primary" />
      </div>
    </q-form>
  </ReportDetailLayout>
</template>

<script setup lang="ts">
import ReportDetailLayout from '@/views/reports/components/ReportDetailLayout.vue'
import DateInput from '@/components/ui/inputs/DateInput.vue'
import FormGroupInput from '@/components/ui/inputs/FormGroupInput.vue'

import { ReportControllerService, type BlankReportFilterDto, type IdNameDto } from '@/api'

import { required } from '@/composable/helpers/rulesHelper'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import type { QForm } from 'quasar'
import { ref } from 'vue'

const formValueDefault = () => ({
  startDate: undefined,
  endDate: undefined,
  formGroupIds: []
})

const blankReportRef = ref<InstanceType<typeof QForm> | null>(null)
const formValue = ref<Partial<BlankReportFilterDto>>(formValueDefault())
const GET_REPORT_LOADER = 'GET_REPORT_LOADER'

const formGroup = ref<IdNameDto[]>([])

function getPayloadDto(): BlankReportFilterDto {
  return {
    ...formValue.value,

    startDate: formValue.value.startDate ?? '',
    endDate: formValue.value.endDate ?? '',
    formGroupIds: formGroup ? formGroup.value.map((item) => item.id) : []
  }
}

function onSubmit() {
  blankReportRef.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          const payload = getPayloadDto()
          const data = await ReportControllerService.getBlankReportXlsx(payload)
          console.log('data', data)
        }, 'Отчет успешно получен')
      }, [GET_REPORT_LOADER])
    }
  })
}
</script>

<style scoped></style>
