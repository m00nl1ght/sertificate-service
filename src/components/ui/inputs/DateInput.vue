<template>
  <q-input
    v-model="date"
    :mask="dateInputMask"
    outlined
    dense
    :label="label ?? 'Дата'"
    :rules="rules"
  >
    <template v-slot:append>
      <q-icon name="mdi-calendar" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date" :mask="dateInputFormat" :options="options">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Закрыть" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import moment from 'moment'
import { computed, onMounted, ref, watch } from 'vue'
import type { ValidationRule } from 'quasar'

type DateType = string | undefined
interface Props {
  label?: string
  modelValue?: DateType
  maxDate?: DateType
  minDate?: DateType
  rules?: ValidationRule[]
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Дата'
})

const emit = defineEmits<{
  (e: 'update:modelValue', payload: DateType): void
}>()

// const model = defineModel<string | undefined>({ required: true })
const modelValue = defineModel<DateType>('modelValue', { required: true })
const dateValue = ref<DateType>(undefined)
const dateInputMask = '##.##.####'
const dateInputFormat = 'DD.MM.YYYY'
const dateRequestFormat = 'YYYY-MM-DD'

const date = computed({
  get() {
    return dateValue.value
  },
  set(value) {
    if (value === dateValue.value) {
      return
    }
    if (value === null || value === '') {
      dateValue.value = undefined
      if (modelValue.value) emit('update:modelValue', undefined)
    } else {
      dateValue.value = value
    }
    valueChanged()
  }
})

const isValidDate = computed(
  () => moment(dateValue.value, dateInputFormat, true).isValid() === true
)

const options = computed(() => {
  // const maxDate = props.maxDate ? moment(props.maxDate).format(dateInputFormat) : undefined
  // const minDate = props.minDate ? moment(props.minDate).format(dateInputFormat) : undefined
  const maxDate = props.maxDate
  const minDate = props.minDate
  if (maxDate || minDate) {
    return (date: string) => {
      if (maxDate && minDate) {
        return date >= minDate && date <= maxDate
      } else {
        return (maxDate ? date <= maxDate : true) || (minDate ? date >= minDate : true)
      }
    }
  }

  return undefined
})

function setDateValue(value: DateType) {
  if (value) {
    const formatted = moment(value).format(dateInputFormat)
    if (formatted !== dateValue.value) dateValue.value = formatted
  } else {
    dateValue.value = undefined
  }
}

function valueChanged() {
  if (isValidDate.value) {
    const formatted = moment(dateValue.value, dateInputFormat, true).format(dateRequestFormat)
    const valueIsSame = !!modelValue.value && moment(modelValue.value).isSame(formatted)

    if (!valueIsSame) {
      emit('update:modelValue', formatted)
    }
  }
}

onMounted(() => {
  setDateValue(modelValue.value)
})

watch(
  () => props.modelValue,
  (date) => {
    setDateValue(date)
  }
)
</script>
