import { getLocale } from './locale'

const list = (list: Array<string>): string => {
  const locale = getLocale()
  const formatter = new Intl.ListFormat(locale, { type: 'conjunction', style: 'long' })
  const result = formatter.format(list)
  return result
}

export default list