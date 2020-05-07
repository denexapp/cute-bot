import { JsonDecoder } from 'ts.data.json'

const decode = <T>(body: unknown, decoder: JsonDecoder.Decoder<T>): T => {
  const result = decoder.decode(body)
  
  if (!result.isOk()) {
    console.error(`
Can't decode this object:
${JSON.stringify(body)}
`)
    throw new Error(result.error)
  }
  
  return result.value
}

export default decode