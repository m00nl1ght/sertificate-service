export const permissions = {
  ADMIN: {
    id: 1,
    code: 'ADMIN',
    name: 'Администратор'
  },
  WATCHER: {
    id: 2,
    code: 'WATCHER',
    name: 'Наблюдатель'
  },
  WORKER: {
    id: 3,
    code: '',
    name: 'Исполнитель'
  }
}

export const USER_PERMISSION_CODES: {
  [key: string]: PermissionsType
} = {
  ADMIN: 'ADMIN',
  WATCHER: 'WATCHER',
  WORKER: 'WORKER'
}

export type PermissionsType = keyof typeof permissions
