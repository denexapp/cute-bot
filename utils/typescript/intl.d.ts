type Options =
  | {
    localeMatcher?: 'lookup' | 'best fit'
    type?: 'conjunction' | 'disjunction' | 'unit'
    style?: 'long' | 'short'
  }
  | {
    localeMatcher?: 'lookup' | 'best fit'
    type?: 'unit'
    style?: 'narrow'
  }

declare namespace Intl {
  class ListFormat {
    constructor(locales?: string | Array<string>, options?: Options)
    public format: (items: Array<string>) => string
  }
}