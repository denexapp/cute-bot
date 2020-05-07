import variables from '../variables'
import vkCallbackWithObjectRequestDecoder, { VkCallbackRequestWithObject } from '../vkCallbackWithObjectDecoder'
import { JsonDecoder } from 'ts.data.json'

interface Message {
  id: number
  text: string
  peer_id: number
}

const messageDecoder = JsonDecoder.object<Message>({
  id: JsonDecoder.number,
  text: JsonDecoder.string,
  peer_id: JsonDecoder.number
}, 'VK message')

export type VkCallbackMessageNew = VkCallbackRequestWithObject<'message_new', Message, typeof variables.secret, typeof variables.groupId>

const messageNewDecoder = vkCallbackWithObjectRequestDecoder('message_new', messageDecoder, variables.secret, variables.groupId)

export default messageNewDecoder