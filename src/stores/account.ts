import {
  AccountControllerService,
  type AccountDto,
  type PermissionDto,
  type StringDto
} from '@/api'
import { defineStore } from 'pinia'

interface State {
  accounts: AccountDto[]
  permissionsList: PermissionDto[]
  accountData: AccountDto | undefined
  accountPermissions: PermissionDto[]
}

export const useAccountStore = defineStore('accountStore', {
  state: (): State => {
    return {
      accounts: [],
      permissionsList: [],
      accountData: undefined,
      accountPermissions: []
    }
  },

  getters: {
    accountPermissionsIds: (state) => state.accountPermissions.map((item) => item.id)
  },

  actions: {
    async saveAccount(payload: AccountDto) {
      const data = await AccountControllerService.saveAccount(payload)
      return data
    },

    async revokePermission({
      accountId,
      permissionId
    }: {
      accountId: number
      permissionId: number
    }) {
      await AccountControllerService.revokePermission(accountId, permissionId)
      this.getAccountPermissions(accountId)
    },

    async grantPermission({
      accountId,
      permissionId
    }: {
      accountId: number
      permissionId: number
    }) {
      await AccountControllerService.grantPermission(accountId, permissionId)
      this.getAccountPermissions(accountId)
    },

    async changePassword(accountId: number, requestBody: StringDto) {
      await AccountControllerService.changePassword(accountId, requestBody)
    },

    async getAllAccounts1() {
      const data = await AccountControllerService.getAllAccounts1()
      this.accounts = data
    },

    async getAllPermissions() {
      const data = await AccountControllerService.getAllPermissions()
      this.permissionsList = data
    },

    async getAccountPermissions(accountId: number) {
      const data = await AccountControllerService.getAccountPermissions(accountId)
      this.accountPermissions = data
    },

    async deleteAccount1(accountId: number) {
      await AccountControllerService.deleteAccount1(accountId)
    },

    async getAccountById(accountId: number) {
      const data = await AccountControllerService.getAccountById(accountId)
      this.accountData = data
    }
  }
})
