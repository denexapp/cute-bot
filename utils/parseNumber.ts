const parseNumber = (string: string | undefined): number => {
  if (typeof string !== 'string') {
    throw new Error('Can\'t parse undefined parameter as number')
  }
  const parameter = parseInt(string, 10)
  if (isNaN(parameter)) {
    throw new Error(`Can't parse "${string}" parameter as valid number`)
  }
  return parameter
}

export default parseNumber