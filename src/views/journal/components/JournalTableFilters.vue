<template>
  <q-card flat bordered>
    <q-expansion-item expand-separator icon="mdi-filter-cog-outline" label="Фильтры">
      <q-card-section>
        <div class="q-col-gutter-md row">
          <DateInput v-model="filters.createDateFrom" label="Создана с" class="col-6" />
          <DateInput v-model="filters.createDateTo" label="по" class="col-6" />

          <DateInput v-model="filters.changeDateTimeFrom" label="Изменена с" class="col-6" />
          <DateInput v-model="filters.changeDateTimeTo" label="по" class="col-6" />

          <FormInput v-model="filters.formIds" multiple class="col-6" />
          <StatusInput v-model="filters.statusIds" multiple class="col-6" />

          <FilialInput v-model="filters.filialIds" class="col-6" />
          <ExpertInput v-model="filters.expertIds" class="col-6" />

          <CertificatePricesFilterInput v-model="filters.certificatePrices" class="col-6" />
          <ProductTypeFilterInput v-model="filters.productTypeIds" class="col-6" />
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn color="primary" @click="applyFilters" :loading="isLoadingJournals">
          Применить
        </q-btn>

        <q-btn outline @click="resetFilters" :loading="isLoadingJournals">Сбросить</q-btn>
      </q-card-actions>
    </q-expansion-item>
  </q-card>
</template>

<script setup lang="ts">
import DateInput from '@/components/ui/inputs/DateInput.vue'
import StatusInput from '@/views/journal/components/StatusInput.vue'
import FormInput from '@/views\/journal/components/FormInput.vue'
import FilialInput from '@/views/journal/components/FilialFilterInput.vue'
import ExpertInput from '@/views/journal/components/ExpertFilterInput.vue'
import CertificatePricesFilterInput from '@/views/journal/components/CertificatePricesFilterInput.vue'
import ProductTypeFilterInput from '@/views/journal/components/ProductTypeFilterInput.vue'

import { useJournalStore } from '@/stores/journal'
import { storeToRefs } from 'pinia'
import { isLoadingJournals, getAllJournals } from '@/composable/journals/getAllJournals'

const journalStore = useJournalStore()
const { search, filters } = storeToRefs(journalStore)

function applyFilters() {
  getAllJournals()
}

function resetFilters() {
  journalStore.resetFilters()
  getAllJournals()
}
</script>
