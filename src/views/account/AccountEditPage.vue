<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Аккаунты" :to="{ name: routeNameAccount }" />
        <q-breadcrumbs-el :label="formValue.id ? 'Редактирование аккаунта' : 'Добавить аккаунт'" />
      </q-breadcrumbs>
    </div>

    <q-form ref="addAccountForm" @submit="onSubmit">
      <q-card-section class="q-gutter-md">
        <q-input
          dense
          outlined
          v-model="formValue.login"
          label="Логин"
          counter
          maxlength="255"
          :rules="[required, max255]"
        ></q-input>

        <q-input
          dense
          outlined
          v-model="formValue.lastName"
          label="Фамилия"
          counter
          maxlength="255"
          :rules="[required, max255]"
        ></q-input>

        <q-input
          dense
          outlined
          v-model="formValue.firstName"
          label="Имя"
          counter
          maxlength="255"
          :rules="[max255]"
        ></q-input>

        <q-input
          dense
          outlined
          v-model="formValue.middleName"
          label="Отчество"
          counter
          maxlength="255"
          :rules="[max255]"
        ></q-input>

        <q-checkbox v-model="formValue.enabled" label="Активный" />
      </q-card-section>

      <PasswordEdit
        v-if="!accountId"
        v-model:password="password"
        v-model:password-confirm="passwordConfirm"
        :password-rules="[required, max255]"
        :password-confirm-rules="[
          required,
          max255,
          (val) => val === password || 'Пароли не совпадают'
        ]"
      />

      <div>
        <q-btn
          label="Сохранить"
          type="submit"
          color="primary"
          :loading="checkLoading(SAVE_ACCOUNT_LOADER)"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import PasswordEdit from '@/views/account/compoments/PasswordEdit.vue'

import type { AccountDto } from '@/api'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { routeNameAccount } from '@/router/names/routeNames'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'
import type { QForm } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { required, max255 } from '@/composable/helpers/rulesHelper'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'

const route = useRoute()
const router = useRouter()
const addAccountForm = ref<InstanceType<typeof QForm> | null>(null)
const SAVE_ACCOUNT_LOADER = 'SAVE_ACCOUNT_LOADER'

const accountStore = useAccountStore()
const { accountData } = storeToRefs(accountStore)
const formValueDefault = () => ({
  login: '',
  lastName: '',
  firstName: '',
  middleName: '',
  enabled: true
})

const accountId = computed(() => Number(route.params.id))
const formValue = ref<AccountDto>(formValueDefault())
const password = ref('')
const passwordConfirm = ref('')

function onSubmit() {
  addAccountForm.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          const resp = await accountStore.saveAccount(formValue.value)
          if (!accountId.value && resp.id) {
            await accountStore.changePassword(resp.id, { value: password.value })
          }
          router.push({ name: routeNameAccount })
        })
      }, [SAVE_ACCOUNT_LOADER])
    }
  })
}

onMounted(async () => {
  if (accountId.value) {
    await accountStore.getAccountById(accountId.value)
    if (accountData.value) formValue.value = { ...accountData.value }
  }
})
</script>

<style scoped></style>
