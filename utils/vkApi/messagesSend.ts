import { JsonDecoder } from 'ts.data.json'
import makeVkRequest from './utils/makeVkRequest'

const messageSendDecoder = JsonDecoder.number

const messagesSend = async (peerId: number, message: string) => (
  await makeVkRequest('messages.send', messageSendDecoder, {
    message,
    peer_id: peerId
  })
)

export default messagesSend