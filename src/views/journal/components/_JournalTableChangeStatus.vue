<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form ref="changeStatusFormRef">
        <q-card-section class="q-gutter-y-md">
          <div class="text-subtitle1 q-mt-md">Смена статуса</div>

          <StatusInput v-model="statusId" />

          <q-input v-model="description" type="textarea" outlined dense label="Описание" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="OK"
            @click="onOKClick"
            :loading="checkLoading(CHANGE_JOURNAL_STATUS_LOADER)"
          />
          <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import StatusInput from '@/views/journal/components/StatusInput.vue'

import { QForm, useDialogPluginComponent } from 'quasar'
import type { JournalDto } from '@/api'
import { onMounted, ref, watch } from 'vue'
import {
  withLoadingIndicator,
  withNotifier
} from '@/composable/requestHelpers/loaderAndNotificatorHelpers'
import { useJournalStore } from '@/stores/journal'
import { checkLoading } from '@/composable/requestHelpers/loadingHelper'

interface Props {
  item: JournalDto
}

const props = defineProps<Props>()
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const journalStore = useJournalStore()
const statusId = ref<number | undefined>(undefined)
const description = ref<string | undefined>(undefined)
const changeStatusFormRef = ref<InstanceType<typeof QForm> | null>(null)
const CHANGE_JOURNAL_STATUS_LOADER = 'CHANGE_JOURNAL_STATUS_LOADER'

function onOKClick() {
  changeStatusFormRef.value?.validate().then((success) => {
    if (success) {
      withLoadingIndicator(async () => {
        await withNotifier(async () => {
          if (props.item.id && statusId.value) {
            await journalStore.setStatus(props.item.id, statusId.value, {
              value: description.value ?? ''
            })
            onDialogOK()
          }
        })
      }, [CHANGE_JOURNAL_STATUS_LOADER])
    }
  })
}

function show() {
  if (dialogRef.value) dialogRef.value.show()
}

onMounted(() => {
  statusId.value = props.item.statusId
  description.value = props.item.description

  show()
}),
  watch(
    () => props.item,
    (data) => {
      if (data) {
        statusId.value = data.statusId
        description.value = data.description

        show()
      }
    }
  )
</script>
