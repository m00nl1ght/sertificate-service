interface UserType {
  lastName?: string
  firstName?: string
  middleName?: string
}

export const getShortName = (lastname: string, name: string, middlename = '') => {
  return `${lastname ?? ''} ${name ? name.slice(0, 1) + '.' : ''}${
    middlename ? ' ' + middlename.slice(0, 1) + '.' : ''
  }`
}

export const getFullName = (
  lastname: string | undefined,
  name: string | undefined,
  middlename = ''
) => {
  return `${lastname ?? ''} ${name ? name : ''}${middlename ? ' ' + middlename : ''}`
}

export const getUserFullName = (user: UserType): string => {
  if (!user) return ''
  return `${user.lastName ?? ''} ${user.firstName ? user.firstName : ''}${
    user.middleName ? ' ' + user.middleName : ''
  }`
}

export const getUserShortName = (user: UserType): string => {
  if (!user) return ''
  return `${user.lastName ?? ''} ${user.firstName ? user.firstName.slice(0, 1) + '.' : ''}${
    user.middleName ? ' ' + user.middleName.slice(0, 1) + '.' : ''
  }`
}
