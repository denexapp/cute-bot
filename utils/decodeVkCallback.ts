import { JsonDecoder } from 'ts.data.json'
import decode from './decode'
import confirmationDecoder, { VkCallbackConfirmation } from './vkCallbackDecoders/confirmationDecoder'
import messageNewDecoder, { VkCallbackMessageNew } from './vkCallbackDecoders/messageNewDecoder'

type Callback = 
  | VkCallbackConfirmation
  | VkCallbackMessageNew

const decoders = [
  confirmationDecoder,
  messageNewDecoder
]

const vkCallbackDecoder = JsonDecoder.oneOf<Callback>(decoders, 'Vk Callback')

const decodeVkCallback = (data: unknown) => {
  return decode(data, vkCallbackDecoder)
}

export default decodeVkCallback