import fetch from 'node-fetch'
import { JsonDecoder } from 'ts.data.json'
import decode from '../../decode'
import generateVkLink, { VkLinkParams } from './generateVkLink'
import vkResponseDecoder from './vkResponseDecoder'

const makeVkRequest = async <T>(
  methodName: string,
  decoder: JsonDecoder.Decoder<T>,
  params?: VkLinkParams
): Promise<T> => {
  const response = await fetch(generateVkLink(methodName, params))

  if (!response.ok) {
    throw new Error(`Unexpected response status ${response.status}`)
  }

  const json = await response.json()

  const value = decode(json, vkResponseDecoder)

  if (!value.success) {
    throw new Error(`VK api responded with error:\nCode: ${value.error.error_code}\n${value.error.error_msg}`)
  }

  return decode(value.response, decoder)
}

export default makeVkRequest