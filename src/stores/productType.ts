import { ProductTypeControllerService, type ProductTypeDto } from '@/api'
import { defineStore } from 'pinia'

interface State {
  productTypeList: ProductTypeDto[]
  productType: ProductTypeDto | undefined
}

export const useProductTypeStore = defineStore('productTypeStore', {
  state: (): State => {
    return {
      productTypeList: [],
      productType: undefined
    }
  },

  getters: {},

  actions: {
    async getAllProductTypes() {
      this.productTypeList = await ProductTypeControllerService.getAllProductTypes()
    },

    async saveProductType(payload: ProductTypeDto) {
      await ProductTypeControllerService.saveProductType(payload)
    },

    async deleteProductType(productTypId: number) {
      await ProductTypeControllerService.deleteProductType(productTypId)
      this.productTypeList = this.productTypeList.filter((item) => item.id !== productTypId)
    },

    async getProductTypeById(productTypId: number) {
      this.productType = await ProductTypeControllerService.getProductTypeById(productTypId)
    }
  }
})
