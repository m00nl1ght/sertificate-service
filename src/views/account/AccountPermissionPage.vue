<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Аккаунты" :to="{ name: routeNameAccount }" />
        <q-breadcrumbs-el label="Выдача прав аккаунту" />
      </q-breadcrumbs>
    </div>

    <q-option-group
      v-model="selectedPermission"
      :options="permissionsListData"
      color="green"
      type="checkbox"
      @update:model-value="onUpdate"
    />
  </q-page>
</template>

<script setup lang="ts">
import { routeNameAccount } from '@/router/names/routeNames'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const accountStore = useAccountStore()
const { permissionsList, accountPermissions, accountPermissionsIds } = storeToRefs(accountStore)
const selectedPermission = ref<number[]>([])
const accountId = computed(() => Number(route.params.id))

const permissionsListData = computed(() => {
  return permissionsList.value.map((item) => {
    return { label: item.name, value: item.id }
  })
})

// const accountPermissionsIds = computed(() => {
//   return accountPermissions.value.map((item) => item.id)
// })

function onUpdate() {
  if (accountPermissions.value.length > selectedPermission.value.length) {
    const result = accountPermissionsIds.value.filter(
      (el) => !selectedPermission.value.includes(el)
    )
    accountStore.revokePermission({ accountId: accountId.value, permissionId: result[0] })
  } else {
    const result = selectedPermission.value.filter(
      (el) => !accountPermissionsIds.value.includes(el)
    )
    accountStore.grantPermission({ accountId: accountId.value, permissionId: result[0] })
  }
}

onMounted(async () => {
  if (route.params && route.params.id) {
    await accountStore.getAllPermissions()
    await accountStore.getAccountPermissions(accountId.value)
    selectedPermission.value = accountPermissionsIds.value
  }
})
</script>

<style scoped></style>
