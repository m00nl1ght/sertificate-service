import { defineStore } from 'pinia'
import { BlankDamageControllerService, type BlankDamageDto } from '@/api'

interface State {
  blankDamageList: BlankDamageDto[]
}

export const useBlankDamageStore = defineStore('blankDamageStore', {
  state: (): State => {
    return {
      blankDamageList: []
    }
  },

  getters: {},

  actions: {
    async getBlankDamage() {
      const data = await BlankDamageControllerService.getBlankDamage()
      this.blankDamageList = data
    },

    async addBlankDamage(blankNumber: number) {
      await BlankDamageControllerService.addBlankDamage(blankNumber)
    },

    async deleteBlankDamage(id: number) {
      await BlankDamageControllerService.deleteBlankDamage(id)
    }
  }
})
