export type Locale = 'en'

let locale: Locale = 'en'

export const getLocale = () => locale

export const setLocale = (newLocale: Locale) => {
  locale = newLocale
}
