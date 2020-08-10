import { JsonDecoder } from 'ts.data.json'
import decode from '../../decode'
import { values } from 'faunadb'
import refDecoder from './refDecoder'

export interface Entity<T> {
  data: T
  ref: values.Ref
  ts: number
}

export const entityDecoder = <T>(decoder: JsonDecoder.Decoder<T>) => JsonDecoder.object<Entity<T>>({
  data: decoder,
  ref: refDecoder,
  ts: JsonDecoder.number
}, 'Entity')

const decodeEntity = <T>(response: unknown, decoder: JsonDecoder.Decoder<T>): T => {
  return decode(response, entityDecoder(decoder)).data
}

export default decodeEntity
