<template>
  <q-select
    v-model="model"
    :option-value="'id'"
    :option-label="(opt) => getNameString(opt)"
    :options="items"
    :label="label ?? 'ФИО эксперта'"
    emit-value
    map-options
    outlined
    dense
    :rules="rules"
    :disable="disable"
  >
  </q-select>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { getFullName } from '@/composable/helpers/peopleHelper'
import type { ValidationRule } from 'quasar'
import { useFilialStore } from '@/stores/filial'

export interface ExpertType {
  expertId: number | undefined
  expertFirstName?: string
  expertMiddleName?: string
  expertLastName?: string
}

interface Props {
  label?: string
  rules?: ValidationRule[]
  disable?: boolean
  filialId: number | undefined
}

const props = defineProps<Props>()
const model = defineModel<ExpertType>({ required: true })
const authStore = useAuthStore()
const { userInfo, isAdmin, isWatcher } = storeToRefs(authStore)

const filialStore = useFilialStore()
const { accountByFilialList } = storeToRefs(filialStore)

const accountByFilial = computed((): ExpertType[] => {
  return accountByFilialList.value.map((item) => ({
    expertId: item.id,
    expertFirstName: item.firstName,
    expertMiddleName: item.middleName,
    expertLastName: item.lastName
  }))
})

const items = computed(() => {
  return isAdmin.value || isWatcher.value ? accountByFilial.value : []
})

function getNameString(user: ExpertType) {
  return getFullName(user.expertLastName, user.expertFirstName, user.expertMiddleName)
}

function getAllAccountsByFilial(filialId: number) {
  filialStore.getAllAccountsByFilial(filialId)
}

onMounted(() => {
  if (!model.value.expertId && userInfo.value && userInfo.value.id) {
    model.value = {
      expertId: userInfo.value?.id,
      expertFirstName: userInfo.value?.firstName,
      expertMiddleName: userInfo.value?.middleName,
      expertLastName: userInfo.value?.lastName
    }
  }
})

watch(
  () => props.filialId,
  (value) => {
    if (value && (isAdmin.value || isWatcher.value)) getAllAccountsByFilial(value)
  }
)
</script>
