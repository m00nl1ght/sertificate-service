<template>
  <q-layout view="hHh Lpr lff">
    <q-page-container>
      <q-page class="window-height window-width row justify-center items-center">
        <q-form ref="loginForm" class="q-gutter-md">
          <div class="box">
            <q-input
              rounded
              outlined
              v-model="formValue.username"
              type="text"
              placeholder="Логин"
              :rules="[required]"
              :input-style="{ textAlign: 'center' }"
              class="box_item q-mb-sm"
            />

            <q-input
              rounded
              outlined
              v-model="formValue.password"
              type="password"
              placeholder="Пароль"
              @keydown.enter.prevent="validate"
              :rules="[required]"
              :input-style="{ textAlign: 'center' }"
              class="box_item q-mb-sm"
            />

            <q-btn
              rounded
              size="md"
              label="Войти"
              @click="validate"
              :loading="checkLoading(SING_IN_LOADER)"
            />
          </div>
        </q-form>

        <AppNotification />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppNotification from '@/components/app/AppNotification.vue'
import { required } from '@/composable/helpers/rulesHelper'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'
import router from '@/router'
import { routeNameHome } from '@/router/names/routeNames'
import { useAuthStore } from '@/stores/auth'
import type { QForm } from 'quasar'
import { ref } from 'vue'

const authStore = useAuthStore()
const SING_IN_LOADER = 'SING_IN_LOADER'
const loginForm = ref<InstanceType<typeof QForm> | null>(null)

const formValue = ref({
  username: '',
  password: ''
})

function validate() {
  loginForm.value?.validate().then((success) => {
    if (success) {
      onLogin()
    }
  })
}

function onLogin() {
  withLoadingIndicator(async () => {
    await withNotifier(async () => {
      await authStore.signIn(formValue.value)
      router.push({ name: routeNameHome })
    })
  }, [SING_IN_LOADER])
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box_item {
  width: 300px;
}

.box_item.q-field--focused {
  width: 350px;
}
</style>
