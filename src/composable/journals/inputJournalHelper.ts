import { JournalControllerService } from '@/api'
import { reactive, ref } from 'vue'
export type IField = 'REQUESTER_NAME' | 'PRODUCT_NAME' | 'CERTIFICATE_BLANK_NUMBER' | 'RECEIVER_FIO'

const isLoading = ref(false)
const items = ref<string[]>([])

async function fetchItems(field: IField, search: string) {
  try {
    isLoading.value = true
    const data = await JournalControllerService.inputHelper(field, {
      value: search
    })
    if (data) items.value = data
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

export { items, fetchItems, isLoading }
