<template>
  <q-page padding>
    <h5 class="q-my-none">Отчетность</h5>

    <div class="report-card-box q-mt-lg">
      <RouterLink v-for="panel in reportPanels" :to="panel.path" class="report-link cursor-pointer">
        <q-card flat bordered class="report-card">
          <q-card-section class="report-card__section">
            <q-icon :name="panel.icon" size="sm" :color="panel.iconColor" />

            <div class="text-h6 q-ml-sm">
              {{ panel.title }}
            </div>
          </q-card-section>
        </q-card>
      </RouterLink>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { routeNameBlankReport } from '@/router/names/routeNames'

const reportPanels = [
  {
    title: 'Отчет по бланками',
    path: { name: routeNameBlankReport },
    icon: 'mdi-file-excel-outline',
    iconColor: 'green'
  }
]
</script>

<style lang="scss" scoped>
.report-card-box {
  display: flex;
}

.report-card {
  width: 100%;
  max-width: 300px;
}

.report-link {
  text-decoration: none;
  color: inherit;
  &:hover {
    box-shadow:
      0 1px 5px rgba(0, 0, 0, 0.2),
      0 2px 2px rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12);
  }
}

.report-card__section {
  display: flex;
  align-items: center;
}
</style>
