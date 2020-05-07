import variables from '../variables'
import consts from '../consts'
import fetch from 'node-fetch'
import { JsonDecoder } from 'ts.data.json'
import decode from '../decode'

type Params = { [key: string]: string | number }

const generateVkLink = (methodName: string, params?: Params): string => {
  const query = new URLSearchParams({
    access_token: variables.accessToken,
    v: consts.vkApiVersion,
    ...(params ? params : { })
  })

  return `https://api.vk.com/method/${methodName}?${query}`
}

interface MessageSend {
  response: number
}

const messageSendResponseValidator = JsonDecoder.object<MessageSend>({
  response: JsonDecoder.number
}, 'Message send response')

const messagesSend = async (peerId: number, message: string) => {
  const response = await fetch(generateVkLink('messages.send', {
    message,
    peer_id: peerId
  }))

  if (!response.ok) {
    throw new Error(`Unexpected response status ${response.status}`)
  }

  const json = await response.json()

  return decode(json, messageSendResponseValidator)
}

export default messagesSend