import { useJournalStore } from '@/stores/journal'
import { Client } from 'webstomp-client'

export type SocketActionType = 'NEW' | 'EDIT' | 'DELETE' | 'STATUS'
export type JournalSocketMessage = {
  namespace: 'journal'
  action: SocketActionType
  message: string
}

function subscribeJournalMessage(stompClient: Client) {
  stompClient.subscribe('/user/topic/private-messages', function (message) {
    const resp: JournalSocketMessage = JSON.parse(message.body)
    const journalStore = useJournalStore()
    journalStore.socketActions(resp)
    // showMessage(JSON.parse(message.body).content)
  })
}

export { subscribeJournalMessage }
