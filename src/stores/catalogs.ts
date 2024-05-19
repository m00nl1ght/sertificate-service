import { CatalogControllerService, type CountryDto, type FormDto, type IdNameDto } from '@/api'
import { defineStore } from 'pinia'

interface State {
  statuses: IdNameDto[]
  platforms: IdNameDto[]
  forms: FormDto[]
  countries: CountryDto[]
  journalType: IdNameDto[]
  certificatePrices: number[]
  formGroups: IdNameDto[]
}

export const useCatalogStore = defineStore('catalogStore', {
  state: (): State => {
    return {
      statuses: [],
      platforms: [],
      forms: [],
      countries: [],
      journalType: [],
      certificatePrices: [],
      formGroups: []
    }
  },

  getters: {},

  actions: {
    async getStatus() {
      const data = await CatalogControllerService.getStatus()
      this.statuses = data
    },

    async getPlatform() {
      const data = await CatalogControllerService.getPlatform()
      this.platforms = data
    },

    async getForm() {
      const data = await CatalogControllerService.getForm()
      this.forms = data
    },

    async getCountry() {
      const data = await CatalogControllerService.getCountry()
      this.countries = data
    },

    async getJournalType() {
      const data = await CatalogControllerService.getJournalType()
      this.journalType = data
    },

    async getCertificatePrice() {
      const data = await CatalogControllerService.getCertificatePrice()
      this.certificatePrices = data
    },

    async getFormGroup(){
      const data = await CatalogControllerService.getFormGroup()
      this.formGroups = data
    }
  }
})
