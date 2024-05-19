import SockJS from 'sockjs-client/dist/sockjs'
import webstomp, { Client } from 'webstomp-client'

import { useAuthStore } from '@/stores/auth'
import { subscribeJournalMessage } from './socketSubscribes/journalSocketMessage'

const socketUrl = (userId: number) => `/ws-endpoint?userId=${userId}`

let socket = undefined
let stompClient: Client | undefined = undefined
let connected = false

function install() {
  const { userId } = useAuthStore()
  if (userId) {
    socket = new SockJS(socketUrl(userId))

    stompClient = webstomp.over(socket)
    stompClient.connect(
      {},
      (frame) => {
        connected = true
        if (stompClient !== undefined) {
          // stompClient.subscribe('/topic/messages', function (message) {
          //   // console.log('/topic/messages', message)
          //   // showMessage(JSON.parse(message.body).content)
          // })
          subscribeJournalMessage(stompClient)
        }
      },
      (error) => {
        console.log(error)
        connected = false
      }
    )
  }
}

export { install, socket }
