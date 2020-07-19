import { JsonDecoder } from 'ts.data.json'
import decode from '../../decode'

type DatabaseResponse = {
  data: unknown
}

const databaseResponseDecoder = JsonDecoder.object<DatabaseResponse>({
  data: JsonDecoder.succeed
}, 'Database Response')

const decodeDatabaseResponse = <T>(response: unknown, decoder: JsonDecoder.Decoder<T>): T => {
  const { data } = decode(response, databaseResponseDecoder)
  return decode(data, decoder)
}

export default decodeDatabaseResponse
