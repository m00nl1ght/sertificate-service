<template>
  <q-input
    dense
    debounce="1000"
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value ? value.toString() : undefined)"
    placeholder="Поиск..."
    clearable
    style="width: 320px"
  >
    <template v-slot:append>
      <q-icon name="mdi-magnify" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | undefined
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()
</script>

<style scoped></style>
