export const MAX_FILE_SIZE = 10_485_760

const UrlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
  'i'
)

export const required = <T>(v: T) => {
  if (typeof v === 'string' || typeof v === 'number')
    return (v !== undefined && v !== null && v !== '') || 'Обязательное поле'
  else return (v !== undefined && v !== null && !!v) || 'Обязательное поле'
}

export const max18 = (v: string | number) =>
  v === undefined || String(v).length <= 18 || 'Максимум 18 символов'
export const max255 = (v: string) => v === undefined || v.length <= 255 || 'Максимум 255 символов'
export const max4000 = (v: string) => v === undefined || v.length <= 4000 || 'Максимум 4000 символа'
export const isUrl = (v: string) => !!UrlPattern.test(v) || 'Неверный формат URL'
export const isEmail = (v: string) => /.+@.+\..+/.test(v) || 'Неверный формат email'
export const fileMaxSize = (v: File) => !v || v.size < MAX_FILE_SIZE || 'Слишком большой файл'
