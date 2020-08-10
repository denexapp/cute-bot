import { JsonDecoder } from 'ts.data.json'
import decode from '../../decode'

export interface DatabaseResponse<T> {
  data: T
}

export const databaseResponseDecoder = <T>(decoder: JsonDecoder.Decoder<T>) => JsonDecoder.object<DatabaseResponse<T>>({
  data: decoder
}, 'Database Response')

const decodeDatabaseResponse = <T>(response: unknown, decoder: JsonDecoder.Decoder<T>): T => {
  return decode(response, databaseResponseDecoder(decoder)).data
}

export default decodeDatabaseResponse
