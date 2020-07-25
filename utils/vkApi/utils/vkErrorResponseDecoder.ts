import { JsonDecoder } from 'ts.data.json'

type Error = {
  code: number
  description: string
}

export type VkErrorResponse = {
  success: false
  error: Error
}

const errorDecoder = JsonDecoder.object<Error>({
  code: JsonDecoder.number,
  description: JsonDecoder.string
}, 'Error decoder')

const vkErrorResponseDecoder = JsonDecoder.object<VkErrorResponse>({
  success: JsonDecoder.constant(false),
  error: errorDecoder
}, 'VK error response decoder')

export default vkErrorResponseDecoder