<template>
  <q-card-section class="q-gutter-md">
    <q-input
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Пароль"
      dense
      outlined
      :rules="passwordRules"
      counter
      maxlength="255"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      v-model="passwordConfirm"
      :type="isPwd ? 'password' : 'text'"
      label="Пароль ещё раз"
      dense
      outlined
      :rules="passwordConfirmRules"
      counter
      maxlength="255"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </q-card-section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ValidationRule } from 'quasar'

interface Props {
  passwordRules?: ValidationRule[]
  passwordConfirmRules?: ValidationRule[]
}

const props = defineProps<Props>()

const password = defineModel<string>('password', { required: true })
const passwordConfirm = defineModel<string>('passwordConfirm', { required: true })
const isPwd = ref(true)
</script>
