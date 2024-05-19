<template>
  <div class="text-left">
    <ul>
      <li v-for="item in items" class="d-flex">
        <span class="text-subtitle2" style="width: 230px">{{ item.label }}</span>
        <span class="q-ml-lg">{{ item.value ?? '-' }}</span>
      </li>

      <li>
        <span class="text-subtitle2" style="width: 230px">Описание</span>
        <span class="q-ml-lg" v-html="descriptionValue()"></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { JournalDto } from '@/api'
import { formatDateByLocale } from '@/composable/helpers/dateHelper'
import { getFullName } from '@/composable/helpers/peopleHelper'
import { getUrlFromString, createHref } from '@/composable/helpers/stringHelper'
import { computed } from 'vue'
interface Props {
  row: JournalDto
}

const props = defineProps<Props>()
const items = computed(() => {
  return [
    { label: 'Порядковый номер', value: props.row['seq'] },
    { label: 'Статус', value: props.row['statusName'] },
    {
      label: 'Дата поступления заявки',
      value: props.row['createDate']
        ? formatDateByLocale(props.row['createDate'], false, 'ru')
        : undefined
    },
    { label: 'Код филиала', value: props.row['filialCode'] },
    { label: 'Наименование филиала', value: props.row['filialName'] },
    { label: 'Наименование заявителя', value: props.row['requesterName'] },
    { label: 'Товар', value: props.row['productName'] },
    { label: 'Форма сертификата', value: props.row['formName'] },
    {
      label: 'Эксперт',
      value: getFullName(
        props.row['expertLastName'],
        props.row['expertFirstName'],
        props.row['expertMiddleName']
      )
    },
    {
      label: 'Дата начала экспертизы',
      value: props.row['expertizeStartDate']
        ? formatDateByLocale(props.row['expertizeStartDate'], false, 'ru')
        : undefined
    },
    {
      label: 'Дата окончания экспертизы',
      value: props.row['expertizeEndDate']
        ? formatDateByLocale(props.row['expertizeEndDate'], false, 'ru')
        : undefined
    },

    { label: 'Номер сертификата', value: props.row['certificateNumber'] },
    { label: 'Номер экспертизы', value: props.row['expertizeNumber'] },
    { label: 'Номер бланка сертификата', value: props.row['certificateBlankNumber'] },
    { label: 'Страна получателя', value: props.row['receiverCountryShortName'] },
    { label: 'Страны экспортера', value: props.row['exportCountryShortName'] },
    { label: 'Стоимость сертификата', value: props.row['certificatePrice'] },
    { label: 'Стоимость экспертизы', value: props.row['expertizePrice'] },
    { label: 'Платформа', value: props.row['platformName'] },
    { label: 'ФИО получателя сертификата', value: props.row['receiverFio'] },
    { label: 'Тип журнала', value: props.row['journalTypeName'] },
    { label: 'Тип продукта', value: props.row['productTypeName'] }
    // { label: 'Описание', value: props.row['description'] }
  ]
})

const descriptionValue = () => {
  if (!props.row['description']) return '-'

  const links = getUrlFromString(props.row['description'])

  if (!links || links.length === 0) return props.row['description']

  let result = props.row['description']
  links.forEach((item) => (result = result.replace(item, createHref(item))))
  return result
}
</script>
