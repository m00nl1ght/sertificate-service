<template>
  <q-page padding>
    <div class="row q-pb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Аккаунты" :to="{ name: routeNameAccount }" />
        <q-breadcrumbs-el label="Сменить пароль" />
      </q-breadcrumbs>
    </div>

    <q-form ref="accountPasswordForm" @submit="onSubmit">
      <PasswordEdit
        v-model:password="password"
        v-model:password-confirm="passwordConfirm"
        :password-rules="[required, max255]"
        :password-confirm-rules="[
          required,
          max255,
          (val) => val === password || 'Пароли не совпадают'
        ]"
      />

      <q-btn
        label="Сохранить"
        type="submit"
        color="primary"
        :loading="checkLoading(CHANGE_PASSWORD_LOADER)"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import PasswordEdit from '@/views/account/compoments/PasswordEdit.vue'

import { required, max255 } from '@/composable/helpers/rulesHelper'
import { routeNameAccount } from '@/router/names/routeNames'
import { computed, ref } from 'vue'
import type { QForm } from 'quasar'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { useAccountStore } from '@/stores/account'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const accountId = computed(() => Number(route.params.id))

const password = ref('')
const passwordConfirm = ref('')
const accountPasswordForm = ref<InstanceType<typeof QForm> | null>(null)
const CHANGE_PASSWORD_LOADER = 'CHANGE_PASSWORD_LOADER'

const accountStore = useAccountStore()
// const { accountData } = storeToRefs(accountStore)

function onSubmit() {
  accountPasswordForm.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          await accountStore.changePassword(accountId.value, { value: password.value })

          router.push({ name: routeNameAccount })
        }, 'Пароль успешно изменен')
      }, [CHANGE_PASSWORD_LOADER])
    }
  })
}
</script>

<style scoped></style>
