import {
  JournalControllerService,
  type FilialDto,
  type JournalDto,
  type StringDto,
  type JournalFilterDto,
  PageableSortingDto
} from '@/api'
import type { JournalSocketMessage } from '@/composable/socketSubscribes/journalSocketMessage'
import { defineStore } from 'pinia'
import type { QTableProps } from 'quasar'

interface State {
  journals: JournalDto[]
  pagination: NonNullable<QTableProps['pagination']>
  search: string

  journal: JournalDto | undefined
  accountFilials: FilialDto[]
  sockedMessageEditedJournalIds: number[]
  filters: JournalFilterDto
}

const defaultFilters = () => {
  return {
    createDateFrom: undefined,
    createDateTo: undefined,
    changeDateTimeFrom: undefined,
    changeDateTimeTo: undefined,
    statusIds: undefined,
    filialIds: undefined,
    expertIds: undefined,
    formIds: undefined,
    certificatePrices: undefined,
    productTypeIds: undefined
  }
}

export const useJournalStore = defineStore('journalStore', {
  state: (): State => {
    return {
      journals: [],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      search: '',
      filters: defaultFilters(),

      journal: undefined,
      accountFilials: [],
      sockedMessageEditedJournalIds: []
    }
  },

  getters: {
    moreThenTwoAccountFilials: (state) => state.accountFilials && state.accountFilials.length > 1
  },

  actions: {
    async statusProcess(journalId: number) {
      const journal = await JournalControllerService.statusProcess(journalId)
      const index = this.journals.findIndex((item) => item.id === journal.id)
      if (index !== -1) this.journals.splice(index, 1, journal)
    },

    async statusNew(journalId: number) {
      const journal = await JournalControllerService.statusNew(journalId)
      const index = this.journals.findIndex((item) => item.id === journal.id)
      if (index !== -1) {
        this.journals.splice(index, 1, journal)
      }
    },

    async setStatus(journalId: number, statusId: number, requestBody: StringDto) {
      const journal = await JournalControllerService.setStatus(journalId, statusId, requestBody)
      const index = this.journals.findIndex((item) => item.id === journal.id)
      if (index !== -1) this.journals.splice(index, 1, journal)
    },

    async getJournals() {
      const data = await JournalControllerService.getJournals(
        this.pagination.page ? this.pagination.page - 1 : this.pagination.page,
        this.pagination.rowsPerPage,
        {
          search: this.search,
          filters: this.filters,
          // sorting:
          //   this.pagination.sortBy && this.pagination.sortBy !== 'desc'
          //     ? [
          //         {
          //           sorting: this.pagination.sortBy,
          //           sortingDirection: this.pagination.descending
          //             ? PageableSortingDto.sortingDirection.DESC
          //             : PageableSortingDto.sortingDirection.ASC
          //         }
          //       ]
          //     : undefined
        }
      )

      this.journals = data.items
      this.pagination.page = data.currentPage + 1
      this.pagination.rowsNumber = data.totalItems

      data.items.forEach((item) => {
        if (item.id && this.sockedMessageEditedJournalIds.includes(item.id)) {
          this.sockedMessageEditedJournalIds = this.sockedMessageEditedJournalIds.filter(
            (id) => id !== item.id
          )
        }
      })
    },

    async getJournal(journalId: number) {
      const data = await JournalControllerService.getJournal(journalId)
      this.journal = data
    },

    async editJournal(requestBody: JournalDto) {
      await JournalControllerService.editJournal(requestBody)
    },

    async createJournal(requestBody: JournalDto) {
      await JournalControllerService.createJournal(requestBody)
    },

    async getAccountFilial() {
      const data = await JournalControllerService.getAccountFilial()
      this.accountFilials = data
    },

    async deleteJournal(journalId: number) {
      await JournalControllerService.deleteJournal(journalId)
    },

    async socketActions(socketMessage: JournalSocketMessage) {
      const { message, action } = socketMessage
      const journalId = Number(message)

      switch (action) {
        case 'EDIT':
        case 'STATUS':
          const journal = await JournalControllerService.getJournal(journalId)
          const index = this.journals.findIndex((item) => item.id === journal.id)
          if (index !== -1) this.journals.splice(index, 1, journal)
          else this.sockedMessageEditedJournalIds.push(journalId)
          break

        case 'DELETE':
          this.journals = this.journals.filter((item) => item.id !== journalId)
          this.sockedMessageEditedJournalIds = this.sockedMessageEditedJournalIds.filter(
            (id) => id !== journalId
          )
          break

        case 'NEW':
          const journal1 = await JournalControllerService.getJournal(journalId)

          if (this.journals.length >= 10) this.journals.splice(0, 1, journal1)
          else this.journals.unshift(journal1)
          break

        default:
          break
      }
    },

    resetFilters() {
      this.filters = defaultFilters()
    }
  }
})
