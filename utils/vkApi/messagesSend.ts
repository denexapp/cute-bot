import { JsonDecoder } from 'ts.data.json'
import makeVkRequest from './utils/makeVkRequest'
import getRandomInt from '../getRandomInt'

const messageSendDecoder = JsonDecoder.number

const messagesSend = async (peerId: number, message: string) => (
  await makeVkRequest('messages.send', messageSendDecoder, {
    message,
    peer_id: peerId,
    random_id: getRandomInt(0, 999999999999999).toString(10)
  })
)

export default messagesSend