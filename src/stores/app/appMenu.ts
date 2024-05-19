import { defineStore } from 'pinia'

interface State {
  mini: boolean
}

export const useAppMenuStore = defineStore('appMenuStore', {
  state: (): State => {
    return {
      mini: false
    }
  },

  getters: {},

  actions: {}
})
