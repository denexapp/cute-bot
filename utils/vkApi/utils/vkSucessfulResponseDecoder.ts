import { JsonDecoder } from 'ts.data.json'

export type VkSucessfulResponse = {
  success: true
  response: unknown
}

const vkSucessfulResponseDecoder = JsonDecoder.object<VkSucessfulResponse>({
  success: JsonDecoder.constant(true),
  response: JsonDecoder.succeed
}, 'VK sucessful response decoder')

export default vkSucessfulResponseDecoder