import { JsonDecoder } from 'ts.data.json'
import vkErrorResponseDecoder, { VkErrorResponse } from './vkErrorResponseDecoder'
import vkSucessfulResponseDecoder, { VkSucessfulResponse } from './vkSucessfulResponseDecoder'

type VkResponse = VkErrorResponse | VkSucessfulResponse

const vkResponseDecoder = JsonDecoder.oneOf<VkResponse>([
  vkErrorResponseDecoder,
  vkSucessfulResponseDecoder
], 'VK response decoder')

export default vkResponseDecoder