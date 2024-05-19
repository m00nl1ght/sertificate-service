<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Журналы" :to="{ name: routeNameJournal }" />
        <q-breadcrumbs-el
          :label="formValue && formValue.id ? 'Редактирование журнала' : 'Добавить журнал'"
        />
      </q-breadcrumbs>
    </div>

    <q-form ref="addJournalFormRef" @submit="onSubmit" class="q-pb-md">
      <div class="q-col-gutter-md row">
        <JournalTypeInput class="col-12 col-md-6" v-model="formValue.journalTypeId" :rules="[required]" />

        <DateInput
          class="col-12 col-md-6"
          v-model="formValue.createDate"
          :label="'Дата поступления заявки'"
          :rules="[required]"
        />

        <FilialInput
          class="col-12 col-md-6"
          v-model="formValue.filialId"
          :rules="[required]"
          :disable="!hasPermissionEditField"
        />

        <RequesterNameInput class="col-12 col-md-6" v-model="formValue.requesterName" />

        <ProductTypeInput v-model="formValue.productTypeId" class="col-12 col-md-6" bottom-slots />

        <ProductNameInput class="col-12 col-md-6" v-model="formValue.productName" />

        <ExpertInput
          class="col-12 col-md-6"
          v-model="expert"
          :rules="[required]"
          :disable="!hasPermissionEditField"
          :filialId="formValue.filialId"
        />

        <FormInput
          class="col-12 col-md-6"
          v-model="formValue.formId"
          @update:model-value="onChangeForm"
          :rules="[required]"
        />

        <CertificateBlankNumberInput v-model="formValue.certificateBlankNumber" class="col-12 col-md-6" />

        <DateInput
          class="col-12 col-md-6"
          v-model="formValue.expertizeStartDate"
          :label="'Дата начала экспертизы'"
          :max-date="formValue.expertizeEndDate"
          bottom-slots
        />

        <DateInput
          class="col-12 col-md-6"
          v-model="formValue.expertizeEndDate"
          :label="'Дата окончания экспертизы'"
          :min-date="formValue.expertizeStartDate"
          bottom-slots
        />

        <q-input
          v-if="isAdmin || formValue.journalTypeId === 2 || formValue.journalTypeId === 4"
          v-model="formValue.certificateNumber"
          label="Номер сертификата"
          outlined
          dense
          class="col-12 col-md-6"
          bottom-slots
        />

        <q-input
          v-if="isAdmin || formValue.journalTypeId === 3 || formValue.journalTypeId === 4"
          v-model="formValue.expertizeNumber"
          label="Номер экспертизы"
          outlined
          dense
          class="col-12 col-md-6"
          bottom-slots
        />

        <CountryInput
          v-model="formValue.receiverCountryId"
          :label="'Страна получателя'"
          :avalibleCounryCodes="receiverCountries"
          class="col-12 col-md-6"
          bottom-slots
        />

        <CountryInput
          v-model="formValue.exportCountryId"
          :label="'Страна экспортера'"
          :avalibleCounryCodes="exportCountries"
          class="col-12 col-md-6"
          :rules="[required]"
        />

        <CertificatePricesInput
          v-model="formValue.certificatePrice"
          :items="certificatePrices"
          class="col"
          bottom-slots
        />

        <q-input
          v-model="formValue.expertizePrice"
          label="Стоимость экспертизы"
          outlined
          dense
          type="number"
          step=".01"
          class="col-12 col-md-6"
          bottom-slots
        />

        <PlatformInput class="col-12 col-md-6" v-model="formValue.platformId" :rules="[required]" />

        <ReceiverFioinput class="col-12 col-md-6" v-model="formValue.receiverFio" />

        <q-input
          v-model="formValue.description"
          type="textarea"
          outlined
          dense
          label="Описание"
          class="col-12"
        />
      </div>

      <q-btn
        label="Сохранить"
        type="submit"
        color="primary"
        class="q-mt-md"
        :loading="checkLoading(SAVE_JOURNAL_LOADER)"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import DateInput from '@/components/ui/inputs/DateInput.vue'
import FilialInput from '@/views/journal/components/FilialInput.vue'
import ExpertInput from '@/views/journal/components/ExpertInput.vue'
import PlatformInput from '@/views/journal/components/PlatformInput.vue'
import FormInput from '@/views/journal/components/FormInput.vue'
import CountryInput from '@/views/journal/components/CountryInput.vue'
import JournalTypeInput from '@/views/journal/components/JournalTypeInput.vue'
import CertificatePricesInput from '@/views/journal/components/CertificatePricesInput.vue'
import ProductTypeInput from '@/views/journal/components/ProductTypeInput.vue'
import RequesterNameInput from '@/views/journal/components/RequesterNameInput.vue'
import ProductNameInput from '@/views/journal/components/ProductNameInput.vue'
import CertificateBlankNumberInput from '@/components/ui/inputs/CertificateBlankNumberInput.vue'
import ReceiverFioinput from '@/views/journal/components/ReceiverFioinput.vue'

import type { FormDto, JournalDto } from '@/api'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { routeNameJournal } from '@/router/names/routeNames'
import type { QForm } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useJournalStore } from '@/stores/journal'
import moment from 'moment'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { USER_PERMISSION_CODES } from '@/stores/auth-types'
import { useCatalogStore } from '@/stores/catalogs'
import { useRoute, useRouter } from 'vue-router'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { required } from '@/composable/helpers/rulesHelper'

const formValueDefault = () => ({
  id: undefined,
  createDate: moment(new Date()).format('YYYY-MM-DD'),
  filialId: undefined,
  requesterName: undefined,
  productName: undefined,

  expertId: undefined,
  expertFirstName: undefined,
  expertMiddleName: undefined,
  expertLastName: undefined,

  formId: undefined,
  formPrices: undefined,
  expertizeNumber: undefined,
  expertizeStartDate: undefined,
  expertizeEndDate: undefined,
  certificateNumber: undefined,
  certificateBlankNumber: undefined,
  receiverCountryId: undefined,
  exportCountryId: undefined,
  platformId: undefined,
  receiverFio: undefined,
  statusId: undefined,
  description: undefined,
  journalTypeId: undefined,
  productTypeId: undefined
})

const route = useRoute()
const router = useRouter()

const journalStore = useJournalStore()
const { journal } = storeToRefs(journalStore)

const authStore = useAuthStore()
const { hasPermission } = storeToRefs(authStore)

const catalogStore = useCatalogStore()
const { forms } = storeToRefs(catalogStore)

const journalId = computed(() => Number(route.params.id))
const isAdmin = computed(() => hasPermission.value(USER_PERMISSION_CODES.ADMIN))
const formValue = ref<Partial<JournalDto>>(formValueDefault())
const addJournalFormRef = ref<InstanceType<typeof QForm> | null>(null)
const SAVE_JOURNAL_LOADER = 'SAVE_JOURNAL_LOADER'

const exportCountries = ref<string[]>([])
const receiverCountries = ref<string[]>([])
const certificatePrices = ref<string[]>([])

const expert = computed({
  get() {
    return {
      expertId: formValue.value.expertId,
      expertFirstName: formValue.value.expertFirstName,
      expertMiddleName: formValue.value.expertMiddleName,
      expertLastName: formValue.value.expertLastName
    }
  },
  set(item) {
    formValue.value.expertId = item.expertId
    formValue.value.expertFirstName = item.expertFirstName
    formValue.value.expertMiddleName = item.expertMiddleName
    formValue.value.expertLastName = item.expertLastName
  }
})

const hasPermissionEditField = computed<boolean>(() => {
  return (
    hasPermission.value(['ADMIN', 'WATCHER']) ||
    formValue.value.statusId === 1 ||
    formValue.value.statusId === undefined
  )
})

function getPayloadDto(): JournalDto {
  return {
    ...formValue.value,
    seq: formValue.value.seq ?? 0,
    createDate: formValue.value.createDate ?? '',
    filialId: formValue.value.filialId ?? 0,
    expertId: formValue.value.expertId ?? 0,
    formId: formValue.value.formId ?? 0,
    receiverCountryId: formValue.value.receiverCountryId ?? 0,
    exportCountryId: formValue.value.exportCountryId ?? 0,
    platformId: formValue.value.platformId ?? 0,
    journalTypeId: formValue.value.journalTypeId ?? 0
  }
}

function onChangeForm(id: number) {
  const item = forms.value.find((item) => item.id === id)

  if (item) {
    formValue.value.certificatePrice = undefined
    formValue.value.receiverCountryId = undefined
    formValue.value.exportCountryId = undefined
    initFormDictionaries(item)
  }
}

function initFormDictionaries(item: FormDto) {
  certificatePrices.value = item.prices ? item.prices.split(',') : []
  exportCountries.value = item.exportCountries ? item.exportCountries.split(',') : []
  receiverCountries.value = item.receiverCountries ? item.receiverCountries.split(',') : []
}

function onSubmit() {
  addJournalFormRef.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          const payload = getPayloadDto()
          if (payload.id) await journalStore.editJournal(payload)
          else await journalStore.createJournal(payload)

          router.push({ name: routeNameJournal })
        }, 'Журнал успешно сохранен')
      }, [SAVE_JOURNAL_LOADER])
    }
  })
}

onMounted(async () => {
  if (journalId.value) {
    withLoadingIndicator(async () => {
      await withNotifier(async () => {
        await journalStore.getJournal(journalId.value)
        if (journal.value) {
          formValue.value = { ...formValueDefault(), ...journal.value }

          const formId = journal.value.formId
          const formItem = forms.value.find((item) => item.id === formId)

          if (formItem) initFormDictionaries(formItem)
        }
      })
    })
  }
})
</script>
