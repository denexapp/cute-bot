import { JsonDecoder } from 'ts.data.json'

type VkResponse = {
  response: unknown
}

const vkResponseDecoder = JsonDecoder.object<VkResponse>({
  response: JsonDecoder.succeed
}, 'VK response decoder')

export default vkResponseDecoder