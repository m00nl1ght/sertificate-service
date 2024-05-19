<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Отчетнось" :to="{ name: routeNameReports }" />
        <q-breadcrumbs-el :label="label ?? 'Сформировать отчет'" />
      </q-breadcrumbs>
    </div>

    <slot></slot>
  </q-page>
</template>

<script setup lang="ts">
import { routeNameReports } from '@/router/names/routeNames'

interface Props {
  label?: string
}

const props = defineProps<Props>()
</script>
