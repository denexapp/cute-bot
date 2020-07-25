import { JsonDecoder } from 'ts.data.json'

interface Error {
  error_code: number
  error_msg: string
}

export interface VkErrorResponse {
  success: false
  error: Error
}

const errorDecoder = JsonDecoder.object<Error>({
  error_code: JsonDecoder.number,
  error_msg: JsonDecoder.string
}, 'Error decoder')

const vkErrorResponseDecoder = JsonDecoder.object<VkErrorResponse>({
  success: JsonDecoder.constant(false),
  error: errorDecoder
}, 'VK error response decoder')

export default vkErrorResponseDecoder