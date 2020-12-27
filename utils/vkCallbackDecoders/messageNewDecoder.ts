import variables from '../variables'
import vkCallbackWithObjectRequestDecoder, { VkCallbackRequestWithObject } from './vkCallbackWithObjectDecoder'
import { JsonDecoder } from 'ts.data.json'

export interface Message {
  id: number
  date: number
  text: string
  peer_id: number
  from_id: number
  conversation_message_id: number
  action: {
    type: 'chat_invite_user',
    member_id: number
  } | null
}

interface MessageNew {
  message: Message
}

const messageDecoder = JsonDecoder.object<Message>({
  id: JsonDecoder.number,
  date: JsonDecoder.number,
  text: JsonDecoder.string,
  peer_id: JsonDecoder.number,
  from_id: JsonDecoder.number,
  conversation_message_id: JsonDecoder.number,
  action: JsonDecoder.oneOf([
    JsonDecoder.object({
      type: JsonDecoder.isExactly<'chat_invite_user'>('chat_invite_user'),
      member_id: JsonDecoder.number,
    }, 'Action'),
    JsonDecoder.isUndefined(null)
  ], 'Action')
}, 'VK message')

const messageNewObjectDecoder = JsonDecoder.object<MessageNew>({
  message: messageDecoder
}, 'VK message new object')

export type VkCallbackMessageNew = VkCallbackRequestWithObject<'message_new', MessageNew, typeof variables.secret, typeof variables.groupId>

const messageNewDecoder = vkCallbackWithObjectRequestDecoder('message_new', messageNewObjectDecoder, variables.secret, variables.groupId)

export default messageNewDecoder