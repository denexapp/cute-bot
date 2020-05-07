import { JsonDecoder } from 'ts.data.json'
import variables from './variables'

const decode = <T>(body: unknown, decoder: JsonDecoder.Decoder<T>): T => {
  const result = decoder.decode(body)
  
  if (!result.isOk()) {
    console.log(JSON.stringify(variables))
    throw new Error(result.error)
  }
  
  return result.value
}

export default decode