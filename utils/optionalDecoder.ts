import { JsonDecoder } from 'ts.data.json'

const optionalDecoder = <T>(decoder: JsonDecoder.Decoder<T>) => JsonDecoder.oneOf([
  JsonDecoder.isUndefined(null),
  decoder
], 'Undefined to null or value decoder')

export default optionalDecoder