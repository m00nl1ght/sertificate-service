import { defineStore } from 'pinia'
import { FilialControllerService, type AccountDto, type FilialDto } from '@/api'

interface State {
  filialList: FilialDto[]
  accountByFilialList: AccountDto[]
  filial: FilialDto | undefined
}

export const useFilialStore = defineStore('filialStore', {
  state: (): State => {
    return {
      filialList: [],
      accountByFilialList: [],
      filial: undefined
    }
  },

  getters: {},

  actions: {
    async getAllFilialList() {
      const data = await FilialControllerService.getAllFilialList()
      this.filialList = data
    },

    async saveFilial(requestBody: FilialDto) {
      await FilialControllerService.saveFilial(requestBody)
    },

    async deleteFilial(filialId: number) {
      await FilialControllerService.deleteFilial(filialId)
    },

    async getAllAccountsByFilial(filialId: number) {
      const data = await FilialControllerService.getAllAccounts(filialId)
      this.accountByFilialList = data
    },

    async addAccount(accountId: number, filialId: number) {
      await FilialControllerService.addAccount(accountId, filialId)
    },

    async deleteAccount(accountId: number, filialId: number) {
      await FilialControllerService.deleteAccount(accountId, filialId)
    },

    async getFilialById(filialId: number) {
      const data = await FilialControllerService.getFilial(filialId)
      this.filial = data
    }
  }
})
