import { BlankFilialControllerService, type BlankFilialDto } from '@/api'
import { defineStore } from 'pinia'

interface State {
  blankFilialList: BlankFilialDto[]
  blankFilial: BlankFilialDto | undefined
}

export const useBlankFilialStore = defineStore('blankFilialStore', {
  state: (): State => {
    return {
      blankFilialList: [],
      blankFilial: undefined
    }
  },

  getters: {},

  actions: {
    async getAllBlankFilial() {
      const data = await BlankFilialControllerService.getAllBlankFilial()
      this.blankFilialList = data
    },

    async saveBlankFilial(requestBody: BlankFilialDto) {
      await BlankFilialControllerService.saveBlankFilial(requestBody)
    },

    async deleteBlankFilial(blankFilialId: number) {
      await BlankFilialControllerService.deleteBlankFilial(blankFilialId)
      this.blankFilialList = this.blankFilialList.filter((item) => item.id !== blankFilialId)
    },

    async getBlankFilialById(blankFilialId: number) {
      const data = await BlankFilialControllerService.getBlankFilialById(blankFilialId)
      this.blankFilial = data
    }
  }
})
