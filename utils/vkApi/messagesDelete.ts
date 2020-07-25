import { JsonDecoder } from 'ts.data.json'
import makeVkRequest from './utils/makeVkRequest'

const messagesDeleteDecoder = JsonDecoder.dictionary(
  JsonDecoder.number,
  'messages.delete decoder'
)

const messagesDelete = async (id: number, delete_for_all: boolean) => {
  return await makeVkRequest('messages.delete', messagesDeleteDecoder, {
    message_ids: id,
    delete_for_all
  })
}

export default messagesDelete