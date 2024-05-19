import { defineStore } from 'pinia'
import { setCookie, deleteCookie, getCookie } from '@/composable/helpers/cookeeLocalstorageHelper'
import { AuthControllerService, type SignInDto, type TokenInfoDto } from '@/api'
import router from '@/router'
import { routeNameLogin } from '@/router/names/routeNames'
import { USER_PERMISSION_CODES, type PermissionsType } from './auth-types'

const TOKEN = 'access_token'
const SESSION_ID = 'session_id'

interface State {
  sessionId: string
  token: string
  userInfo: TokenInfoDto | undefined
}

export const useAuthStore = defineStore('authStore', {
  state: (): State => {
    return {
      sessionId: getCookie(SESSION_ID) || '',
      token: getCookie(TOKEN) || '',
      userInfo: undefined
    }
  },

  getters: {
    isAuth(): boolean {
      return !!this.token
    },

    userId(): number | undefined {
      return this.userInfo?.id
    },

    isAdmin: (state) => {
      return (
        state.userInfo &&
        state.userInfo.permissions &&
        state.userInfo.permissions.includes(USER_PERMISSION_CODES.ADMIN)
      )
    },

    isWorker: (state) => {
      return (
        state.userInfo &&
        state.userInfo.permissions &&
        state.userInfo.permissions.includes(USER_PERMISSION_CODES.WORKER)
      )
    },

    isWatcher: (state) => {
      return (
        state.userInfo &&
        state.userInfo.permissions &&
        state.userInfo.permissions.includes(USER_PERMISSION_CODES.WATCHER)
      )
    },

    hasPermission: (state) => {
      return (permission: PermissionsType | PermissionsType[]) => {
        if (state.userInfo && state.userInfo.permissions && state.userInfo.permissions.length) {
          const userPermissions = state.userInfo.permissions as PermissionsType[]

          if (typeof permission === 'object')
            return userPermissions.some((usrPerm) => permission.includes(usrPerm))
          else return userPermissions.includes(permission)
        }
        return false
      }
    }
  },

  actions: {
    async signIn(payload: SignInDto) {
      try {
        const resp = await AuthControllerService.signIn(payload)
        this.setUserData(resp)
      } catch {
        throw 'Неверный логин или пароль'
      }
    },

    logout() {
      this.token = ''
      deleteCookie(TOKEN)
      router.push({ name: routeNameLogin })
    },

    async getTokenInfo(authorization?: string) {
      const data = await AuthControllerService.getTokenInfo(authorization ?? this.token)
      this.setUserData(data)
    },

    setUserData(payload: TokenInfoDto) {
      if (payload.accessToken) this.token = payload.accessToken
      if (this.token) setCookie(TOKEN, this.token)
      this.userInfo = payload
    }
  }
})
