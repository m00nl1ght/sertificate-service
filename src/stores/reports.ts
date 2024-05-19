import { defineStore } from 'pinia'
import { ReportControllerService, type BlankReportFilterDto } from '@/api'

interface State {
  // blankReportData: BlankReportData[]
}

export const useReportsStore = defineStore('reportsStore', {
  state: (): State => {
    return {
      // blankReportData: []
    }
  },

  getters: {},

  actions: {
    async getBlankReportXlsx(payload: BlankReportFilterDto) {
      const data = await ReportControllerService.getBlankReportXlsx(payload)
      console.log(data)
    }
  }
})
