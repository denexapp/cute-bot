import variables from '../variables'
import vkCallbackWithObjectRequestDecoder, { VkCallbackRequestWithObject } from './vkCallbackWithObjectDecoder'
import { JsonDecoder } from 'ts.data.json'

export interface Message {
  id: number
  text: string
  peer_id: number
  from_id: number
}

interface MessageNew {
  message: Message
}

const messageDecoder = JsonDecoder.object<Message>({
  id: JsonDecoder.number,
  text: JsonDecoder.string,
  peer_id: JsonDecoder.number,
  from_id: JsonDecoder.number
}, 'VK message')

const messageNewObjectDecoder = JsonDecoder.object<MessageNew>({
  message: messageDecoder
}, 'VK message new object')

export type VkCallbackMessageNew = VkCallbackRequestWithObject<'message_new', MessageNew, typeof variables.secret, typeof variables.groupId>

const messageNewDecoder = vkCallbackWithObjectRequestDecoder('message_new', messageNewObjectDecoder, variables.secret, variables.groupId)

export default messageNewDecoder