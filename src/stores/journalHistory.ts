import { JournalControllerService, type JournalHistoryDto, type StringDto } from '@/api'
import { defineStore } from 'pinia'
import type { QTableProps } from 'quasar'

interface State {
  journalHistory: JournalHistoryDto[]
  pagination: NonNullable<QTableProps['pagination']>
  search: string
}

export const useJournalHistoryStore = defineStore('journalHistoryStore', {
  state: (): State => {
    return {
      journalHistory: [],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      search: ''
    }
  },

  getters: {},

  actions: {
    async getJournalHistory(journalId: number) {
      const data = await JournalControllerService.getJournalHistory(
        journalId,
        this.pagination.page ? this.pagination.page - 1 : this.pagination.page,
        this.pagination.rowsPerPage
      )

      this.journalHistory = data.items
      this.pagination.page = data.currentPage + 1
      this.pagination.rowsNumber = data.totalItems
    },

    async deleteJournalHistory(journalId: number) {
      await JournalControllerService.deleteJournalHistory(journalId)
    }
  }
})
